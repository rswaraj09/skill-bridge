import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';

export default function ChronologicalOrder() {
  const [name, setName] = useState('JAMES MITCHELL');
  const [title, setTitle] = useState('Operations Manager');
  const [summary, setSummary] = useState('Strategic Operations Manager with 11+ years optimizing business processes and managing large-scale operations. Expert in supply chain management, cost reduction, and team leadership.');
  const [phone, setPhone] = useState('+1 (555) 678-9012');
  const [email, setEmail] = useState('james.mitchell@email.com');
  const [address, setAddress] = useState('Atlanta, GA');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [experiences, setExperiences] = useState([
    {
      period: '2019 - Present',
      title: 'Senior Operations Manager',
      company: 'Logistics Plus',
      location: 'Atlanta, GA',
      bullets: [
        'Managed $50M+ budget',
        'Reduced operational costs by 25%',
        'Led team of 45 professionals'
      ]
    },
    {
      period: '2016 - 2019',
      title: 'Operations Supervisor',
      company: 'Supply Chain Solutions',
      location: 'Charlotte, NC',
      bullets: [
        'Optimized warehouse processes',
        'Improved productivity by 35%',
        'Managed vendor relationships'
      ]
    },
    {
      period: '2013 - 2016',
      title: 'Operations Associate',
      company: 'Distribution Partners Inc',
      location: 'Raleigh, NC',
      bullets: [
        'Coordinated daily operations',
        'Implemented new tracking systems',
        'Trained staff on procedures'
      ]
    }
  ]);

  const [education, setEducation] = useState([
    { degree: 'MBA Operations Management', school: 'Georgia Tech', year: '2016' },
    { degree: 'BS Business', school: 'University of North Carolina', year: '2013' }
  ]);

  const [skills, setSkills] = useState([
    'Operations Management', 'Supply Chain', 'Vendor Management', 'Cost Analysis', 'Team Leadership', 'Process Improvement'
  ]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const addExperience = () => setExperiences([...experiences, { period: 'Start - End', title: 'Job Title', company: 'Company', location: 'Location', bullets: ['Achievement 1'] }]);
  const removeExperience = (index) => setExperiences(experiences.filter((_, i) => i !== index));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Chronological Order Resume</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: FORM */}
          <div className="bg-white rounded-lg shadow p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
            <h2 className="text-2xl font-bold mb-6">Edit Your Resume</h2>
            
            {/* Photo Upload */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border-2 border-blue-600">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Profile Photo</h3>
              <div className="flex flex-col items-center gap-4">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded object-cover border-4 border-blue-600 shadow-lg" />
                ) : (
                  <div className="w-32 h-32 rounded bg-blue-200 flex items-center justify-center text-4xl">⏰</div>
                )}
                <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition block text-center font-semibold">
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
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full border border-blue-300 rounded px-3 py-2" />
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border border-blue-300 rounded px-3 py-2" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-blue-300 rounded px-3 py-2" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full border border-blue-300 rounded px-3 py-2" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Summary</h3>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full border border-blue-300 rounded px-3 py-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Experience</h3>
                  <button onClick={addExperience} className="text-sm bg-blue-600 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border border-blue-300 rounded p-3 bg-blue-50">
                      <input type="text" value={exp.title} onChange={(e) => { const newExps = [...experiences]; newExps[i].title = e.target.value; setExperiences(newExps); }} placeholder="Position" className="w-full border border-blue-300 rounded px-2 py-1 text-sm mb-2" />
                      <input type="text" value={exp.company} onChange={(e) => { const newExps = [...experiences]; newExps[i].company = e.target.value; setExperiences(newExps); }} placeholder="Company" className="w-full border border-blue-300 rounded px-2 py-1 text-sm mb-2" />
                      <button onClick={() => removeExperience(i)} className="text-red-600 text-sm">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: PREVIEW */}
          <div className="bg-white rounded-lg shadow overflow-hidden max-h-[calc(100vh-200px)] overflow-y-auto sticky top-8 border-t-8 border-blue-600">
            <div className="p-8 space-y-6">
              {/* Header */}
              <div className="text-center border-b-2 border-blue-200 pb-4">
                {profilePhoto && (
                  <img src={profilePhoto} alt="Profile" className="w-20 h-20 rounded mx-auto mb-3 object-cover border-3 border-blue-600" />
                )}
                <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
                <h2 className="text-lg text-blue-700 font-semibold">{title}</h2>
                <div className="text-sm text-gray-700 mt-2 space-y-0.5">
                  <div>{email}</div>
                  <div>{phone}</div>
                  <div>{address}</div>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-2">Professional Summary</h3>
                <p className="text-sm text-gray-700">{summary}</p>
              </div>

              {/* Work Experience - Chronological */}
              <div>
                <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-3">Work Experience</h3>
                <div className="space-y-4">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border-l-4 border-blue-600 pl-3">
                      <div className="flex justify-between items-baseline">
                        <div className="font-semibold text-gray-900">{exp.title}</div>
                        <div className="text-xs text-gray-600">{exp.period}</div>
                      </div>
                      <div className="text-sm text-blue-700">{exp.company}</div>
                      <div className="text-xs text-gray-600">{exp.location}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-2">Education</h3>
                <div className="space-y-2">
                  {education.map((edu, i) => (
                    <div key={i} className="text-sm">
                      <div className="font-semibold text-gray-900">{edu.degree}</div>
                      <div className="text-gray-700">{edu.school} • {edu.year}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-2">Key Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                      {skill}
                    </span>
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
