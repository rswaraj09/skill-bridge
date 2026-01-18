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
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        {/* LEFT: FORM SIDEBAR */}
        <div className="w-[450px] bg-white shadow-xl z-10 overflow-y-auto h-full border-r border-gray-200">
          <div className="p-6 space-y-6 text-gray-900">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">Edit Your Resume</h2>

            {/* Photo Upload */}
            <div className="mb-8 p-4 bg-teal-50 rounded-lg border-2 border-teal-600">
              <h3 className="text-lg font-bold text-teal-900 mb-4">Profile Photo</h3>
              <div className="flex flex-col items-center gap-4">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-teal-600 shadow-lg" />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-teal-200 flex items-center justify-center text-4xl">👩‍💼</div>
                )}
                <label className="cursor-pointer bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition block text-center font-semibold w-full">
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
        </div>

        {/* RIGHT: A4 PREVIEW */}
        <div className="flex-1 bg-slate-900 overflow-y-auto p-8 flex justify-center">
          <div
            className="bg-white shadow-2xl overflow-hidden relative"
            style={{ width: '210mm', minHeight: '297mm' }}
          >
            <div className="grid grid-cols-12 h-full min-h-[297mm]">
              {/* Left Column - 4 Columns */}
              <div className="col-span-4 bg-teal-700 text-white p-8 space-y-8">
                {/* Photo */}
                <div className="text-center">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg" />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-teal-800 flex items-center justify-center text-5xl mx-auto shadow-lg">❖</div>
                  )}
                </div>

                {/* Name & Title */}
                <div className="text-center">
                  <h1 className="text-2xl font-bold uppercase tracking-wider leading-tight">{name}</h1>
                  <h2 className="text-teal-200 mt-2 font-medium">{title}</h2>
                </div>

                {/* Divider */}
                <div className="h-px bg-teal-500 w-1/2 mx-auto"></div>

                {/* Contact */}
                <div className="text-sm space-y-3">
                  <div className="opacity-90"><span className="opacity-60 block text-xs uppercase mb-1">Email</span> {email}</div>
                  <div className="opacity-90"><span className="opacity-60 block text-xs uppercase mb-1">Phone</span> {phone}</div>
                  <div className="opacity-90"><span className="opacity-60 block text-xs uppercase mb-1">Location</span> {address}</div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="font-bold text-teal-200 uppercase text-xs tracking-widest mb-4 border-b border-teal-600 pb-2">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                      <span key={i} className="text-sm bg-teal-800 px-3 py-1 rounded-sm block w-full text-center">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="font-bold text-teal-200 uppercase text-xs tracking-widest mb-4 border-b border-teal-600 pb-2">Certifications</h3>
                  <div className="space-y-2 text-sm">
                    {certifications.map((cert, i) => (
                      <div key={i} className="opacity-90">• {cert}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - 8 Columns */}
              <div className="col-span-8 p-10 space-y-8">
                {/* Summary */}
                <div>
                  <h3 className="font-bold text-teal-700 uppercase text-sm tracking-widest mb-4 border-b-2 border-teal-100 pb-2">Professional Profile</h3>
                  <p className="text-gray-700 leading-relaxed">{summary}</p>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="font-bold text-teal-700 uppercase text-sm tracking-widest mb-6 border-b-2 border-teal-100 pb-2">Experience</h3>
                  <div className="space-y-6">
                    {experiences.map((exp, i) => (
                      <div key={i} className="relative pl-6 border-l-2 border-teal-100">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-teal-100 border-2 border-white"></div>
                        <div className="mb-2">
                          <h4 className="font-bold text-gray-900 text-lg">{exp.title}</h4>
                          <div className="text-teal-600 font-medium">{exp.company}</div>
                          <div className="text-gray-500 text-sm italic">{exp.period} • {exp.location}</div>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                          {exp.bullets.map((bullet, j) => (
                            <li key={j}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="font-bold text-teal-700 uppercase text-sm tracking-widest mb-6 border-b-2 border-teal-100 pb-2">Education</h3>
                  <div className="space-y-4">
                    {education.map((edu, i) => (
                      <div key={i}>
                        <div className="font-bold text-gray-900">{edu.degree}</div>
                        <div className="text-gray-600">{edu.school}</div>
                        <div className="text-gray-500 text-sm mt-1">{edu.year}</div>
                      </div>
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
