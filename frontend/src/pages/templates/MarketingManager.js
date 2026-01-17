import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';

export default function MarketingManager() {
  const [name, setName] = useState('AMANDA WHITE');
  const [title, setTitle] = useState('Marketing Manager');
  const [summary, setSummary] = useState('Results-driven Marketing Manager with 8+ years of experience in digital marketing, brand management, and campaign strategy. Proven ability to increase brand awareness by 150%+ and drive revenue growth through innovative marketing initiatives.');
  const [phone, setPhone] = useState('+1 (555) 456-7890');
  const [email, setEmail] = useState('amanda.white@email.com');
  const [address, setAddress] = useState('Seattle, WA');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [skills, setSkills] = useState([
    { name: 'Digital Marketing', percentage: 94 },
    { name: 'Content Strategy', percentage: 92 },
    { name: 'Social Media Management', percentage: 90 },
    { name: 'Data Analytics', percentage: 88 },
    { name: 'Campaign Management', percentage: 91 }
  ]);

  const [experiences, setExperiences] = useState([
    {
      period: '2020 - Present',
      title: 'Senior Marketing Manager',
      company: 'Digital Innovations Inc',
      location: 'Seattle, WA',
      bullets: [
        'Led $3M annual marketing budget',
        'Increased brand awareness by 150%',
        'Managed team of 6 marketing professionals'
      ]
    },
    {
      period: '2017 - 2020',
      title: 'Marketing Coordinator',
      company: 'Creative Solutions Ltd',
      location: 'Portland, OR',
      bullets: [
        'Created 50+ marketing campaigns',
        'Managed social media growth to 500K followers',
        'Improved email marketing open rates by 45%'
      ]
    }
  ]);

  const [education, setEducation] = useState([
    { degree: 'MBA Marketing', school: 'University of Washington', year: '2018' },
    { degree: 'BS Communications', school: 'Oregon State University', year: '2016' }
  ]);

  const [certifications, setCertifications] = useState([
    'HubSpot Inbound Marketing Certification',
    'Google Analytics Certified',
    'Facebook Blueprint Certified'
  ]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const updateSkillPercentage = (index, value) => {
    const newSkills = [...skills];
    newSkills[index].percentage = Math.max(0, Math.min(100, value));
    setSkills(newSkills);
  };

  const updateSkillName = (index, value) => {
    const newSkills = [...skills];
    newSkills[index].name = value;
    setSkills(newSkills);
  };

  const addSkill = () => setSkills([...skills, { name: 'New Skill', percentage: 75 }]);
  const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));
  const addExperience = () => setExperiences([...experiences, { period: 'Start - End', title: 'Job Title', company: 'Company', location: 'Location', bullets: ['Achievement 1'] }]);
  const removeExperience = (index) => setExperiences(experiences.filter((_, i) => i !== index));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Marketing Manager Resume</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: FORM */}
          <div className="bg-white rounded-lg shadow p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
            <h2 className="text-2xl font-bold mb-6">Edit Your Resume</h2>
            
            {/* Photo Upload */}
            <div className="mb-8 p-4 bg-pink-50 rounded-lg border-2 border-pink-500">
              <h3 className="text-lg font-bold text-pink-900 mb-4">Profile Photo</h3>
              <div className="flex flex-col items-center gap-4">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-pink-500 shadow-lg" />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-pink-200 flex items-center justify-center text-4xl">📱</div>
                )}
                <label className="cursor-pointer bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition block text-center font-semibold">
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  Upload Photo
                </label>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full border border-pink-300 rounded px-3 py-2" />
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border border-pink-300 rounded px-3 py-2" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-pink-300 rounded px-3 py-2" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full border border-pink-300 rounded px-3 py-2" />
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Location" className="w-full border border-pink-300 rounded px-3 py-2" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Professional Summary</h3>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full border border-pink-300 rounded px-3 py-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Marketing Skills</h3>
                  <button onClick={addSkill} className="text-sm bg-pink-500 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <input type="text" value={skill.name} onChange={(e) => updateSkillName(index, e.target.value)} className="flex-1 border border-pink-300 rounded px-2 py-1 text-sm" />
                      <button onClick={() => removeSkill(index)} className="text-red-600">✕</button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Professional Experience</h3>
                  <button onClick={addExperience} className="text-sm bg-pink-500 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border border-pink-300 rounded p-3 bg-pink-50">
                      <input type="text" value={exp.title} onChange={(e) => { const newExps = [...experiences]; newExps[i].title = e.target.value; setExperiences(newExps); }} placeholder="Position" className="w-full border border-pink-300 rounded px-2 py-1 text-sm mb-2" />
                      <input type="text" value={exp.company} onChange={(e) => { const newExps = [...experiences]; newExps[i].company = e.target.value; setExperiences(newExps); }} placeholder="Company" className="w-full border border-pink-300 rounded px-2 py-1 text-sm mb-2" />
                      <button onClick={() => removeExperience(i)} className="text-red-600 text-sm">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: PREVIEW */}
          <div className="bg-white rounded-lg shadow overflow-hidden max-h-[calc(100vh-200px)] overflow-y-auto sticky top-8">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-8 text-white">
              <div className="flex gap-4 items-center">
                {profilePhoto && (
                  <img src={profilePhoto} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
                )}
                <div>
                  <h1 className="text-3xl font-bold">{name}</h1>
                  <h2 className="text-lg text-pink-100">{title}</h2>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-5">
              {/* Contact */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                <span>📧 {email}</span>
                <span>📞 {phone}</span>
                <span>📍 {address}</span>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-sm font-bold text-pink-600 uppercase tracking-wide mb-2">Professional Summary</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-sm font-bold text-pink-600 uppercase tracking-wide mb-3">Professional Experience</h3>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="bg-pink-50 p-3 rounded border-l-4 border-pink-500">
                      <div className="font-semibold text-gray-900">{exp.title}</div>
                      <div className="text-sm text-pink-700">{exp.company}</div>
                      <div className="text-xs text-gray-600">{exp.period} • {exp.location}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Marketing Skills */}
              <div>
                <h3 className="text-sm font-bold text-pink-600 uppercase tracking-wide mb-3">Marketing Skills</h3>
                <div className="space-y-2">
                  {skills.map((skill, i) => (
                    <div key={i} className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-900 font-medium">{skill.name}</span>
                        <span className="text-pink-700">{skill.percentage}%</span>
                      </div>
                      <div className="w-full bg-pink-100 h-2 rounded">
                        <div className="bg-pink-500 h-full rounded" style={{ width: `${skill.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-sm font-bold text-pink-600 uppercase tracking-wide mb-2">Education</h3>
                <div className="space-y-2">
                  {education.map((edu, i) => (
                    <div key={i} className="text-sm">
                      <div className="font-semibold text-gray-900">{edu.degree}</div>
                      <div className="text-gray-700">{edu.school} • {edu.year}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-sm font-bold text-pink-600 uppercase tracking-wide mb-2">Certifications</h3>
                <div className="space-y-1">
                  {certifications.map((cert, i) => (
                    <div key={i} className="text-sm text-gray-700">★ {cert}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
