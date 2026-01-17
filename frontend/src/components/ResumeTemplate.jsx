import React from 'react';
import './ResumeTemplate.css';

export const ResumeTemplate = ({
  firstName = 'Your First',
  lastName = 'Name',
  email = 'your.email@example.com',
  phone = '+1 (555) 123-4567',
  profession = 'Your Job Title',
  city = 'City',
  country = 'Country',
  pinCode = '12345',
  summary = 'Write a brief professional summary about yourself...',
  experience = 'Add your work experience here...',
  education = 'Add your education details here...',
  skills = 'List your skills separated by commas...',
  certifications = 'Add your certifications here...'
}) => {
  const fullName = `${firstName} ${lastName}`.trim();
  const location = [city, country, pinCode].filter(Boolean).join(', ');

  // Parse skills into array (comma-separated)
  const skillsArray = skills ? skills.split(',').map(s => s.trim()).filter(s => s) : [];

  return (
    <div className="resume-container">
      {/* Header Section */}
      <div className="resume-header">
        <div className="header-content">
          <h1 className="resume-name">{fullName}</h1>
          <p className="resume-title">{profession}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="resume-body">
        {/* Left Column */}
        <div className="resume-left">
          {/* Profile Picture Placeholder */}
          <div className="profile-section">
            <div className="profile-image">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50" fill="#e9ebef" />
                <circle cx="50" cy="35" r="15" fill="#717182" />
                <ellipse cx="50" cy="70" rx="25" ry="20" fill="#717182" />
              </svg>
            </div>
          </div>

          {/* Summary Section */}
          {summary && (
            <div className="resume-section left-section">
              <h3 className="section-title-left">SUMMARY</h3>
              <p className="section-content">{summary}</p>
            </div>
          )}

          {/* Education Section */}
          {education && (
            <div className="resume-section left-section">
              <h3 className="section-title-left">EDUCATION</h3>
              <div className="section-content whitespace-pre-wrap">{education}</div>
            </div>
          )}

          {/* Skills Section with Progress Bars */}
          {skillsArray.length > 0 && (
            <div className="resume-section left-section">
              <h3 className="section-title-left">RELEVANT SKILLS</h3>
              <div className="skills-list">
                {skillsArray.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <span className="skill-name">{skill}</span>
                    <div className="skill-bar">
                      <div 
                        className="skill-bar-fill" 
                        style={{ width: `${75 + (index % 4) * 5}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="resume-right">
          {/* Contact Section */}
          <div className="resume-section right-section">
            <h3 className="section-title-right">CONTACT</h3>
            <div className="contact-list">
              <div className="contact-item">
                <span className="contact-label">phone</span>
                <span className="contact-value">{phone}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">email</span>
                <span className="contact-value">{email}</span>
              </div>
              {location && (
                <div className="contact-item">
                  <span className="contact-label">address</span>
                  <span className="contact-value">{location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Experience Section */}
          {experience && (
            <div className="resume-section right-section">
              <h3 className="section-title-right">PROFESSIONAL EXPERIENCE</h3>
              <div className="section-content whitespace-pre-wrap">{experience}</div>
            </div>
          )}

          {/* Certifications Section */}
          {certifications && (
            <div className="resume-section right-section">
              <h3 className="section-title-right">CERTIFICATIONS</h3>
              <div className="section-content whitespace-pre-wrap">{certifications}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate;
