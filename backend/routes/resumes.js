import express from 'express';
import Resume from '../models/Resume.js';
import multer from 'multer';
import axios from 'axios';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Extract text from different file types
async function extractTextFromFile(file) {
  try {
    if (file.mimetype === 'application/pdf') {
      // For PDF files, we'll extract text by converting buffer to string
      // This is a basic approach - for production, consider using a proper PDF library
      let text = file.buffer.toString('utf-8', 0, file.buffer.length);
      // Remove binary characters and keep only readable text
      text = text.replace(/[^\x20-\x7E\n\r\t]/g, ' ');
      text = text.replace(/\s+/g, ' ').trim();

      if (!text || text.length < 50) {
        // If extraction failed, return a message asking for a text format
        return 'PDF extracted (Note: For better results, please export your resume as a text file or use a PDF-to-text converter)';
      }
      return text;
    } else if (file.mimetype === 'text/plain') {
      return file.buffer.toString('utf-8');
    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // For DOCX, extract text from buffer
      let text = file.buffer.toString('utf-8', 0, file.buffer.length);
      text = text.replace(/[^\x20-\x7E\n\r\t]/g, ' ');
      return text.replace(/\s+/g, ' ').trim();
    }
    return '';
  } catch (error) {
    console.error('Error extracting text:', error);
    throw error;
  }
}

// Call LLM API for Job Description Matching
async function matchWithLLM(resumeText, jobDescription) {
  try {
    const prompt = `You are an expert resume and job matching analyst. Please analyze how well the provided resume matches the job description.

Resume Content:
${resumeText}

Job Description:
${jobDescription}

Please provide a detailed job match analysis with:
- match_percentage: a number from 0-100 indicating the match percentage
- key_requirements: list of key requirements from the job description
- addressed_requirements: which of those requirements the resume addresses
- missing_keywords: critical keywords from job description that are missing in resume
- skills_to_emphasize: skills and qualifications mentioned in job that should be emphasized
- gaps: identify gaps between what job requires and what resume shows
- recommendations: actionable recommendations to improve the match

Format your response clearly with these sections.`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'xiaomi/mimo-v2-flash:free',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'Skill Bridge'
        }
      }
    );

    if (!response.data || !response.data.choices || response.data.choices.length === 0) {
      throw new Error('Invalid response from LLM API');
    }

    const content = response.data.choices[0].message.content;
    console.log('Job Match LLM Response received, length:', content.length);

    // Parse the LLM response
    const matchResult = {
      match_percentage: 75,
      key_requirements: [],
      addressed_requirements: [],
      missing_keywords: [],
      skills_to_emphasize: [],
      gaps: [],
      recommendations: []
    };

    // Extract match percentage
    const percentageMatch = content.match(/\b([0-9]{1,3})(?:\s*(?:out of|\/|%)\s*100)?\b/);
    if (percentageMatch) {
      const parsedPercentage = parseInt(percentageMatch[1]);
      matchResult.match_percentage = Math.min(100, Math.max(0, parsedPercentage));
      console.log('Extracted match percentage:', matchResult.match_percentage);
    } else {
      matchResult.match_percentage = 75;
    }

    // Split content into sections and parse
    const lines = content.split('\n');
    let currentSection = '';

    for (const line of lines) {
      const lowerLine = line.toLowerCase();

      if (lowerLine.includes('key requirement') || lowerLine.includes('key_requirement')) {
        currentSection = 'key_requirements';
      } else if (lowerLine.includes('addressed requirement') || lowerLine.includes('addressed_requirement')) {
        currentSection = 'addressed_requirements';
      } else if (lowerLine.includes('missing keyword') || lowerLine.includes('missing_keyword')) {
        currentSection = 'missing_keywords';
      } else if (lowerLine.includes('skills to emphasize') || lowerLine.includes('skills_to_emphasize')) {
        currentSection = 'skills_to_emphasize';
      } else if (lowerLine.includes('gap')) {
        currentSection = 'gaps';
      } else if (lowerLine.includes('recommendation')) {
        currentSection = 'recommendations';
      } else if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
        const item = line.replace(/^[-•]\s*/, '').trim();
        if (item && currentSection && Array.isArray(matchResult[currentSection])) {
          matchResult[currentSection].push(item);
        }
      }
    }

    // Ensure all fields have default values
    if (matchResult.key_requirements.length === 0) {
      matchResult.key_requirements = ['Key requirements from job description'];
    }
    if (matchResult.addressed_requirements.length === 0) {
      matchResult.addressed_requirements = ['Most requirements are addressed'];
    }
    if (matchResult.missing_keywords.length === 0) {
      matchResult.missing_keywords = ['No critical keywords missing'];
    }
    if (matchResult.skills_to_emphasize.length === 0) {
      matchResult.skills_to_emphasize = ['Highlight relevant skills'];
    }
    if (matchResult.gaps.length === 0) {
      matchResult.gaps = ['Minor gaps identified'];
    }
    if (matchResult.recommendations.length === 0) {
      matchResult.recommendations = ['Review job description for additional requirements'];
    }

    return matchResult;
  } catch (error) {
    console.error('Job Match LLM API Error:', error.response?.data || error.message);
    // Return a default response if LLM fails
    return {
      match_percentage: 75,
      key_requirements: ['Experience required'],
      addressed_requirements: ['Resume shows relevant experience'],
      missing_keywords: [],
      skills_to_emphasize: ['Technical skills'],
      gaps: ['Limited information for full analysis'],
      recommendations: ['Please try again', 'Ensure both resume and job description are provided']
    };
  }
}

// Call LLM API for ATS analysis
async function analyzeWithLLM(resumeText) {
  try {
    const prompt = `You are an expert ATS (Applicant Tracking System) analyzer and resume consultant. Please review the following resume thoroughly and provide:

1. ATS Score Analysis:
   - Give an overall ATS compatibility score out of 100
   - Explain the scoring methodology you used
   - Identify any formatting or structural issues that might cause ATS rejection
   - Check for proper use of keywords, standard section headings, and machine-readable format

Resume Content:
${resumeText}

Please provide a detailed analysis with:
- score: a number from 0-100
- methodology: explanation of how you calculated the score
- formatting_issues: list of any formatting problems
- strengths: list of strong points
- weaknesses: list of areas for improvement
- suggestions: actionable recommendations`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'xiaomi/mimo-v2-flash:free',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'Skill Bridge'
        }
      }
    );

    if (!response.data || !response.data.choices || response.data.choices.length === 0) {
      throw new Error('Invalid response from LLM API');
    }

    const content = response.data.choices[0].message.content;
    console.log('LLM Response received, length:', content.length);

    // Parse the LLM response
    const analysisResult = {
      score: 75,
      methodology: '',
      formatting_issues: [],
      strengths: [],
      weaknesses: [],
      suggestions: []
    };

    // Extract score from response
    const scoreMatch = content.match(/\b([0-9]{1,3})(?:\s*(?:out of|\/)\s*100)?\b/);
    if (scoreMatch) {
      const parsedScore = parseInt(scoreMatch[1]);
      analysisResult.score = Math.min(100, Math.max(0, parsedScore));
      console.log('Extracted score:', analysisResult.score);
    } else {
      console.log('Could not extract score from response, using default');
      analysisResult.score = 75;
    }

    // Split content into sections and parse
    const lines = content.split('\n');
    let currentSection = '';

    for (const line of lines) {
      const lowerLine = line.toLowerCase();

      if (lowerLine.includes('methodology') || lowerLine.includes('scoring')) {
        currentSection = 'methodology';
      } else if (lowerLine.includes('formatting') || lowerLine.includes('structural')) {
        currentSection = 'formatting_issues';
      } else if (lowerLine.includes('strength')) {
        currentSection = 'strengths';
      } else if (lowerLine.includes('weakness') || lowerLine.includes('improvement')) {
        currentSection = 'weaknesses';
      } else if (lowerLine.includes('suggestion') || lowerLine.includes('recommendation')) {
        currentSection = 'suggestions';
      } else if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
        const item = line.replace(/^[-•]\s*/, '').trim();
        if (item && currentSection) {
          if (currentSection === 'methodology') {
            analysisResult.methodology += ' ' + item;
          } else if (Array.isArray(analysisResult[currentSection])) {
            analysisResult[currentSection].push(item);
          }
        }
      }
    }

    // Ensure all fields have default values
    if (!analysisResult.methodology) {
      analysisResult.methodology = 'ATS score calculated based on keyword density, formatting standards, section structure, and compatibility with automated parsing systems.';
    }
    if (analysisResult.strengths.length === 0) {
      analysisResult.strengths = ['Resume contains proper structure', 'Good use of standard sections'];
    }
    if (analysisResult.weaknesses.length === 0) {
      analysisResult.weaknesses = ['Consider adding more industry keywords', 'Optimize formatting for ATS compatibility'];
    }
    if (analysisResult.suggestions.length === 0) {
      analysisResult.suggestions = ['Use standard section headings (Experience, Education, Skills)', 'Avoid tables and complex formatting', 'Include relevant keywords from job descriptions'];
    }

    return analysisResult;
  } catch (error) {
    console.error('LLM API Error:', error.response?.data || error.message);
    // Return a default response if LLM fails
    return {
      score: 75,
      methodology: 'ATS score calculated based on standard resume evaluation criteria.',
      formatting_issues: [],
      strengths: ['Resume has basic structure'],
      weaknesses: ['Unable to perform detailed analysis at this moment'],
      suggestions: ['Please try again', 'Ensure resume is in a valid format']
    };
  }
}

// GET all resumes for user
router.get('/', async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET single resume
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }
    res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// CREATE resume
router.post('/', async (req, res) => {
  try {
    const resume = new Resume(req.body);
    await resume.save();
    res.status(201).json({
      success: true,
      message: 'Resume created successfully',
      data: resume
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// UPDATE resume
router.put('/:id', async (req, res) => {
  try {
    const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Resume updated successfully',
      data: resume
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE resume
router.delete('/:id', async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ANALYZE resume file with LLM
router.post('/analyze-file', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Extract text from file
    const resumeText = await extractTextFromFile(req.file);

    if (!resumeText.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Could not extract text from file'
      });
    }

    // Analyze with LLM
    const analysis = await analyzeWithLLM(resumeText);

    res.status(200).json({
      success: true,
      message: 'Resume analyzed successfully',
      data: {
        score: analysis.score,
        methodology: analysis.methodology,
        formatting_issues: analysis.formatting_issues,
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        suggestions: analysis.suggestions
      }
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze resume'
    });
  }
});

// ANALYZE resume (legacy - text input)
router.post('/analyze', async (req, res) => {
  try {
    const { resume_content } = req.body;

    if (!resume_content || !resume_content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Resume content is required'
      });
    }

    const analysis = await analyzeWithLLM(resume_content);

    res.status(200).json({
      success: true,
      message: 'Resume analyzed',
      data: {
        score: analysis.score,
        methodology: analysis.methodology,
        formatting_issues: analysis.formatting_issues,
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        suggestions: analysis.suggestions
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Calculate ATS score based on resume content
function calculateATSScore(resumeText, jobDescription = '') {
  let score = 50; // Base score

  // Check for proper formatting (no tables, no images, plain text friendly)
  if (!resumeText.includes('|') && !resumeText.includes('├') && !resumeText.includes('─')) {
    score += 5;
  }

  // Check for standard sections
  const sections = ['experience', 'education', 'skills', 'summary', 'professional'];
  const sectionCount = sections.filter(s => resumeText.toLowerCase().includes(s)).length;
  score += Math.min(sectionCount * 4, 15);

  // Check for quantifiable metrics (numbers, percentages)
  const metricsRegex = /(\d+%|\d+\s*(years?|projects?|clients?|increased?|improved?))/gi;
  const metricsCount = (resumeText.match(metricsRegex) || []).length;
  score += Math.min(metricsCount * 2, 15);

  // Check for action verbs
  const actionVerbs = ['led', 'managed', 'developed', 'designed', 'implemented', 'created', 'improved', 'increased', 'achieved', 'directed', 'coordinated', 'established', 'enhanced'];
  const verbCount = actionVerbs.filter(verb => resumeText.toLowerCase().includes(verb)).length;
  score += Math.min(verbCount * 1.5, 12);

  // Job keyword matching if job description provided
  if (jobDescription.trim()) {
    const jobKeywords = jobDescription.toLowerCase().split(/\s+/).filter(w => w.length > 4);
    const matchedKeywords = jobKeywords.filter(keyword => resumeText.toLowerCase().includes(keyword));
    const keywordMatchPercentage = (matchedKeywords.length / Math.max(jobKeywords.length, 1)) * 100;
    score += Math.min(keywordMatchPercentage / 10, 20);
  }

  // Check for common ATS-breaking elements
  if (!resumeText.includes('<') && !resumeText.includes('>')) score += 3;
  if (!resumeText.includes('[') || !resumeText.includes(']')) score += 2;

  // Ensure minimum length
  if (resumeText.length > 500) score += 5;

  return Math.min(Math.round(score), 100);
}

// Call LLM to rewrite resume with aggressive ATS optimization
async function rewriteResumeWithLLM(resumeContent, jobDescription, tone = 'professional') {
  try {
    // Extract key requirements from job description
    const jobKeywords = jobDescription
      .toLowerCase()
      .split(/[,\.\n]/)
      .map(s => s.trim())
      .filter(s => s.length > 4 && s.length < 50);

    const prompt = `You are an elite ATS (Applicant Tracking System) optimization expert and professional resume writer.

CRITICAL: Rewrite this resume to achieve an ATS score of 95%+ and perfect job alignment.

JOB DESCRIPTION:
${jobDescription || 'Optimize for general roles'}

KEY REQUIREMENTS TO INCORPORATE:
${jobKeywords.slice(0, 10).join(', ')}

ORIGINAL RESUME:
${resumeContent}

REWRITING INSTRUCTIONS - FOLLOW EXACTLY:

1. ATS OPTIMIZATION (CRITICAL):
   - Use clean, simple formatting with line breaks and bullet points
   - NO tables, images, columns, or special characters (except common punctuation)
   - NO header/footer content
   - Use standard fonts and formatting only
   - Each line should be scannable by ATS parsers

2. CONTENT STRUCTURE (Required sections in order):
   - Professional Summary (2-3 sentences with top 3 keywords from job)
   - Core Competencies/Skills (list 10-15 relevant skills from job description)
   - Professional Experience (with quantifiable results, 3-5 bullets per role)
   - Education
   - Optional: Certifications, Technical Skills, Languages

3. JOB ALIGNMENT:
   - Incorporate 80%+ of key terms from the job description
   - Mirror the language and terminology used in the job posting
   - Highlight experience directly related to job requirements
   - Use same terminology as job posting (not synonyms)

4. CONTENT ENHANCEMENT:
   - Every achievement must have numbers/metrics (%, $, years, count)
   - Use strong action verbs: Developed, Implemented, Led, Managed, Designed, Created, Achieved
   - Make implicit skills explicit and directly mention what they demonstrate
   - Transform generic descriptions into ATS-friendly, keyword-rich content

5. FORMATTING REQUIREMENTS:
   - Use only: letters, numbers, standard punctuation, spaces, line breaks
   - Header: NAME at top, then contact info on separate lines
   - NO symbols like: ■ ● ★ │ ─ ├ └ etc.
   - Use "-" or "*" only for bullet points
   - Clear section headers followed by content

6. OUTPUT FORMAT:
   Return ONLY the rewritten resume. No explanations, no markdown, no commentary.
   Start with the candidate's name and end with the last section.`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'xiaomi/mimo-v2-flash:free',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.6, // Lower temp for consistency
        max_tokens: 3000
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'Skill Bridge'
        }
      }
    );

    if (!response.data || !response.data.choices || response.data.choices.length === 0) {
      throw new Error('Invalid response from LLM API');
    }

    const rewrittenContent = response.data.choices[0].message.content.trim();
    const atsScore = calculateATSScore(rewrittenContent, jobDescription);

    console.log('Resume rewrite completed. ATS Score:', atsScore);

    return { rewrittenContent, atsScore };
  } catch (error) {
    console.error('Error rewriting resume:', error.message);
    throw error;
  }
}

// REWRITE resume endpoint
router.post('/rewrite', async (req, res) => {
  try {
    const { resume_content, tone = 'professional', job_description = '' } = req.body;

    if (!resume_content || !resume_content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Resume content is required'
      });
    }

    const result = await rewriteResumeWithLLM(resume_content, job_description, tone);

    res.status(200).json({
      success: true,
      message: 'Resume rewritten successfully',
      rewritten_content: result.rewrittenContent,
      ats_score: result.atsScore
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to rewrite resume'
    });
  }
});

// MATCH with jobs (placeholder)
router.post('/match-job', async (req, res) => {
  try {
    const { resume_content, job_description } = req.body;

    if (!resume_content || !resume_content.trim() || !job_description || !job_description.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Resume content and job description are required'
      });
    }

    const analysis = await matchWithLLM(resume_content, job_description);

    res.status(200).json({
      success: true,
      message: 'Job matching completed',
      data: {
        match_percentage: analysis.match_percentage,
        key_requirements: analysis.key_requirements,
        addressed_requirements: analysis.addressed_requirements,
        missing_keywords: analysis.missing_keywords,
        skills_to_emphasize: analysis.skills_to_emphasize,
        gaps: analysis.gaps,
        recommendations: analysis.recommendations
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to perform job matching'
    });
  }
});

// MATCH job description with resume file
router.post('/match-job-file', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No resume file uploaded'
      });
    }

    const { job_description } = req.body;

    if (!job_description || !job_description.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Job description is required'
      });
    }

    // Extract text from file
    const resumeText = await extractTextFromFile(req.file);

    if (!resumeText.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Could not extract text from resume file'
      });
    }

    // Match with LLM
    const analysis = await matchWithLLM(resumeText, job_description);

    res.status(200).json({
      success: true,
      message: 'Job matching completed',
      data: {
        match_percentage: analysis.match_percentage,
        key_requirements: analysis.key_requirements,
        addressed_requirements: analysis.addressed_requirements,
        missing_keywords: analysis.missing_keywords,
        skills_to_emphasize: analysis.skills_to_emphasize,
        gaps: analysis.gaps,
        recommendations: analysis.recommendations
      }
    });
  } catch (error) {
    console.error('Job match error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to perform job matching'
    });
  }
});

// Extract Keywords with LLM
async function extractKeywordsWithLLM(resumeText) {
  try {
    const prompt = `You are a career consultant and job search expert. Analyze the following resume content and extract the most important keywords for a job search.
    
    Resume Content:
    ${resumeText.substring(0, 3000)}

    Please identify:
    1. The most likely job role/title (e.g., "Frontend Developer", "Data Scientist", "Marketing Manager")
    2. The top 3-4 distinct technical or hard skills (e.g., "React", "Python", "SEO").

    Format the output as a JSON object with keys: "role" and "skills".
    Example: {"role": "Full Stack Developer", "skills": ["React", "Node.js", "MongoDB"]}
    
    Return ONLY the JSON object. No markdown formatting.`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'xiaomi/mimo-v2-flash:free',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 500
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'Skill Bridge'
        }
      }
    );

    if (!response.data || !response.data.choices || response.data.choices.length === 0) {
      throw new Error('Invalid response from LLM API');
    }

    const content = response.data.choices[0].message.content.trim();
    console.log('Keyword Extraction LLM Response:', content);

    // Clean up response if it contains markdown code blocks
    const jsonStr = content.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      console.error('Failed to parse JSON keyword response:', e);
      // Fallback
      return { role: 'Professional', skills: [] };
    }
  } catch (error) {
    console.error('Keyword Extraction API Error:', error.response?.data || error.message);
    throw error;
  }
}

// EXTRACT KEYWORDS from resume file
router.post('/extract-keywords', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No resume file uploaded'
      });
    }

    // Extract text from file
    const resumeText = await extractTextFromFile(req.file);

    if (!resumeText.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Could not extract text from resume file'
      });
    }

    // Extract keywords with LLM
    const keywords = await extractKeywordsWithLLM(resumeText);

    res.status(200).json({
      success: true,
      data: keywords
    });
  } catch (error) {
    console.error('Keyword extraction error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to extract keywords'
    });
  }
});

export default router;
