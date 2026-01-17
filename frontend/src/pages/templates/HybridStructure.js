import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';

export default function HybridStructure() {
  const [name, setName] = useState('ROBERT BENNETT');
  const [title, setTitle] = useState('HR Director');
  const [summary, setSummary] = useState('Strategic HR Director with 13+ years of experience in talent management, organizational development, and employee relations. Proven ability to build high-performing cultures and implement successful transformation initiatives.');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [email, setEmail] = useState('robert.bennett@email.com');
  const [address, setAddress] = useState('Minneapolis, MN');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [skills, setSkills] = useState([
    'Talent Management', 'Organizational Development', 'Employee Relations', 'Compensation & Benefits', 'Training & Development', 'Compliance', 'HR Strategy', 'Recruitment'
  ]);

  const [experiences, setExperiences] = useState([
    {
      period: '2018 - Present',
      title: 'HR Director',
      company: 'Global Tech Solutions',
      location: 'Minneapolis, MN',
      bullets: [
        'Led HR for 500+ employee organization',
        'Reduced turnover by 30%',
        'Implemented new performance system'
      ]
    },
    {
      period: '2015 - 2018',
      title: 'HR Manager',
      company: 'Growth Enterprises',
      location: 'Chicago, IL',
      bullets: [
        'Managed recruitment for 200+ hires',
        'Developed leadership programs',
        'Improved engagement scores 40%'
      ]
    }
  ]);

  const [education, setEducation] = useState([
    { degree: 'SHRM-SCP Certification', school: 'SHRM', year: '2019' },
    { degree: 'MBA Human Resources', school: 'University of Minnesota', year: '2016' },
    { degree: 'BS Psychology', school: 'State University', year: '2011' }
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
  const addExperience = () => setExperiences([...experiences, { period: 'Start - End', title: 'Position', company: 'Company', location: 'Location', bullets: ['Achievement 1'] }]);
  const removeExperience = (index) => setExperiences(experiences.filter((_, i) => i !== index));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Hybrid Structure Resume</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: FORM */}
          <div className="bg-white rounded-lg shadow p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
            <h2 className="text-2xl font-bold mb-6">Edit Your Resume</h2>
            
            {/* Photo Upload */}
            <div className="mb-8 p-4 bg-emerald-50 rounded-lg border-2 border-emerald-600">
              <h3 className="text-lg font-bold text-emerald-900 mb-4">Profile Photo</h3>
              <div className="flex flex-col items-center gap-4">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded object-cover border-4 border-emerald-600 shadow-lg" />
                ) : (
                  <div className="w-32 h-32 rounded bg-emerald-200 flex items-center justify-center text-4xl">👥</div>
                )}
                <label className="cursor-pointer bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition block text-center font-semibold">
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
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full border border-emerald-300 rounded px-3 py-2" />
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border border-emerald-300 rounded px-3 py-2" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-emerald-300 rounded px-3 py-2" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full border border-emerald-300 rounded px-3 py-2" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Summary</h3>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full border border-emerald-300 rounded px-3 py-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Skills</h3>
                  <button onClick={addSkill} className="text-sm bg-emerald-600 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-2">
                  {skills.map((skill, i) => (
                    <div key={i} className="flex gap-2">
                      <input type="text" value={skill} onChange={(e) => { const newSkills = [...skills]; newSkills[i] = e.target.value; setSkills(newSkills); }} className="flex-1 border border-emerald-300 rounded px-2 py-1 text-sm" />
                      <button onClick={() => removeSkill(i)} className="text-red-600">✕</button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Experience</h3>
                  <button onClick={addExperience} className="text-sm bg-emerald-600 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border border-emerald-300 rounded p-3 bg-emerald-50">
                      <input type="text" value={exp.title} onChange={(e) => { const newExps = [...experiences]; newExps[i].title = e.target.value; setExperiences(newExps); }} placeholder="Position" className="w-full border border-emerald-300 rounded px-2 py-1 text-sm mb-2" />
                      <button onClick={() => removeExperience(i)} className="text-red-600 text-sm">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: PREVIEW */}
          <div className="bg-white rounded-lg shadow overflow-hidden max-h-[calc(100vh-200px)] overflow-y-auto sticky top-8 border-t-4 border-b-4 border-emerald-600">
            <div className="p-8 space-y-6">
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border-l-4 border-emerald-600">
                <div className="flex gap-4 items-center">
                  {profilePhoto && (
                    <img src={profilePhoto} alt="Profile" className="w-20 h-20 rounded object-cover border-3 border-emerald-600 shadow-md" />
                  )}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
                    <h2 className="text-lg text-emerald-700 font-semibold">{title}</h2>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-700 flex gap-4 flex-wrap">
                  <span>📧 {email}</span>
                  <span>📞 {phone}</span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-wide mb-2">Professional Summary</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
              </div>

              {/* Core Skills */}
              <div>
                <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-wide mb-2">Core Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span key={i} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-wide mb-3">Professional Experience</h3>
                <div className="space-y-4">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border-l-4 border-emerald-600 pl-3">
                      <div className="font-semibold text-gray-900">{exp.title}</div>
                      <div className="text-sm text-emerald-700">{exp.company}</div>
                      <div className="text-xs text-gray-600">{exp.period} • {exp.location}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-wide mb-2">Education & Certifications</h3>
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
