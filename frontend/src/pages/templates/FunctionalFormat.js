import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';

export default function FunctionalFormat() {
  const [name, setName] = useState('JENNIFER PARKER');
  const [title, setTitle] = useState('Sales Executive');
  const [summary, setSummary] = useState('Dynamic Sales Executive with proven success generating revenue and building client relationships. Expert in solution selling, account management, and building high-performance sales teams. Consistently exceed quota by 25%+.');
  const [phone, setPhone] = useState('+1 (555) 345-6789');
  const [email, setEmail] = useState('jennifer.parker@email.com');
  const [address, setAddress] = useState('Denver, CO');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [skills, setSkills] = useState([
    { category: 'Sales & Revenue', items: ['Account Management', 'Solution Selling', 'Revenue Growth', 'Client Relations'] },
    { category: 'Leadership', items: ['Team Building', 'Sales Strategy', 'Performance Management', 'Coaching'] },
    { category: 'Technical', items: ['Salesforce CRM', 'Excel', 'Data Analysis', 'Business Intelligence'] }
  ]);

  const [experiences, setExperiences] = useState([
    {
      period: '2018 - Present',
      title: 'Senior Sales Executive',
      company: 'Enterprise Solutions Inc',
      bullets: ['Led $50M+ sales team', 'Increased revenue 35%', 'Won 12 major accounts']
    },
    {
      period: '2015 - 2018',
      title: 'Sales Manager',
      company: 'Growth Partners LLC',
      bullets: ['Managed team of 15', 'Exceeded quotas consistently', 'Developed new sales strategies']
    }
  ]);

  const [education, setEducation] = useState([
    { degree: 'MBA Sales Leadership', school: 'University of Colorado', year: '2017' },
    { degree: 'BS Business Marketing', school: 'Colorado State', year: '2014' }
  ]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

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
            <div className="mb-8 p-4 bg-red-50 rounded-lg border-2 border-red-600">
              <h3 className="text-lg font-bold text-red-900 mb-4">Profile Photo</h3>
              <div className="flex flex-col items-center gap-4">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-red-600 shadow-lg" />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-red-200 flex items-center justify-center text-4xl">💼</div>
                )}
                <label className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition block text-center font-semibold w-full">
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
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full border border-red-300 rounded px-3 py-2" />
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border border-red-300 rounded px-3 py-2" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-red-300 rounded px-3 py-2" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full border border-red-300 rounded px-3 py-2" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Professional Summary</h3>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full border border-red-300 rounded px-3 py-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Experience</h3>
                  <button onClick={addExperience} className="text-sm bg-red-600 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border border-red-300 rounded p-3 bg-red-50">
                      <input type="text" value={exp.title} onChange={(e) => { const newExps = [...experiences]; newExps[i].title = e.target.value; setExperiences(newExps); }} placeholder="Position" className="w-full border border-red-300 rounded px-2 py-1 text-sm mb-2" />
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
            className="bg-white shadow-2xl overflow-hidden relative border-r-8 border-red-600"
            style={{ width: '210mm', minHeight: '297mm' }}
          >
            <div className="p-8 space-y-6">
              {/* Header */}
              <div className="border-b-4 border-red-600 pb-4">
                {profilePhoto && (
                  <img src={profilePhoto} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-3 border-red-600" />
                )}
                <h1 className="text-3xl font-bold text-center text-gray-900">{name}</h1>
                <h2 className="text-lg text-center text-red-700 font-bold">{title}</h2>
                <div className="text-sm text-gray-700 mt-3 flex justify-center gap-4 flex-wrap">
                  <span>{email}</span>
                  <span>•</span>
                  <span>{phone}</span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-sm font-bold text-red-700 uppercase tracking-wide mb-2">Summary</h3>
                <p className="text-sm text-gray-700">{summary}</p>
              </div>

              {/* Core Competencies */}
              <div>
                <h3 className="text-sm font-bold text-red-700 uppercase tracking-wide mb-3">Core Competencies</h3>
                <div className="space-y-3">
                  {skills.map((skillGroup, i) => (
                    <div key={i}>
                      <h4 className="text-xs font-bold text-gray-900 mb-1">{skillGroup.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, j) => (
                          <span key={j} className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional Experience */}
              <div>
                <h3 className="text-sm font-bold text-red-700 uppercase tracking-wide mb-3">Professional Experience</h3>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i}>
                      <div className="font-semibold text-gray-900">{exp.title}</div>
                      <div className="text-sm text-red-700">{exp.company} ({exp.period})</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-sm font-bold text-red-700 uppercase tracking-wide mb-2">Education</h3>
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
