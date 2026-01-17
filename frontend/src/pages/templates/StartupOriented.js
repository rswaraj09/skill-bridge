import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';

export default function StartupOriented() {
  const [name, setName] = useState('NATHAN KUMAR');
  const [title, setTitle] = useState('CEO & Founder');
  const [summary, setSummary] = useState('Visionary entrepreneur and founder with 8+ years building disruptive tech startups. Raised $50M in venture funding. Expert in product strategy, scaling teams, and business development in fast-paced environments.');
  const [phone, setPhone] = useState('+1 (555) 789-0123');
  const [email, setEmail] = useState('nathan@startup.io');
  const [address, setAddress] = useState('San Francisco, CA');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [skills, setSkills] = useState([
    { name: 'Product Strategy', percentage: 95 },
    { name: 'Team Building', percentage: 92 },
    { name: 'Fundraising', percentage: 90 },
    { name: 'Scaling Growth', percentage: 88 },
    { name: 'Business Development', percentage: 87 }
  ]);

  const [experiences, setExperiences] = useState([
    {
      period: '2018 - Present',
      title: 'CEO & Founder',
      company: 'TechVenture Labs',
      location: 'San Francisco, CA',
      bullets: [
        'Founded and scaled company to $100M+ valuation',
        'Raised $50M Series B funding',
        'Grew team from 2 to 150+ employees'
      ]
    },
    {
      period: '2015 - 2018',
      title: 'Co-Founder & CTO',
      company: 'DataStream AI',
      location: 'San Francisco, CA',
      bullets: [
        'Built ML platform processing 1B+ records/day',
        'Raised $8M seed and Series A',
        'Acquired by major tech company'
      ]
    }
  ]);

  const [education, setEducation] = useState([
    { degree: 'BS Computer Science', school: 'Stanford University', year: '2014' }
  ]);

  const [certifications, setCertifications] = useState([
    'Y Combinator Alumni',
    'TechCrunch Disrupt Winner',
    'Forbes 30 Under 30'
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
        <h1 className="text-3xl font-bold mb-8">Startup Oriented Resume</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: FORM */}
          <div className="bg-white rounded-lg shadow p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
            <h2 className="text-2xl font-bold mb-6">Edit Your Resume</h2>
            
            {/* Photo Upload */}
            <div className="mb-8 p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border-2 border-orange-500">
              <h3 className="text-lg font-bold text-orange-900 mb-4">Profile Photo</h3>
              <div className="flex flex-col items-center gap-4">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-orange-500 shadow-lg" />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center text-4xl">🚀</div>
                )}
                <label className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition block text-center font-semibold">
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
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full border border-orange-300 rounded px-3 py-2" />
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border border-orange-300 rounded px-3 py-2" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-orange-300 rounded px-3 py-2" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full border border-orange-300 rounded px-3 py-2" />
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Location" className="w-full border border-orange-300 rounded px-3 py-2" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Executive Summary</h3>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full border border-orange-300 rounded px-3 py-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Key Skills</h3>
                  <button onClick={addSkill} className="text-sm bg-orange-500 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <input type="text" value={skill.name} onChange={(e) => updateSkillName(index, e.target.value)} className="flex-1 border border-orange-300 rounded px-2 py-1 text-sm" />
                      <button onClick={() => removeSkill(index)} className="text-red-600">✕</button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Experience</h3>
                  <button onClick={addExperience} className="text-sm bg-orange-500 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border border-orange-300 rounded p-3 bg-orange-50">
                      <input type="text" value={exp.title} onChange={(e) => { const newExps = [...experiences]; newExps[i].title = e.target.value; setExperiences(newExps); }} placeholder="Position" className="w-full border border-orange-300 rounded px-2 py-1 text-sm mb-2" />
                      <input type="text" value={exp.company} onChange={(e) => { const newExps = [...experiences]; newExps[i].company = e.target.value; setExperiences(newExps); }} placeholder="Company" className="w-full border border-orange-300 rounded px-2 py-1 text-sm mb-2" />
                      <button onClick={() => removeExperience(i)} className="text-red-600 text-sm">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: PREVIEW */}
          <div className="bg-white rounded-lg shadow overflow-hidden max-h-[calc(100vh-200px)] overflow-y-auto sticky top-8">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
              <div className="flex gap-4 items-center">
                {profilePhoto && (
                  <img src={profilePhoto} alt="Profile" className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" />
                )}
                <div>
                  <h1 className="text-3xl font-bold">{name}</h1>
                  <h2 className="text-lg text-orange-100">{title}</h2>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Contact */}
              <div className="flex flex-wrap gap-3 text-sm text-gray-700">
                <span>📧 {email}</span>
                <span>📞 {phone}</span>
                <span>📍 {address}</span>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-sm font-bold text-orange-600 uppercase mb-2">Executive Summary</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-sm font-bold text-orange-600 uppercase mb-3">Experience</h3>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="bg-gradient-to-r from-orange-50 to-red-50 p-3 rounded border-l-4 border-orange-500">
                      <div className="font-semibold text-gray-900">{exp.title}</div>
                      <div className="text-sm text-orange-600">{exp.company}</div>
                      <div className="text-xs text-gray-600">{exp.period} • {exp.location}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Skills */}
              <div>
                <h3 className="text-sm font-bold text-orange-600 uppercase mb-2">Key Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <div key={i} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {skill.name} {skill.percentage}%
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-sm font-bold text-orange-600 uppercase mb-2">Recognition</h3>
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
