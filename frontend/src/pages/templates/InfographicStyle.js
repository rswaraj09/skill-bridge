import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';

export default function InfographicStyle() {
  const [name, setName] = useState('MARCUS JOHNSON');
  const [title, setTitle] = useState('Data Scientist');
  const [summary, setSummary] = useState('Data-driven expert with 9+ years transforming complex data into actionable insights. Specialized in machine learning, statistical analysis, and data visualization. Strong background in predictive modeling and business intelligence.');
  const [phone, setPhone] = useState('+1 (555) 890-1234');
  const [email, setEmail] = useState('marcus.johnson@email.com');
  const [address, setAddress] = useState('San Jose, CA');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [skills, setSkills] = useState([
    { name: 'Python', level: 95 },
    { name: 'Machine Learning', level: 92 },
    { name: 'SQL', level: 88 },
    { name: 'Data Visualization', level: 90 },
    { name: 'Statistical Analysis', level: 87 },
    { name: 'TensorFlow', level: 85 }
  ]);

  const [experiences, setExperiences] = useState([
    {
      period: '2020 - Present',
      title: 'Senior Data Scientist',
      company: 'Tech Giants Corp',
      bullets: ['Built ML models for 100M+ users', 'Led data team of 8', 'Reduced churn by 35%']
    },
    {
      period: '2017 - 2020',
      title: 'Data Scientist',
      company: 'Analytics Plus Inc',
      bullets: ['Developed forecasting models', 'Created data pipelines', 'Increased revenue 22%']
    }
  ]);

  const [education, setEducation] = useState([
    { degree: 'MS Data Science', school: 'Stanford University', year: '2016' },
    { degree: 'BS Statistics', school: 'UC Berkeley', year: '2014' }
  ]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const updateSkillName = (index, value) => {
    const newSkills = [...skills];
    newSkills[index].name = value;
    setSkills(newSkills);
  };

  const addSkill = () => setSkills([...skills, { name: 'New Skill', level: 75 }]);
  const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));
  const addExperience = () => setExperiences([...experiences, { period: 'Start - End', title: 'Position', company: 'Company', bullets: ['Achievement 1'] }]);
  const removeExperience = (index) => setExperiences(experiences.filter((_, i) => i !== index));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        {/* LEFT: FORM SIDEBAR */}
        <div className="w-[450px] bg-white shadow-xl z-10 overflow-y-auto h-full border-r border-gray-200">
          <div className="p-6 space-y-6 text-gray-900">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">Edit Your Resume</h2>

            {/* Photo Upload */}
            <div className="mb-8 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-900 mb-4">Profile Photo</h3>
              <div className="flex flex-col items-center gap-4">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-yellow-500 shadow-lg" />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-yellow-200 flex items-center justify-center text-4xl">📊</div>
                )}
                <label className="cursor-pointer bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition block text-center font-semibold w-full">
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
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full border border-yellow-300 rounded px-3 py-2" />
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border border-yellow-300 rounded px-3 py-2" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-yellow-300 rounded px-3 py-2" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full border border-yellow-300 rounded px-3 py-2" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Summary</h3>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full border border-yellow-300 rounded px-3 py-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Technical Skills</h3>
                  <button onClick={addSkill} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <input type="text" value={skill.name} onChange={(e) => updateSkillName(index, e.target.value)} className="flex-1 border border-yellow-300 rounded px-2 py-1 text-sm" />
                      <button onClick={() => removeSkill(index)} className="text-red-600">✕</button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Experience</h3>
                  <button onClick={addExperience} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border border-yellow-300 rounded p-3 bg-yellow-50">
                      <input type="text" value={exp.title} onChange={(e) => { const newExps = [...experiences]; newExps[i].title = e.target.value; setExperiences(newExps); }} placeholder="Position" className="w-full border border-yellow-300 rounded px-2 py-1 text-sm mb-2" />
                      <button onClick={() => removeExperience(i)} className="text-red-600 text-sm">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: A4 PREVIEW */}
        <div className="flex-1 bg-slate-900 overflow-y-auto p-8 flex justify-center">
          <div
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl overflow-hidden relative text-white"
            style={{ width: '210mm', minHeight: '297mm' }}
          >
            <div className="p-8 space-y-6">
              {/* Header */}
              <div className="text-center">
                {profilePhoto && (
                  <img src={profilePhoto} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-yellow-400 shadow-lg" />
                )}
                <h1 className="text-3xl font-bold text-yellow-400">{name}</h1>
                <h2 className="text-lg text-gray-300">{title}</h2>
                <div className="text-sm text-gray-400 mt-2 flex justify-center gap-3 flex-wrap">
                  <span>{email}</span>
                  <span>•</span>
                  <span>{phone}</span>
                </div>
              </div>

              {/* Summary */}
              <div className="border-t border-gray-600 pt-4">
                <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wide mb-2">About</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{summary}</p>
              </div>

              {/* Skills Visualization */}
              <div className="border-t border-gray-600 pt-4">
                <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wide mb-3">Technical Skills</h3>
                <div className="space-y-2">
                  {skills.map((skill, i) => (
                    <div key={i} className="text-xs">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-yellow-400 font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full" style={{ width: `${skill.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="border-t border-gray-600 pt-4">
                <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wide mb-3">Experience</h3>
                <div className="grid grid-cols-1 gap-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="bg-gray-700 bg-opacity-50 p-3 rounded-lg border-l-4 border-yellow-400">
                      <div className="font-semibold text-gray-200">{exp.title}</div>
                      <div className="text-sm text-yellow-400">{exp.company}</div>
                      <div className="text-xs text-gray-400">{exp.period}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="border-t border-gray-600 pt-4">
                <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wide mb-2">Education</h3>
                <div className="space-y-2">
                  {education.map((edu, i) => (
                    <div key={i} className="text-sm">
                      <div className="font-semibold text-gray-200">{edu.degree}</div>
                      <div className="text-gray-400">{edu.school} • {edu.year}</div>
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
