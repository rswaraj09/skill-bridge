import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';

export default function AcademicFocus() {
  const [name, setName] = useState('PROFESSOR JAMES JOHNSON');
  const [title, setTitle] = useState('Research Scholar');
  const [summary, setSummary] = useState('Accomplished academic researcher with 15+ years in computer science and AI. Published 40+ peer-reviewed papers and received $5M+ in research grants. Expert in machine learning, natural language processing, and data science.');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [email, setEmail] = useState('j.johnson@university.edu');
  const [address, setAddress] = useState('Cambridge, MA');
  const [website, setWebsite] = useState('mit.edu/~jjohnson');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [skills, setSkills] = useState([
    { name: 'Machine Learning', percentage: 95 },
    { name: 'Research Methodology', percentage: 92 },
    { name: 'Data Analysis', percentage: 90 },
    { name: 'Academic Writing', percentage: 88 },
    { name: 'Teaching & Mentoring', percentage: 89 }
  ]);

  const [experiences, setExperiences] = useState([
    {
      period: '2010 - Present',
      title: 'Associate Professor',
      company: 'MIT Computer Science',
      location: 'Cambridge, MA',
      bullets: [
        'Lead AI and Machine Learning Lab with 8 PhD students',
        'Published 40+ peer-reviewed papers in top conferences',
        'Received $5M in NSF and DARPA research grants'
      ]
    },
    {
      period: '2006 - 2010',
      title: 'PhD Researcher',
      company: 'Stanford University',
      location: 'Stanford, CA',
      bullets: [
        'Focused on deep learning and neural networks',
        'Published 12 papers during PhD',
        'Best Paper Award 2009'
      ]
    }
  ]);

  const [education, setEducation] = useState([
    { degree: 'PhD Computer Science', school: 'Stanford University', year: '2010', gpa: 'GPA: 4.0' },
    { degree: 'BS Computer Science', school: 'UC Berkeley', year: '2006', gpa: 'GPA: 3.95' }
  ]);

  const [certifications, setCertifications] = useState([
    'IEEE Fellow',
    'ACM Distinguished Member',
    'Fulbright Scholar'
  ]);

  const [publications, setPublications] = useState([
    'Deep Learning for NLP: A Comprehensive Review (2023)',
    'Novel Approaches to Federated Learning (2022)',
    'Ethics in AI: Guidelines for Responsible Research (2022)'
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
        <h1 className="text-3xl font-bold mb-8">Academic Focus Resume</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: FORM */}
          <div className="bg-white rounded-lg shadow p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
            <h2 className="text-2xl font-bold mb-6">Edit Your Resume</h2>
            
            {/* Photo Upload */}
            <div className="mb-8 p-4 bg-slate-100 rounded-lg border-2 border-blue-900">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Profile Photo</h3>
              <div className="flex flex-col items-center gap-4">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded object-cover border-4 border-blue-900 shadow-lg" />
                ) : (
                  <div className="w-32 h-32 rounded bg-blue-100 flex items-center justify-center text-4xl text-blue-900">🎓</div>
                )}
                <label className="cursor-pointer bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition block text-center font-semibold">
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
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full border border-gray-300 rounded px-3 py-2" />
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border border-gray-300 rounded px-3 py-2" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-gray-300 rounded px-3 py-2" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Academic Summary</h3>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Research Skills</h3>
                  <button onClick={addSkill} className="text-sm bg-blue-900 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <input type="text" value={skill.name} onChange={(e) => updateSkillName(index, e.target.value)} className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm" />
                      <button onClick={() => removeSkill(index)} className="text-red-600">✕</button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Academic Experience</h3>
                  <button onClick={addExperience} className="text-sm bg-blue-900 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border border-gray-300 rounded p-3 bg-gray-50">
                      <input type="text" value={exp.title} onChange={(e) => { const newExps = [...experiences]; newExps[i].title = e.target.value; setExperiences(newExps); }} placeholder="Position Title" className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-2" />
                      <input type="text" value={exp.company} onChange={(e) => { const newExps = [...experiences]; newExps[i].company = e.target.value; setExperiences(newExps); }} placeholder="Institution" className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-2" />
                      <button onClick={() => removeExperience(i)} className="text-red-600 text-sm">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: PREVIEW */}
          <div className="bg-white rounded-lg shadow overflow-hidden max-h-[calc(100vh-200px)] overflow-y-auto sticky top-8 border-l-4 border-blue-900">
            <div className="p-8 space-y-5">
              {/* Header */}
              <div className="border-b-3 border-blue-900 pb-5">
                <div className="flex gap-4 items-start">
                  {profilePhoto && (
                    <img src={profilePhoto} alt="Profile" className="w-20 h-20 rounded object-cover border-2 border-blue-900 shadow-md flex-shrink-0" />
                  )}
                  <div>
                    <h1 className="text-2xl font-bold text-blue-900">{name}</h1>
                    <h2 className="text-sm text-blue-700 font-semibold">{title}</h2>
                    <div className="text-xs text-gray-600 mt-1 space-y-0.5">
                      <div>{email}</div>
                      <div>{phone}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wide mb-2">Academic Summary</h3>
                <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wide mb-2">Education</h3>
                <div className="space-y-2">
                  {education.map((edu, i) => (
                    <div key={i} className="text-xs">
                      <div className="font-semibold text-gray-900">{edu.degree}</div>
                      <div className="text-gray-700">{edu.school} • {edu.year}</div>
                      <div className="text-blue-700">{edu.gpa}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wide mb-2">Experience</h3>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border-l-2 border-blue-400 pl-2">
                      <div className="font-semibold text-gray-900 text-xs">{exp.title}</div>
                      <div className="text-xs text-blue-700">{exp.company}</div>
                      <div className="text-xs text-gray-600">{exp.period}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research Skills */}
              <div>
                <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wide mb-2">Research Skills</h3>
                <div className="grid grid-cols-1 gap-2">
                  {skills.map((skill, i) => (
                    <div key={i} className="text-xs">
                      <div className="flex justify-between mb-0.5">
                        <span className="text-gray-900 font-medium">{skill.name}</span>
                        <span className="text-blue-700">{skill.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded">
                        <div className="bg-blue-900 h-full rounded" style={{ width: `${skill.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recognitions */}
              <div>
                <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wide mb-2">Honors & Recognition</h3>
                <div className="space-y-1">
                  {certifications.map((cert, i) => (
                    <div key={i} className="text-xs text-gray-700">★ {cert}</div>
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
