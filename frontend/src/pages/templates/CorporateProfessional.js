import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';

export default function CorporateProf() {
  const [name, setName] = useState('CHRISTOPHER THOMPSON');
  const [title, setTitle] = useState('Finance Manager');
  const [summary, setSummary] = useState('Experienced Finance Manager with 10+ years in corporate finance, budgeting, and financial analysis. Proven track record of cost optimization and strategic financial planning for Fortune 500 companies.');
  const [phone, setPhone] = useState('+1 (555) 567-8901');
  const [email, setEmail] = useState('christopher.thompson@email.com');
  const [address, setAddress] = useState('New York, NY');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [skills, setSkills] = useState([
    { name: 'Financial Analysis', percentage: 94 },
    { name: 'Budget Planning', percentage: 92 },
    { name: 'SAP ERP', percentage: 88 },
    { name: 'Forecasting', percentage: 90 },
    { name: 'Team Leadership', percentage: 87 }
  ]);

  const [experiences, setExperiences] = useState([
    {
      period: '2019 - Present',
      title: 'Senior Finance Manager',
      company: 'Global Finance Corp',
      location: 'New York, NY',
      bullets: [
        'Managed $500M+ annual budget',
        'Reduced operational costs by 18%',
        'Led team of 12 financial analysts'
      ]
    },
    {
      period: '2015 - 2019',
      title: 'Finance Analyst',
      company: 'Investment Holdings LLC',
      location: 'Boston, MA',
      bullets: [
        'Analyzed financial statements',
        'Developed forecasting models',
        'Created cost-saving initiatives'
      ]
    }
  ]);

  const [education, setEducation] = useState([
    { degree: 'MBA Finance', school: 'Columbia Business School', year: '2015' },
    { degree: 'BS Accounting', school: 'University of Pennsylvania', year: '2013' }
  ]);

  const [certifications, setCertifications] = useState([
    'CFA Level III',
    'Certified Management Accountant'
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
        <h1 className="text-3xl font-bold mb-8">Corporate Professional Resume</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: FORM */}
          <div className="bg-white rounded-lg shadow p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
            <h2 className="text-2xl font-bold mb-6">Edit Your Resume</h2>
            
            {/* Photo Upload */}
            <div className="mb-8 p-4 bg-slate-100 rounded-lg border-2 border-slate-700">
              <h3 className="text-lg font-bold text-slate-700 mb-4">Profile Photo</h3>
              <div className="flex flex-col items-center gap-4">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded-lg object-cover border-4 border-slate-700 shadow-lg" />
                ) : (
                  <div className="w-32 h-32 rounded-lg bg-slate-300 flex items-center justify-center text-4xl text-slate-600">💼</div>
                )}
                <label className="cursor-pointer bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-800 transition block text-center font-semibold">
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
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full border border-slate-300 rounded px-3 py-2" />
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border border-slate-300 rounded px-3 py-2" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-slate-300 rounded px-3 py-2" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full border border-slate-300 rounded px-3 py-2" />
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Location" className="w-full border border-slate-300 rounded px-3 py-2" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Professional Summary</h3>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full border border-slate-300 rounded px-3 py-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Core Skills</h3>
                  <button onClick={addSkill} className="text-sm bg-slate-700 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <input type="text" value={skill.name} onChange={(e) => updateSkillName(index, e.target.value)} className="flex-1 border border-slate-300 rounded px-2 py-1 text-sm" />
                      <button onClick={() => removeSkill(index)} className="text-red-600">✕</button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Professional Experience</h3>
                  <button onClick={addExperience} className="text-sm bg-slate-700 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border border-slate-300 rounded p-3 bg-slate-50">
                      <input type="text" value={exp.title} onChange={(e) => { const newExps = [...experiences]; newExps[i].title = e.target.value; setExperiences(newExps); }} placeholder="Position" className="w-full border border-slate-300 rounded px-2 py-1 text-sm mb-2" />
                      <input type="text" value={exp.company} onChange={(e) => { const newExps = [...experiences]; newExps[i].company = e.target.value; setExperiences(newExps); }} placeholder="Company" className="w-full border border-slate-300 rounded px-2 py-1 text-sm mb-2" />
                      <button onClick={() => removeExperience(i)} className="text-red-600 text-sm">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: PREVIEW */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg shadow overflow-hidden max-h-[calc(100vh-200px)] overflow-y-auto sticky top-8 border-l-8 border-slate-700">
            <div className="bg-slate-700 text-white p-8 pb-12">
              <div className="flex gap-4 items-center">
                {profilePhoto && (
                  <img src={profilePhoto} alt="Profile" className="w-24 h-24 rounded-lg object-cover border-4 border-white shadow-lg" />
                )}
                <div>
                  <h1 className="text-3xl font-bold">{name}</h1>
                  <h2 className="text-lg text-slate-200">{title}</h2>
                  <div className="text-sm text-slate-200 mt-2 space-y-0.5">
                    <div>{email}</div>
                    <div>{phone}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {/* Summary */}
              <div>
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">Professional Summary</h3>
                <p className="text-sm text-gray-700">{summary}</p>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">Professional Experience</h3>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i}>
                      <div className="font-semibold text-gray-900">{exp.title}</div>
                      <div className="text-sm text-slate-700">{exp.company} • {exp.period}</div>
                      <div className="text-sm text-gray-600">{exp.location}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Skills */}
              <div>
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">Core Skills</h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill, i) => (
                    <div key={i} className="text-sm">
                      <div className="text-gray-900 font-semibold mb-1">{skill.name}</div>
                      <div className="w-full bg-slate-300 h-2 rounded">
                        <div className="bg-slate-700 h-full rounded" style={{ width: `${skill.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">Education</h3>
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
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">Certifications</h3>
                <div className="space-y-1">
                  {certifications.map((cert, i) => (
                    <div key={i} className="text-sm text-gray-700">✓ {cert}</div>
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
