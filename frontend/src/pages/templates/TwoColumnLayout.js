import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';

export default function TwoColumnLayout() {
  const [name, setName] = useState('LAURA STEWART');
  const [title, setTitle] = useState('Project Manager');
  const [summary, setSummary] = useState('Experienced Project Manager with 9+ years managing complex initiatives for tech and finance sectors. Expertise in Agile, Scrum, and Waterfall methodologies. Proven track record delivering projects on time and within budget.');
  const [phone, setPhone] = useState('+1 (555) 567-8901');
  const [email, setEmail] = useState('laura.stewart@email.com');
  const [address, setAddress] = useState('Chicago, IL');
  const [website, setWebsite] = useState('laurastewart.pm');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [skills, setSkills] = useState([
    'Project Management', 'Agile/Scrum', 'Risk Management', 'Stakeholder Management', 'Budget Planning', 'Team Leadership', 'Microsoft Project', 'Jira'
  ]);

  const [experiences, setExperiences] = useState([
    {
      period: '2019 - Present',
      title: 'Senior Project Manager',
      company: 'Tech Innovations LLC',
      location: 'Chicago, IL',
      bullets: [
        'Managed $10M+ portfolio of projects',
        'Led cross-functional teams of 20+ members',
        'Achieved 98% on-time delivery rate'
      ]
    },
    {
      period: '2016 - 2019',
      title: 'Project Manager',
      company: 'Global Solutions Inc',
      location: 'Boston, MA',
      bullets: [
        'Managed 15+ concurrent projects',
        'Improved process efficiency by 40%',
        'Mentored 5 junior project managers'
      ]
    }
  ]);

  const [education, setEducation] = useState([
    { degree: 'MBA Project Management', school: 'Northwestern Kellogg', year: '2017' },
    { degree: 'BS Business Administration', school: 'University of Illinois', year: '2015' }
  ]);

  const [certifications, setCertifications] = useState([
    'PMP - Project Management Professional',
    'CSM - Certified Scrum Master',
    'ITIL Foundation'
  ]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => setSkills([...skills, 'New Skill']);
  const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));
  const addExperience = () => setExperiences([...experiences, { period: 'Start - End', title: 'Job Title', company: 'Company', location: 'Location', bullets: ['Achievement 1'] }]);
  const removeExperience = (index) => setExperiences(experiences.filter((_, i) => i !== index));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Two Column Layout Resume</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: FORM */}
          <div className="bg-white rounded-lg shadow p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
            <h2 className="text-2xl font-bold mb-6">Edit Your Resume</h2>
            
            {/* Photo Upload */}
            <div className="mb-8 p-4 bg-teal-50 rounded-lg border-2 border-teal-600">
              <h3 className="text-lg font-bold text-teal-900 mb-4">Profile Photo</h3>
              <div className="flex flex-col items-center gap-4">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-teal-600 shadow-lg" />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-teal-200 flex items-center justify-center text-4xl">👩‍💼</div>
                )}
                <label className="cursor-pointer bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition block text-center font-semibold">
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
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full border border-teal-300 rounded px-3 py-2" />
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border border-teal-300 rounded px-3 py-2" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-teal-300 rounded px-3 py-2" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full border border-teal-300 rounded px-3 py-2" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Summary</h3>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full border border-teal-300 rounded px-3 py-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Skills</h3>
                  <button onClick={addSkill} className="text-sm bg-teal-600 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-2">
                  {skills.map((skill, i) => (
                    <div key={i} className="flex gap-2">
                      <input type="text" value={skill} onChange={(e) => { const newSkills = [...skills]; newSkills[i] = e.target.value; setSkills(newSkills); }} className="flex-1 border border-teal-300 rounded px-2 py-1 text-sm" />
                      <button onClick={() => removeSkill(i)} className="text-red-600">✕</button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Experience</h3>
                  <button onClick={addExperience} className="text-sm bg-teal-600 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border border-teal-300 rounded p-3 bg-teal-50">
                      <input type="text" value={exp.title} onChange={(e) => { const newExps = [...experiences]; newExps[i].title = e.target.value; setExperiences(newExps); }} placeholder="Position" className="w-full border border-teal-300 rounded px-2 py-1 text-sm mb-2" />
                      <input type="text" value={exp.company} onChange={(e) => { const newExps = [...experiences]; newExps[i].company = e.target.value; setExperiences(newExps); }} placeholder="Company" className="w-full border border-teal-300 rounded px-2 py-1 text-sm mb-2" />
                      <button onClick={() => removeExperience(i)} className="text-red-600 text-sm">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: PREVIEW */}
          <div className="rounded-lg shadow overflow-hidden max-h-[calc(100vh-200px)] overflow-y-auto sticky top-8 grid grid-cols-1 bg-white border-l-8 border-teal-600">
            {/* Left Column - Sidebar */}
            <div className="bg-teal-700 text-white p-6 space-y-6">
              {/* Photo */}
              {profilePhoto && (
                <img src={profilePhoto} alt="Profile" className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg" />
              )}

              {/* Name */}
              <div className="text-center">
                <h1 className="text-2xl font-bold">{name}</h1>
                <h2 className="text-teal-100 text-sm">{title}</h2>
              </div>

              {/* Contact */}
              <div className="text-sm space-y-2 text-teal-100">
                <div>📧 {email}</div>
                <div>📞 {phone}</div>
                <div>📍 {address}</div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="font-bold text-teal-200 uppercase text-xs mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span key={i} className="bg-teal-600 text-white text-xs px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="font-bold text-teal-200 uppercase text-xs mb-2">Certifications</h3>
                <div className="space-y-1">
                  {certifications.map((cert, i) => (
                    <div key={i} className="text-xs text-teal-100">✓ {cert}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Main Content */}
            <div className="p-6 space-y-5">
              {/* Summary */}
              <div>
                <h3 className="font-bold text-teal-700 uppercase text-xs mb-2">Summary</h3>
                <p className="text-sm text-gray-700">{summary}</p>
              </div>

              {/* Experience */}
              <div>
                <h3 className="font-bold text-teal-700 uppercase text-xs mb-2">Experience</h3>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i}>
                      <div className="font-semibold text-gray-900">{exp.title}</div>
                      <div className="text-sm text-teal-700">{exp.company}</div>
                      <div className="text-xs text-gray-600">{exp.period} • {exp.location}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="font-bold text-teal-700 uppercase text-xs mb-2">Education</h3>
                <div className="space-y-2">
                  {education.map((edu, i) => (
                    <div key={i} className="text-sm">
                      <div className="font-semibold text-gray-900">{edu.degree}</div>
                      <div className="text-gray-700">{edu.school} • {edu.year}</div>
                    </div>
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
