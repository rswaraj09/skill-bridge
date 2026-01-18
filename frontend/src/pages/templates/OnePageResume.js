import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';

export default function OnePageResume() {
  const [name, setName] = useState('MICHELLE DAVIS');
  const [title, setTitle] = useState('Junior Full-Stack Developer');
  const [summary, setSummary] = useState('Enthusiastic junior developer with 2+ years of experience building web applications using React and Node.js. Quick learner with strong problem-solving skills.');
  const [phone, setPhone] = useState('+1 (555) 345-6789');
  const [email, setEmail] = useState('michelle.davis@email.com');
  const [address, setAddress] = useState('Austin, TX');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [skills, setSkills] = useState([
    'React', 'JavaScript', 'CSS', 'Node.js', 'MongoDB', 'Git', 'Responsive Design'
  ]);

  const [experiences, setExperiences] = useState([
    {
      period: '2023 - Present',
      title: 'Junior Developer',
      company: 'Tech Startup',
      bullets: ['Built React components', 'Fixed 25+ bugs']
    },
    {
      period: '2022 - 2023',
      title: 'Intern',
      company: 'Web Agency',
      bullets: ['Assisted senior developers', 'Created responsive layouts']
    }
  ]);

  const [education, setEducation] = useState([
    { degree: 'BS Computer Science', school: 'University of Texas', year: '2022' }
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
  const addExperience = () => setExperiences([...experiences, { period: 'Start - End', title: 'Job Title', company: 'Company', bullets: ['Achievement 1'] }]);
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
            <div className="mb-8 p-4 bg-indigo-50 rounded-lg border-2 border-indigo-600">
              <h3 className="text-lg font-bold text-indigo-900 mb-4">Profile Photo</h3>
              <div className="flex flex-col items-center gap-4">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-24 h-24 rounded object-cover border-2 border-indigo-600" />
                ) : (
                  <div className="w-24 h-24 rounded bg-indigo-200 flex items-center justify-center text-2xl text-indigo-600">📷</div>
                )}
                <label className="cursor-pointer bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 block text-center font-semibold w-full">
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  Upload Photo
                </label>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-bold mb-2">Personal Info</h3>
                <div className="space-y-2">
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full border border-gray-300 rounded px-2 py-1" />
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border border-gray-300 rounded px-2 py-1" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-gray-300 rounded px-2 py-1" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full border border-gray-300 rounded px-2 py-1" />
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Location" className="w-full border border-gray-300 rounded px-2 py-1" />
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">Summary</h3>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} className="w-full border border-gray-300 rounded px-2 py-1 text-xs" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold">Skills</h3>
                  <button onClick={addSkill} className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded">+</button>
                </div>
                <div className="space-y-1">
                  {skills.map((skill, i) => (
                    <div key={i} className="flex gap-1">
                      <input type="text" value={skill} onChange={(e) => { const newSkills = [...skills]; newSkills[i] = e.target.value; setSkills(newSkills); }} className="flex-1 border border-gray-300 rounded px-1 py-0.5 text-xs" />
                      <button onClick={() => removeSkill(i)} className="text-red-600 text-xs">✕</button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold">Experience</h3>
                  <button onClick={addExperience} className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded">+</button>
                </div>
                <div className="space-y-2">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border border-gray-300 rounded p-2 bg-gray-50">
                      <input type="text" value={exp.title} onChange={(e) => { const newExps = [...experiences]; newExps[i].title = e.target.value; setExperiences(newExps); }} placeholder="Position" className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs mb-1" />
                      <input type="text" value={exp.company} onChange={(e) => { const newExps = [...experiences]; newExps[i].company = e.target.value; setExperiences(newExps); }} placeholder="Company" className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs mb-1" />
                      <button onClick={() => removeExperience(i)} className="text-red-600 text-xs">Remove</button>
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
            className="bg-white shadow-2xl overflow-hidden relative border-t-8 border-indigo-600"
            style={{ width: '210mm', minHeight: '297mm' }}
          >
            <div className="p-10 space-y-6">
              {/* Header */}
              <div className="border-b-2 border-indigo-100 pb-6 mb-6">
                <div className="flex gap-6 items-center mb-4">
                  {profilePhoto && (
                    <img src={profilePhoto} alt="Profile" className="w-24 h-24 rounded object-cover border-2 border-indigo-600 shadow-md" />
                  )}
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{name}</h1>
                    <h2 className="text-xl text-indigo-600 font-semibold mt-1">{title}</h2>
                  </div>
                </div>
                <div className="text-sm text-gray-600 flex gap-4 font-medium">
                  <span>{email}</span>
                  <span className="text-indigo-300">•</span>
                  <span>{phone}</span>
                  <span className="text-indigo-300">•</span>
                  <span>{address}</span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="font-bold text-indigo-700 uppercase text-sm tracking-wider mb-2 border-l-4 border-indigo-600 pl-2">Professional Profile</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
              </div>

              {/* Experience */}
              <div>
                <h3 className="font-bold text-indigo-700 uppercase text-sm tracking-wider mb-4 border-l-4 border-indigo-600 pl-2">Experience</h3>
                <div className="space-y-4">
                  {experiences.map((exp, i) => (
                    <div key={i} className="text-sm">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-bold text-gray-900 text-base">{exp.title}</span>
                        <span className="text-indigo-600 font-medium whitespace-nowrap">{exp.period}</span>
                      </div>
                      <div className="text-gray-700 italic mb-1">{exp.company}</div>
                      <ul className="list-disc list-inside space-y-1 ml-1 text-gray-600">
                        {exp.bullets.map((bullet, j) => (
                          <li key={j}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="font-bold text-indigo-700 uppercase text-sm tracking-wider mb-3 border-l-4 border-indigo-600 pl-2">Key Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span key={i} className="bg-indigo-50 text-indigo-800 px-3 py-1 rounded text-sm font-medium border border-indigo-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="font-bold text-indigo-700 uppercase text-sm tracking-wider mb-3 border-l-4 border-indigo-600 pl-2">Education</h3>
                <div className="space-y-2">
                  {education.map((edu, i) => (
                    <div key={i} className="text-sm">
                      <div className="font-semibold text-gray-900">{edu.degree}</div>
                      <div className="text-gray-600">{edu.school} • {edu.year}</div>
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
