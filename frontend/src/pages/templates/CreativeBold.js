import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';

export default function CreativeBold() {
  const [name, setName] = useState('MICHAEL TORRES');
  const [title, setTitle] = useState('Creative Director');
  const [summary, setSummary] = useState('Award-winning Creative Director with 10+ years of experience in advertising, branding, and creative strategy. Passionate about creating innovative campaigns that drive business results.');
  const [phone, setPhone] = useState('+1 (555) 987-6543');
  const [email, setEmail] = useState('michael.torres@email.com');
  const [address, setAddress] = useState('Los Angeles, USA, 90001');
  const [website, setWebsite] = useState('michaelcreative.com');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [skills, setSkills] = useState([
    { name: 'Creative Strategy', percentage: 95 },
    { name: 'Art Direction', percentage: 92 },
    { name: 'Campaign Development', percentage: 90 },
    { name: 'Team Leadership', percentage: 88 }
  ]);

  const [experiences, setExperiences] = useState([
    {
      period: '2020 - Present',
      title: 'Creative Director',
      company: 'Creative Studios Inc',
      location: 'Los Angeles, CA',
      bullets: [
        'Led award-winning campaigns for Fortune 500 clients',
        'Managed creative team of 15+ professionals',
        'Increased client ROI by 60%'
      ]
    }
  ]);

  const [education, setEducation] = useState([
    { degree: 'Bachelor of Fine Arts', school: 'California Institute of the Arts', year: '2014' }
  ]);

  const [certifications, setCertifications] = useState([
    'Ad Age Certification',
    'Cannes Lions Award Winner'
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
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        {/* LEFT: FORM SIDEBAR */}
        <div className="w-[450px] bg-white shadow-xl z-10 overflow-y-auto h-full border-r border-gray-200">
          <div className="p-6 space-y-6 text-gray-900">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">Edit Your Resume</h2>

            {/* Photo Upload */}
            <div className="mb-8 p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg border-2 border-pink-400">
              <h3 className="text-lg font-bold mb-4">Profile Photo</h3>
              <div className="flex flex-col items-center gap-4">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-pink-600" />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-4xl text-white">🎨</div>
                )}
                <label className="cursor-pointer bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded hover:opacity-90 transition block text-center font-semibold w-full">
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
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Summary</h3>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Experience</h3>
                  <button onClick={addExperience} className="text-sm bg-pink-600 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border border-gray-300 rounded p-3 bg-gray-50">
                      <input type="text" value={exp.period} onChange={(e) => { const newExps = [...experiences]; newExps[i].period = e.target.value; setExperiences(newExps); }} placeholder="Period" className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-2" />
                      <input type="text" value={exp.title} onChange={(e) => { const newExps = [...experiences]; newExps[i].title = e.target.value; setExperiences(newExps); }} placeholder="Job Title" className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-2" />
                      <button onClick={() => removeExperience(i)} className="text-red-600 text-sm">Remove</button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Skills</h3>
                  <button onClick={addSkill} className="text-sm bg-pink-600 text-white px-3 py-1 rounded">+ Add</button>
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
            </div>
          </div>
        </div>

        {/* RIGHT: A4 PREVIEW */}
        <div className="flex-1 bg-slate-900 overflow-y-auto p-8 flex justify-center">
          <div
            className="bg-white shadow-2xl overflow-hidden relative"
            style={{ width: '210mm', minHeight: '297mm' }}
          >
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 h-full min-h-[297mm]">
              {/* Header */}
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-6">
                <div className="text-center">
                  {profilePhoto && (
                    <img src={profilePhoto} alt="Profile" className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg" />
                  )}
                  <h1 className="text-3xl font-bold">{name}</h1>
                  <h2 className="text-lg text-pink-100">{title}</h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>

                <div>
                  <h3 className="text-sm font-bold text-pink-600 uppercase mb-2 border-b-2 border-pink-600 pb-1">Contact</h3>
                  <div className="text-xs text-gray-700 space-y-1">
                    <div>{phone}</div>
                    <div>{email}</div>
                    <div>{address}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-pink-600 uppercase mb-2 border-b-2 border-pink-600 pb-1">Experience</h3>
                  <div className="space-y-2">
                    {experiences.map((exp, i) => (
                      <div key={i} className="text-xs">
                        <div className="font-bold text-gray-800">{exp.title}</div>
                        <div className="text-gray-600">{exp.company} | {exp.period}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-pink-600 uppercase mb-2 border-b-2 border-pink-600 pb-1">Skills</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {skills.map((skill, i) => (
                      <div key={i} className="text-xs text-gray-700">• {skill.name}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
