import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { ResumeTemplate } from '../components/ResumeTemplate';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { Download, ArrowLeft, Eye } from 'lucide-react';

export default function TemplateEditor() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('id');
  const templateName = searchParams.get('name');
  const [templateImage, setTemplateImage] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profession: '',
    city: '',
    country: '',
    pinCode: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
    certifications: ''
  });

  useEffect(() => {
    if (templateId) {
      // Fetch predefined template data from backend
      fetchTemplateData(templateId);
    }
  }, [templateId]);

  const fetchTemplateData = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/templates/${id}`);
      if (response.ok) {
        const result = await response.json();
        setFormData(result.data);
        toast.success(`Loaded template: ${templateName}`);
      }
    } catch (error) {
      console.error('Error loading template:', error);
      toast.error('Failed to load template data');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDownload = () => {
    // Create a composite resume with form data and template
    const resumeContent = `
${formData.firstName} ${formData.lastName}
${formData.email} | ${formData.phone}
${formData.city}, ${formData.country} - ${formData.pinCode}

PROFESSION
${formData.profession}

PROFESSIONAL SUMMARY
${formData.summary}

EXPERIENCE
${formData.experience}

EDUCATION
${formData.education}

SKILLS
${formData.skills}

CERTIFICATIONS
${formData.certifications}
    `.trim();

    const element = document.createElement('a');
    const file = new Blob([resumeContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${formData.firstName}_${formData.lastName}_resume.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Resume downloaded successfully!');
  };

  const handlePreview = () => {
    toast.info('Preview feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/templates')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Templates
              </Button>
              <div>
                <h1 className="text-4xl font-heading font-bold text-foreground">
                  {templateName || 'Template Editor'}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Fill in your details to customize your resume
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handlePreview}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Preview
              </Button>
              <Button
                onClick={handleDownload}
                className="flex items-center gap-2 btn-primary"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="p-8 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="First Name"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Last Name"
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="mt-2"
                      />
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        className="mt-2"
                      />
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="profession">Profession/Job Title *</Label>
                      <Input
                        id="profession"
                        name="profession"
                        value={formData.profession}
                        onChange={handleInputChange}
                        placeholder="e.g., Software Engineer"
                        className="mt-2"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="City"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          placeholder="Country"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pinCode">Pin Code</Label>
                        <Input
                          id="pinCode"
                          name="pinCode"
                          value={formData.pinCode}
                          onChange={handleInputChange}
                          placeholder="12345"
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Summary */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">
                      Professional Summary
                    </h3>
                    <Label htmlFor="summary">Summary</Label>
                    <Textarea
                      id="summary"
                      name="summary"
                      value={formData.summary}
                      onChange={handleInputChange}
                      placeholder="Write a brief professional summary..."
                      className="mt-2 min-h-[100px]"
                    />
                  </div>

                  {/* Experience */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">
                      Experience
                    </h3>
                    <Label htmlFor="experience">Work Experience</Label>
                    <Textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      placeholder="Add your work experience here..."
                      className="mt-2 min-h-[120px]"
                    />
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">
                      Education
                    </h3>
                    <Label htmlFor="education">Education</Label>
                    <Textarea
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      placeholder="Add your education details..."
                      className="mt-2 min-h-[100px]"
                    />
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">
                      Skills & Certifications
                    </h3>
                    <Label htmlFor="skills">Skills</Label>
                    <Textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      placeholder="List your skills separated by commas..."
                      className="mt-2 min-h-[80px]"
                    />

                    <Label htmlFor="certifications" className="mt-4 block">
                      Certifications
                    </Label>
                    <Textarea
                      id="certifications"
                      name="certifications"
                      value={formData.certifications}
                      onChange={handleInputChange}
                      placeholder="Add your certifications..."
                      className="mt-2 min-h-[80px]"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Right Side - Template Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="p-6 sticky top-24 max-h-[calc(100vh-150px)] overflow-y-auto">
                <div className="bg-white rounded-lg border-2 border-gray-200 shadow-lg overflow-auto">
                  {/* Dynamic Resume Template */}
                  <ResumeTemplate
                    firstName={formData.firstName}
                    lastName={formData.lastName}
                    email={formData.email}
                    phone={formData.phone}
                    profession={formData.profession}
                    city={formData.city}
                    country={formData.country}
                    pinCode={formData.pinCode}
                    summary={formData.summary}
                    experience={formData.experience}
                    education={formData.education}
                    skills={formData.skills}
                    certifications={formData.certifications}
                  />
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    💡 <strong>Tip:</strong> Fill in the form on the left to see your information appear on the resume template in real-time. Download your resume when complete!
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
