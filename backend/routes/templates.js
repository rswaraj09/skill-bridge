import express from 'express';

const router = express.Router();

// Template data with predefined sample content
const getTemplateData = (templateId) => {
  const baseTemplates = {
    1: {
      // Professional Classic
      firstName: 'John',
      lastName: 'Anderson',
      email: 'john.anderson@email.com',
      phone: '+1 (555) 123-4567',
      profession: 'Senior Marketing Manager',
      city: 'New York',
      country: 'USA',
      pinCode: '10001',
      summary: 'Results-driven Marketing Manager with 8+ years of experience in digital marketing, brand management, and team leadership. Proven track record of increasing market share and revenue through strategic campaigns.',
      experience: 'Senior Marketing Manager | ABC Corporation | New York, NY | 2020 - Present\n• Led cross-functional teams to execute 15+ successful campaigns\n• Increased brand awareness by 45% year-over-year\n• Managed marketing budget of $2.5M\n\nMarketing Coordinator | XYZ Inc | New York, NY | 2018 - 2020\n• Coordinated digital marketing initiatives\n• Created content for social media platforms',
      education: 'Bachelor of Business Administration in Marketing\nNew York University | Graduated: May 2018\nGPA: 3.8/4.0 | Dean\'s List',
      skills: 'Digital Marketing, Brand Strategy, Social Media Management, Analytics, Project Management, Team Leadership, SEO, Content Marketing',
      certifications: 'Google Analytics Certification | HubSpot Inbound Marketing Certification | Project Management Professional (PMP)'
    },
    2: {
      // Modern Minimalist
      firstName: 'Sarah',
      lastName: 'Chen',
      email: 'sarah.chen@email.com',
      phone: '+1 (555) 234-5678',
      profession: 'Product Designer',
      city: 'San Francisco',
      country: 'USA',
      pinCode: '94102',
      summary: 'Creative Product Designer with 6+ years designing user-centric digital experiences. Specialized in UI/UX design, prototyping, and usability testing.',
      experience: 'Product Designer | Tech Startup | San Francisco, CA | 2021 - Present\n• Designed 50+ features for mobile and web applications\n• Improved user engagement by 60%\n• Led design system implementation\n\nUI Designer | Design Agency | San Francisco, CA | 2019 - 2021\n• Created designs for 20+ client projects',
      education: 'Bachelor of Fine Arts in Graphic Design\nCalifornia College of the Arts | Graduated: May 2019\nFocus: User Experience Design',
      skills: 'UI Design, UX Research, Figma, Adobe Creative Suite, Prototyping, Wireframing, User Testing, Design Systems',
      certifications: 'Google UX Design Certificate | Nielsen Norman UX Certification'
    },
    3: {
      // Creative Bold
      firstName: 'Michael',
      lastName: 'Torres',
      email: 'michael.torres@email.com',
      phone: '+1 (555) 345-6789',
      profession: 'Creative Director',
      city: 'Los Angeles',
      country: 'USA',
      pinCode: '90001',
      summary: 'Award-winning Creative Director with 10+ years of experience in advertising, branding, and creative strategy. Known for innovative campaigns that drive results.',
      experience: 'Creative Director | Premium Agency | Los Angeles, CA | 2022 - Present\n• Directed creative vision for Fortune 500 brands\n• Won 8 industry awards for innovative campaigns\n• Led team of 15 creative professionals\n\nSenior Creative | Creative Studio | Los Angeles, CA | 2019 - 2022\n• Conceptualized and executed award-winning campaigns',
      education: 'Master of Arts in Design\nArtCenter College of Design | Graduated: May 2017\n\nBachelor of Fine Arts in Graphic Design\nUniversity of Southern California | Graduated: May 2015',
      skills: 'Brand Strategy, Art Direction, Campaign Development, Team Leadership, Advertising, Visual Design, Copywriting, Strategic Thinking',
      certifications: 'Certified Brand Manager | Advanced Creative Leadership Program'
    },
    4: {
      // Executive Summary
      firstName: 'David',
      lastName: 'Williams',
      email: 'david.williams@email.com',
      phone: '+1 (555) 456-7890',
      profession: 'Chief Marketing Officer',
      city: 'Chicago',
      country: 'USA',
      pinCode: '60601',
      summary: 'Strategic CMO with 15+ years driving corporate growth and market expansion. Expertise in P&L management, digital transformation, and building high-performing marketing organizations.',
      experience: 'Chief Marketing Officer | Global Tech Company | Chicago, IL | 2020 - Present\n• Oversaw $50M+ marketing budget\n• Increased revenue by 120% through strategic initiatives\n• Built and scaled marketing team from 10 to 50+ professionals\n\nVice President of Marketing | Fortune 500 Company | Chicago, IL | 2017 - 2020\n• Led marketing strategy for 3 business units',
      education: 'MBA in Business Administration\nUniversity of Chicago Booth School of Business | Graduated: May 2012\n\nBachelor of Science in Marketing\nIndiana University Kelley School of Business | Graduated: May 2008',
      skills: 'P&L Management, Strategic Planning, Executive Leadership, Market Analysis, Revenue Growth, Team Building, Digital Strategy, Business Development',
      certifications: 'Executive Leadership Certification | Strategic Marketing Management Program'
    },
    5: {
      // Tech Professional
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 567-8901',
      profession: 'Full Stack Developer',
      city: 'Seattle',
      country: 'USA',
      pinCode: '98101',
      summary: 'Experienced Full Stack Developer with 7+ years building scalable web applications. Proficient in React, Node.js, and cloud technologies.',
      experience: 'Senior Full Stack Developer | Tech Company | Seattle, WA | 2021 - Present\n• Architected microservices handling 1M+ daily transactions\n• Led team of 5 developers on critical projects\n• Reduced application load time by 70%\n\nFull Stack Developer | StartUp | Seattle, WA | 2019 - 2021\n• Built RESTful APIs and responsive UIs',
      education: 'Bachelor of Science in Computer Science\nUniversity of Washington | Graduated: May 2017\nFocus: Software Engineering',
      skills: 'React, Node.js, JavaScript, Python, MongoDB, PostgreSQL, AWS, Docker, Git, RESTful APIs, Agile',
      certifications: 'AWS Certified Solutions Architect | Google Cloud Professional Developer'
    },
    6: {
      // Academic Focus
      firstName: 'Professor',
      lastName: 'Johnson',
      email: 'prof.johnson@university.edu',
      phone: '+1 (555) 678-9012',
      profession: 'Research Scholar & Educator',
      city: 'Boston',
      country: 'USA',
      pinCode: '02115',
      summary: 'Accomplished academician with PhD and 12+ years of research and teaching experience. Published 40+ peer-reviewed papers and led multiple research grants.',
      experience: 'Associate Professor | Harvard University | Boston, MA | 2018 - Present\n• Conducted groundbreaking research in data science\n• Secured $5M in research funding\n• Mentored 20+ graduate students\n\nPostdoctoral Researcher | MIT | Boston, MA | 2016 - 2018\n• Published 15 peer-reviewed papers',
      education: 'PhD in Computer Science\nStanford University | Graduated: May 2016\n\nMaster of Science in Computer Science\nUniversity of California, Berkeley | Graduated: May 2013\n\nBachelor of Science in Computer Science\nUniversity of Michigan | Graduated: May 2011',
      skills: 'Machine Learning, Research Methodology, Data Analysis, Academic Writing, Teaching, Python, Java, Statistics, Grant Writing',
      certifications: 'Research Excellence Award | Teaching Excellence Certification'
    },
    7: {
      // Chronological Order
      firstName: 'James',
      lastName: 'Mitchell',
      email: 'james.mitchell@email.com',
      phone: '+1 (555) 789-0123',
      profession: 'Operations Manager',
      city: 'Denver',
      country: 'USA',
      pinCode: '80202',
      summary: 'Operations Manager with 11+ years of progressive experience in supply chain management, process optimization, and team leadership.',
      experience: 'Senior Operations Manager | Manufacturing Corp | Denver, CO | 2022 - Present\n• Reduced operational costs by 35%\n• Managed team of 40 professionals\n• Implemented new ERP system\n\nOperations Manager | Distribution Center | Denver, CO | 2019 - 2022\n• Optimized warehouse processes\n\nOperations Supervisor | Logistics Company | Denver, CO | 2016 - 2019\n• Coordinated daily operations',
      education: 'MBA in Operations Management\nUniversity of Colorado | Graduated: May 2016\n\nBachelor of Business Administration\nUniversity of Colorado | Graduated: May 2013',
      skills: 'Supply Chain Management, Process Improvement, ERP Systems, Team Leadership, Budget Management, Lean Six Sigma, Analytics',
      certifications: 'Six Sigma Green Belt | Project Management Professional'
    },
    8: {
      // Functional Format
      firstName: 'Jennifer',
      lastName: 'Parker',
      email: 'jennifer.parker@email.com',
      phone: '+1 (555) 890-1234',
      profession: 'Sales Executive',
      city: 'Atlanta',
      country: 'USA',
      pinCode: '30303',
      summary: 'Highly motivated Sales Executive with 9+ years of experience in enterprise sales, client relationship management, and quota achievement.',
      experience: 'Senior Sales Executive | Enterprise Solutions | Atlanta, GA | 2021 - Present\n• Exceeded annual sales targets by 45%\n• Built and managed $10M+ client portfolio\n• Developed 5 strategic partnerships\n\nSales Manager | Software Company | Atlanta, GA | 2018 - 2021\n• Led team of 8 sales representatives\n\nSales Representative | Tech Firm | Atlanta, GA | 2015 - 2018\n• Generated $2M+ in annual revenue',
      education: 'Bachelor of Business Administration\nGeorgia Tech | Graduated: May 2015',
      skills: 'Enterprise Sales, Client Management, Negotiation, Territory Management, CRM Systems, Business Development, Presentation Skills',
      certifications: 'Sales Excellence Certification | Salesforce Administrator'
    },
    9: {
      // Hybrid Structure
      firstName: 'Robert',
      lastName: 'Bennett',
      email: 'robert.bennett@email.com',
      phone: '+1 (555) 901-2345',
      profession: 'HR Director',
      city: 'Boston',
      country: 'USA',
      pinCode: '02108',
      summary: 'Strategic HR Director with 13+ years driving organizational development, talent acquisition, and employee engagement initiatives.',
      experience: 'HR Director | Corporate Headquarters | Boston, MA | 2022 - Present\n• Developed talent acquisition strategy\n• Improved employee retention by 40%\n• Led 200+ person team\n\nHR Manager | Mid-Size Company | Boston, MA | 2019 - 2022\n• Implemented new HRIS system',
      education: 'Master of Business Administration\nBU Questrom Business School | Graduated: May 2018\n\nBachelor of Science in Human Resources\nMassachusetts College | Graduated: May 2014',
      skills: 'Talent Acquisition, Employee Relations, Organizational Development, HRIS Systems, Compliance, Budget Management, Team Leadership',
      certifications: 'SHRM Certified Professional | Executive Leadership Certificate'
    },
    10: {
      // Creative Designer
      firstName: 'Alexandra',
      lastName: 'Martinez',
      email: 'alexandra.martinez@email.com',
      phone: '+1 (555) 012-3456',
      profession: 'Graphic Designer',
      city: 'Miami',
      country: 'USA',
      pinCode: '33101',
      summary: 'Award-winning Graphic Designer specializing in brand identity, digital design, and visual communication. 8+ years creating compelling visual narratives.',
      experience: 'Lead Designer | Creative Agency | Miami, FL | 2021 - Present\n• Designed branding for 50+ clients\n• Won 10 industry design awards\n• Led design team of 5\n\nGraphic Designer | Design Studio | Miami, FL | 2018 - 2021\n• Created digital and print designs',
      education: 'Bachelor of Fine Arts in Graphic Design\nFlorida International University | Graduated: May 2018',
      skills: 'Adobe Creative Suite, Brand Identity, UI/UX Design, Typography, Color Theory, Digital Design, Print Design, Illustration',
      certifications: 'Adobe Certified Associate | Design Excellence Program'
    },
    11: {
      // Corporate Professional
      firstName: 'Christopher',
      lastName: 'Thompson',
      email: 'christopher.thompson@email.com',
      phone: '+1 (555) 123-4568',
      profession: 'Finance Manager',
      city: 'New York',
      country: 'USA',
      pinCode: '10002',
      summary: 'Finance Manager with 10+ years of experience in financial planning, analysis, and reporting for multinational corporations.',
      experience: 'Senior Finance Manager | Global Bank | New York, NY | 2021 - Present\n• Managed $100M+ annual budget\n• Reduced operational expenses by 20%\n• Prepared executive financial reports\n\nFinance Analyst | Investment Firm | New York, NY | 2018 - 2021\n• Analyzed financial statements',
      education: 'MBA in Finance\nNYU Stern School of Business | Graduated: May 2018\n\nBachelor of Science in Accounting\nNYU | Graduated: May 2016',
      skills: 'Financial Analysis, Budget Management, Financial Planning, Accounting, Excel, SQL, Reporting, Risk Management',
      certifications: 'CPA | CFA Level II'
    },
    12: {
      // Startup Oriented
      firstName: 'Nathan',
      lastName: 'Kumar',
      email: 'nathan.kumar@email.com',
      phone: '+1 (555) 234-5679',
      profession: 'Startup Founder & CEO',
      city: 'San Francisco',
      country: 'USA',
      pinCode: '94103',
      summary: 'Entrepreneurial CEO with 5+ years building and scaling startups from inception to Series A funding. Expertise in product development and market disruption.',
      experience: 'CEO & Founder | Tech Startup | San Francisco, CA | 2020 - Present\n• Raised $5M in Series A funding\n• Built product used by 100K+ users\n• Grew team from 2 to 30+ employees\n\nProduct Lead | Early-Stage Startup | San Francisco, CA | 2018 - 2020\n• Led product strategy',
      education: 'Bachelor of Science in Software Engineering\nUniversity of California, Berkeley | Graduated: May 2018',
      skills: 'Product Development, Fundraising, Team Building, Market Analysis, Growth Strategy, Technical Leadership, Business Strategy',
      certifications: 'Y Combinator Graduate | Startup Accelerator Program'
    },
    13: {
      // One Page Resume
      firstName: 'Michelle',
      lastName: 'Davis',
      email: 'michelle.davis@email.com',
      phone: '+1 (555) 345-6780',
      profession: 'Junior Software Developer',
      city: 'Austin',
      country: 'USA',
      pinCode: '78701',
      summary: 'Recent graduate with strong foundation in web development and passion for continuous learning. Skilled in JavaScript and React.',
      experience: 'Junior Developer | Web Agency | Austin, TX | 2023 - Present\n• Developed responsive web applications\n\nIntern | Tech Company | Austin, TX | 2022 - 2023\n• Assisted senior developers',
      education: 'Bachelor of Science in Computer Science\nUniversity of Texas | Graduated: May 2023\nBootcamp: Full Stack Web Development',
      skills: 'JavaScript, React, HTML, CSS, Node.js, MongoDB, Git',
      certifications: 'Full Stack Web Development Certification'
    },
    14: {
      // Two Column Layout
      firstName: 'Laura',
      lastName: 'Stewart',
      email: 'laura.stewart@email.com',
      phone: '+1 (555) 456-7891',
      profession: 'Project Manager',
      city: 'Chicago',
      country: 'USA',
      pinCode: '60602',
      summary: 'Project Manager with 9+ years delivering complex projects on time and within budget. Certified Scrum Master with agile expertise.',
      experience: 'Senior Project Manager | Fortune 500 Company | Chicago, IL | 2021 - Present\n• Managed 15+ simultaneous projects\n• Saved company $2M through optimization\n• Led cross-functional teams of 20+\n\nProject Manager | Consulting Firm | Chicago, IL | 2018 - 2021\n• Delivered 30+ successful projects',
      education: 'MBA in Project Management\nDePaul University | Graduated: May 2017\n\nBachelor of Business Administration\nIllinois State University | Graduated: May 2015',
      skills: 'Project Management, Agile/Scrum, Risk Management, Budget Planning, Team Leadership, Microsoft Project, Jira, Confluence',
      certifications: 'PMP | Certified Scrum Master | Six Sigma Black Belt'
    },
    15: {
      // Infographic Style
      firstName: 'Marcus',
      lastName: 'Johnson',
      email: 'marcus.johnson@email.com',
      phone: '+1 (555) 567-8902',
      profession: 'Data Scientist',
      city: 'San Jose',
      country: 'USA',
      pinCode: '95101',
      summary: 'Data Scientist with 8+ years applying machine learning and statistical analysis to drive business insights. Experienced in Python, R, and big data technologies.',
      experience: 'Senior Data Scientist | Big Tech Company | San Jose, CA | 2021 - Present\n• Built ML models improving revenue by 30%\n• Led analytics team of 5\n• Published 3 technical papers\n\nData Scientist | Analytics Firm | San Jose, CA | 2018 - 2021\n• Developed predictive models',
      education: 'Master of Science in Data Science\nStanford University | Graduated: May 2017\n\nBachelor of Science in Statistics\nUC Berkeley | Graduated: May 2015',
      skills: 'Python, R, Machine Learning, TensorFlow, SQL, Data Visualization, Statistical Analysis, Big Data, Apache Spark',
      certifications: 'Google Cloud Certified Data Engineer | AWS Certified Machine Learning'
    },
    16: {
      // Healthcare Professional
      firstName: 'Dr. Elizabeth',
      lastName: 'Garcia',
      email: 'elizabeth.garcia@email.com',
      phone: '+1 (555) 678-9013',
      profession: 'Registered Nurse - ICU',
      city: 'Houston',
      country: 'USA',
      pinCode: '77002',
      summary: 'Compassionate and experienced RN with 11+ years in critical care nursing. Proficient in patient assessment, clinical procedures, and team collaboration.',
      experience: 'ICU Nurse | Houston Medical Center | Houston, TX | 2020 - Present\n• Care for 8-10 critical patients daily\n• Mentored 5+ new nurses\n• Received Nurse of the Year award\n\nHospital Nurse | City Hospital | Houston, TX | 2017 - 2020\n• Provided direct patient care',
      education: 'Bachelor of Science in Nursing\nUniversity of Texas Health Science Center | Graduated: May 2015\n\nRN License | Continuing Education: 40+ hours annually',
      skills: 'Patient Care, Critical Care, Medical Assessment, IV Therapy, Medication Administration, Electronic Health Records, Communication',
      certifications: 'RN License | BLS/ACLS Certification | Critical Care Nursing Certification'
    },
    17: {
      // Finance Executive
      firstName: 'William',
      lastName: 'Anderson',
      email: 'william.anderson@email.com',
      phone: '+1 (555) 789-0124',
      profession: 'Chief Financial Officer',
      city: 'New York',
      country: 'USA',
      pinCode: '10004',
      summary: 'Strategic CFO with 20+ years in financial leadership, M&A, and corporate strategy. Successfully led multiple IPOs and major acquisitions.',
      experience: 'Chief Financial Officer | Major Corporation | New York, NY | 2022 - Present\n• Oversee $500M+ budget\n• Led 3 successful acquisitions\n• Increased shareholder value by 60%\n\nVP Finance | Investment Bank | New York, NY | 2019 - 2022\n• Managed financial strategy',
      education: 'MBA in Finance\nPrinceton School of Public & International Affairs | Graduated: May 2010\n\nBachelor of Science in Economics\nPrinceton University | Graduated: May 2008',
      skills: 'Financial Strategy, M&A, Budget Management, Investor Relations, Risk Management, Financial Reporting, Strategic Planning',
      certifications: 'CPA | CFA Charter Holder | Executive Leadership Program'
    },
    18: {
      // Marketing Manager
      firstName: 'Amanda',
      lastName: 'White',
      email: 'amanda.white@email.com',
      phone: '+1 (555) 890-1235',
      profession: 'Marketing Manager',
      city: 'Los Angeles',
      country: 'USA',
      pinCode: '90005',
      summary: 'Dynamic Marketing Manager with 9+ years driving growth through integrated marketing campaigns, brand strategy, and digital initiatives.',
      experience: 'Marketing Manager | Consumer Brand | Los Angeles, CA | 2021 - Present\n• Managed $5M marketing budget\n• Increased brand awareness by 50%\n• Led team of 8 marketing professionals\n\nMarketing Coordinator | Marketing Agency | Los Angeles, CA | 2018 - 2021\n• Executed 20+ campaigns',
      education: 'Bachelor of Business Administration in Marketing\nUniversity of Southern California | Graduated: May 2017',
      skills: 'Digital Marketing, Brand Management, Campaign Strategy, Analytics, Social Media, Content Marketing, SEO, Email Marketing',
      certifications: 'Google Marketing Professional | HubSpot Inbound Marketing Specialist'
    }
  };

  // Return template data or default if not found
  return baseTemplates[templateId] || {
    firstName: 'Your First',
    lastName: 'Name',
    email: 'your.email@example.com',
    phone: '+1 (555) 123-4567',
    profession: 'Your Job Title',
    city: 'City',
    country: 'Country',
    pinCode: '12345',
    summary: 'Write your professional summary here...',
    experience: 'Add your work experience...',
    education: 'Add your education details...',
    skills: 'Add your skills separated by commas...',
    certifications: 'Add your certifications...'
  };
};

// Get template by ID with predefined data
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const templateId = parseInt(id);
    
    const templateData = getTemplateData(templateId);
    
    res.json({
      id: templateId,
      data: templateData
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching template', error: error.message });
  }
});

// Get all templates
router.get('/', (req, res) => {
  try {
    // Array of 18 templates with metadata
    const templates = [
      {
        id: 1,
        name: 'Professional Classic',
        description: 'Clean and professional layout with traditional sections',
        preview_url: null,
        file_url: null
      },
      {
        id: 2,
        name: 'Modern Minimalist',
        description: 'Contemporary design with minimal elements and maximum clarity',
        preview_url: null,
        file_url: null
      },
      {
        id: 3,
        name: 'Creative Bold',
        description: 'Eye-catching design with bold typography and colors',
        preview_url: null,
        file_url: null
      },
      {
        id: 4,
        name: 'Executive Summary',
        description: 'Ideal for senior positions with emphasis on achievements',
        preview_url: null,
        file_url: null
      },
      {
        id: 5,
        name: 'Tech Professional',
        description: 'Designed for technology and IT professionals',
        preview_url: null,
        file_url: null
      },
      {
        id: 6,
        name: 'Academic Focus',
        description: 'Emphasizes education and research experience',
        preview_url: null,
        file_url: null
      },
      {
        id: 7,
        name: 'Chronological Order',
        description: 'Traditional reverse chronological layout format',
        preview_url: null,
        file_url: null
      },
      {
        id: 8,
        name: 'Functional Format',
        description: 'Highlights skills and accomplishments first',
        preview_url: null,
        file_url: null
      },
      {
        id: 9,
        name: 'Hybrid Structure',
        description: 'Combines chronological and functional elements',
        preview_url: null,
        file_url: null
      },
      {
        id: 10,
        name: 'Creative Designer',
        description: 'Perfect for designers and creative professionals',
        preview_url: null,
        file_url: null
      },
      {
        id: 11,
        name: 'Corporate Professional',
        description: 'Sophisticated design for corporate roles',
        preview_url: null,
        file_url: null
      },
      {
        id: 12,
        name: 'Startup Oriented',
        description: 'Modern style for startup and tech company roles',
        preview_url: null,
        file_url: null
      },
      {
        id: 13,
        name: 'One Page Resume',
        description: 'Concise single-page format for entry-level professionals',
        preview_url: null,
        file_url: null
      },
      {
        id: 14,
        name: 'Two Column Layout',
        description: 'Side-by-side layout with skills on the left',
        preview_url: null,
        file_url: null
      },
      {
        id: 15,
        name: 'Infographic Style',
        description: 'Visual elements and icons for better presentation',
        preview_url: null,
        file_url: null
      },
      {
        id: 16,
        name: 'Healthcare Professional',
        description: 'Tailored for medical and healthcare roles',
        preview_url: null,
        file_url: null
      },
      {
        id: 17,
        name: 'Finance Executive',
        description: 'Professional format for finance and accounting roles',
        preview_url: null,
        file_url: null
      },
      {
        id: 18,
        name: 'Marketing Manager',
        description: 'Dynamic design for marketing and sales professionals',
        preview_url: null,
        file_url: null
      }
    ];

    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
