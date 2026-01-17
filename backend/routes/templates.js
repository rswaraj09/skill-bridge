import express from 'express';

const router = express.Router();

// Get all templates
router.get('/', (req, res) => {
  try {
    // Get backend URL from environment or construct from request
    const protocol = req.protocol;
    const host = req.get('host');
    const baseURL = `${protocol}://${host}`;

    // Array of 18 templates with metadata
    const templates = [
      {
        id: 1,
        name: 'Professional Classic',
        description: 'Clean and professional layout with traditional sections',
        preview_url: `${baseURL}/templates/Template1.jpeg`,
        file_url: `${baseURL}/templates/Template1.jpeg`
      },
      {
        id: 2,
        name: 'Modern Minimalist',
        description: 'Contemporary design with minimal elements and maximum clarity',
        preview_url: `${baseURL}/templates/Template2.jpeg`,
        file_url: `${baseURL}/templates/Template2.jpeg`
      },
      {
        id: 3,
        name: 'Creative Bold',
        description: 'Eye-catching design with bold typography and colors',
        preview_url: `${baseURL}/templates/Template3.jpeg`,
        file_url: `${baseURL}/templates/Template3.jpeg`
      },
      {
        id: 4,
        name: 'Executive Summary',
        description: 'Ideal for senior positions with emphasis on achievements',
        preview_url: `${baseURL}/templates/Template4.jpeg`,
        file_url: `${baseURL}/templates/Template4.jpeg`
      },
      {
        id: 5,
        name: 'Tech Professional',
        description: 'Designed for technology and IT professionals',
        preview_url: `${baseURL}/templates/Template5.jpeg`,
        file_url: `${baseURL}/templates/Template5.jpeg`
      },
      {
        id: 6,
        name: 'Academic Focus',
        description: 'Emphasizes education and research experience',
        preview_url: `${baseURL}/templates/Template6.jpeg`,
        file_url: `${baseURL}/templates/Template6.jpeg`
      },
      {
        id: 7,
        name: 'Chronological Order',
        description: 'Traditional reverse chronological layout format',
        preview_url: `${baseURL}/templates/Template7.jpeg`,
        file_url: `${baseURL}/templates/Template7.jpeg`
      },
      {
        id: 8,
        name: 'Functional Format',
        description: 'Highlights skills and accomplishments first',
        preview_url: `${baseURL}/templates/Template8.jpeg`,
        file_url: `${baseURL}/templates/Template8.jpeg`
      },
      {
        id: 9,
        name: 'Hybrid Structure',
        description: 'Combines chronological and functional elements',
        preview_url: `${baseURL}/templates/Template9.jpeg`,
        file_url: `${baseURL}/templates/Template9.jpeg`
      },
      {
        id: 10,
        name: 'Creative Designer',
        description: 'Perfect for designers and creative professionals',
        preview_url: `${baseURL}/templates/Template10.jpeg`,
        file_url: `${baseURL}/templates/Template10.jpeg`
      },
      {
        id: 11,
        name: 'Corporate Professional',
        description: 'Sophisticated design for corporate roles',
        preview_url: `${baseURL}/templates/Template11.jpeg`,
        file_url: `${baseURL}/templates/Template11.jpeg`
      },
      {
        id: 12,
        name: 'Startup Oriented',
        description: 'Modern style for startup and tech company roles',
        preview_url: `${baseURL}/templates/Template12.jpeg`,
        file_url: `${baseURL}/templates/Template12.jpeg`
      },
      {
        id: 13,
        name: 'One Page Resume',
        description: 'Concise single-page format for entry-level professionals',
        preview_url: `${baseURL}/templates/Template13.jpeg`,
        file_url: `${baseURL}/templates/Template13.jpeg`
      },
      {
        id: 14,
        name: 'Two Column Layout',
        description: 'Side-by-side layout with skills on the left',
        preview_url: `${baseURL}/templates/Template14.jpeg`,
        file_url: `${baseURL}/templates/Template14.jpeg`
      },
      {
        id: 15,
        name: 'Infographic Style',
        description: 'Visual elements and icons for better presentation',
        preview_url: `${baseURL}/templates/Template15.jpeg`,
        file_url: `${baseURL}/templates/Template15.jpeg`
      },
      {
        id: 16,
        name: 'Healthcare Professional',
        description: 'Tailored for medical and healthcare roles',
        preview_url: `${baseURL}/templates/Template16.jpeg`,
        file_url: `${baseURL}/templates/Template16.jpeg`
      },
      {
        id: 17,
        name: 'Finance Executive',
        description: 'Professional format for finance and accounting roles',
        preview_url: `${baseURL}/templates/Template17.jpeg`,
        file_url: `${baseURL}/templates/Template17.jpeg`
      },
      {
        id: 18,
        name: 'Marketing Manager',
        description: 'Dynamic design for marketing and sales professionals',
        preview_url: `${baseURL}/templates/Template18.jpeg`,
        file_url: `${baseURL}/templates/Template18.jpeg`
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
