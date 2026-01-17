import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';

export default function TechProfessional() {
  const [name, setName] = useState('EMILY RODRIGUEZ');
  const [title, setTitle] = useState('Full Stack Developer');
  const [summary, setSummary] = useState('Experienced Full Stack Developer with 6+ years building scalable web applications using React, Node.js, and cloud technologies. Passionate about clean code and innovative solutions.');
  const [phone, setPhone] = useState('+1 (555) 456-7890');
  const [email, setEmail] = useState('emily.rodriguez@email.com');
  const [address, setAddress] = useState('San Francisco, USA');
  const [website, setWebsite] = useState('emilydev.io');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [skills, setSkills] = useState([
    { name: 'React/JavaScript', percentage: 95 },
    { name: 'Node.js', percentage: 90 },
    { name: 'Cloud Architecture', percentage: 85 },
    { name: 'Database Design', percentage: 88 },
    { name: 'DevOps', percentage: 82 }
  ]);

  const [experiences, setExperiences] = useState([
    {
      period: '2021 - Present',
      title: 'Senior Full Stack Developer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      bullets: [
        'Built microservices architecture serving 1M+ users',
        'Reduced API response time by 40%',
        'Mentored 5 junior developers'
      ]
    },
    {
      period: '2019 - 2021',
      title: 'Full Stack Developer',
      company: 'StartupX',
      location: 'San Francisco, CA',
      bullets: [
        'Developed e-commerce platform',
        'Implemented CI/CD pipelines',
        'Optimized database queries'
      ]
    }
  ]);

  const [education, setEducation] = useState([
    { degree: 'BS Computer Science', school: 'UC Berkeley', year: '2019' }
  ]);

  const [certifications, setCertifications] = useState([
    'AWS Solutions Architect',
    'Kubernetes Certification'
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
  const addBullet = (expIndex) => { const newExps = [...experiences]; newExps[expIndex].bullets.push('Achievement'); setExperiences(newExps); };
  const removeBullet = (expIndex, bulletIndex) => { const newExps = [...experiences]; newExps[expIndex].bullets = newExps[expIndex].bullets.filter((_, i) => i !== bulletIndex); setExperiences(newExps); };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tech Professional Resume</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: FORM */}
          <div className="bg-white rounded-lg shadow p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
            <h2 className="text-2xl font-bold mb-6">Edit Your Resume</h2>
            
            {/* Photo Upload */}
            <div className="mb-8 p-4 bg-slate-900 rounded-lg border-2 border-cyan-500">
              <h3 className="text-lg font-bold text-white mb-4">Profile Photo</h3>
              <div className="flex flex-col items-center gap-4">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded object-cover border-4 border-cyan-500 shadow-lg" />
                ) : (
                  <div className="w-32 h-32 rounded bg-slate-700 flex items-center justify-center text-4xl text-cyan-400">{'<>'}</div>
                )}
                <label className="cursor-pointer bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition block text-center font-semibold">
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
                  <input type="text" value={name.split(' ')[0]} onChange={(e) => setName(`${e.target.value} ${name.split(' ')[1]}`)} placeholder="First Name" className="w-full border border-gray-300 rounded px-3 py-2" />
                  <input type="text" value={name.split(' ')[1]} onChange={(e) => setName(`${name.split(' ')[0]} ${e.target.value}`)} placeholder="Last Name" className="w-full border border-gray-300 rounded px-3 py-2" />
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border border-gray-300 rounded px-3 py-2" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-gray-300 rounded px-3 py-2" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Summary</h3>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Skills</h3>
                  <button onClick={addSkill} className="text-sm bg-cyan-600 text-white px-3 py-1 rounded">+ Add</button>
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
                  <h3 className="text-xl font-bold">Experience</h3>
                  <button onClick={addExperience} className="text-sm bg-cyan-600 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border border-gray-300 rounded p-3 bg-gray-50">
                      <input type="text" value={exp.title} onChange={(e) => { const newExps = [...experiences]; newExps[i].title = e.target.value; setExperiences(newExps); }} placeholder="Job Title" className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-2" />
                      <button onClick={() => removeExperience(i)} className="text-red-600 text-sm">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: PREVIEW */}
          <div className="bg-slate-900 rounded-lg shadow overflow-hidden max-h-[calc(100vh-200px)] overflow-y-auto sticky top-8 text-white">
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="border-b-2 border-cyan-500 pb-4">
                {profilePhoto && (
                  <img src={profilePhoto} alt="Profile" className="w-16 h-16 rounded object-cover mb-3 border-2 border-cyan-500" />
                )}
                <h1 className="text-3xl font-bold text-cyan-400">{name}</h1>
                <h2 className="text-lg text-gray-300">/* {title} */</h2>
              </div>

              {/* Summary */}
              <div className="text-sm text-gray-300">
                <p>{summary}</p>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-sm font-bold text-cyan-400 uppercase mb-2">// Contact</h3>
                <div className="text-xs text-gray-300 space-y-1">
                  <div>{email} | {phone}</div>
                  <div>{address}</div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-sm font-bold text-cyan-400 uppercase mb-2">// Tech Stack</h3>
                <div className="grid grid-cols-2 gap-2">
                  {skills.map((skill, i) => (
                    <div key={i} className="text-xs text-gray-300">
                      <div className="text-cyan-400">└─ {skill.name}</div>
                      <div className="w-full bg-slate-700 h-1 rounded mt-1">
                        <div className="bg-cyan-500 h-full rounded" style={{ width: `${skill.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-sm font-bold text-cyan-400 uppercase mb-2">// Experience</h3>
                <div className="space-y-2">
                  {experiences.map((exp, i) => (
                    <div key={i} className="text-xs text-gray-300">
                      <div className="text-cyan-400">├─ {exp.title}</div>
                      <div className="ml-3 text-gray-400">{exp.company} ({exp.period})</div>
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
