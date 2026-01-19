import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';

export default function StartupOriented() {
  const [name, setName] = useState('NATHAN KUMAR');
  const [title, setTitle] = useState('CEO & Founder');
  const [summary, setSummary] = useState('Visionary entrepreneur and founder with 8+ years building disruptive tech startups. Raised $50M in venture funding. Expert in product strategy, scaling teams, and business development in fast-paced environments.');
  const [phone, setPhone] = useState('+1 (555) 789-0123');
  const [email, setEmail] = useState('nathan@startup.io');
  const [address, setAddress] = useState('San Francisco, CA');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [skills, setSkills] = useState([
    { name: 'Product Strategy', percentage: 95 },
    { name: 'Team Building', percentage: 92 },
    { name: 'Fundraising', percentage: 90 },
    { name: 'Scaling Growth', percentage: 88 },
    { name: 'Business Development', percentage: 87 }
  ]);

  const [experiences, setExperiences] = useState([
    {
      period: '2018 - Present',
      title: 'CEO & Founder',
      company: 'TechVenture Labs',
      location: 'San Francisco, CA',
      bullets: [
        'Founded and scaled company to $100M+ valuation',
        'Raised $50M Series B funding',
        'Grew team from 2 to 150+ employees'
      ]
    },
    {
      period: '2015 - 2018',
      title: 'Co-Founder & CTO',
      company: 'DataStream AI',
      location: 'San Francisco, CA',
      bullets: [
        'Built ML platform processing 1B+ records/day',
        'Raised $8M seed and Series A',
        'Acquired by major tech company'
      ]
    }
  ]);

  const [education, setEducation] = useState([
    { degree: 'BS Computer Science', school: 'Stanford University', year: '2014' }
  ]);

  const [certifications, setCertifications] = useState([
    'Y Combinator Alumni',
    'TechCrunch Disrupt Winner',
    'Forbes 30 Under 30'
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

  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-preview');
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('resume.pdf');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        {/* LEFT: FORM SIDEBAR */}
        <div className="w-[450px] bg-white shadow-xl z-10 overflow-y-auto h-full border-r border-gray-200">
          <div className="p-6 space-y-6 text-gray-900">
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Edit Your Resume</h2>
              <button
                onClick={handleDownloadPDF}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded shadow flex items-center gap-2 text-sm font-medium transition-colors"
                title="Download as PDF"
              >
                <Download className="w-4 h-4" /> Export PDF
              </button>
            </div>

            {/* Photo Upload */}
            <div className="mb-8 p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border-2 border-orange-500">
              <h3 className="text-lg font-bold text-orange-900 mb-4">Profile Photo</h3>
              <div className="flex flex-col items-center gap-4">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-orange-500 shadow-lg" />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center text-4xl">🚀</div>
                )}
                <label className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition block text-center font-semibold w-full">
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
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full border border-orange-300 rounded px-3 py-2" />
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border border-orange-300 rounded px-3 py-2" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-orange-300 rounded px-3 py-2" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full border border-orange-300 rounded px-3 py-2" />
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Location" className="w-full border border-orange-300 rounded px-3 py-2" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Executive Summary</h3>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full border border-orange-300 rounded px-3 py-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Key Skills</h3>
                  <button onClick={addSkill} className="text-sm bg-orange-500 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <input type="text" value={skill.name} onChange={(e) => updateSkillName(index, e.target.value)} className="flex-1 border border-orange-300 rounded px-2 py-1 text-sm" />
                      <button onClick={() => removeSkill(index)} className="text-red-600">✕</button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Experience</h3>
                  <button onClick={addExperience} className="text-sm bg-orange-500 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border border-orange-300 rounded p-3 bg-orange-50">
                      <input type="text" value={exp.title} onChange={(e) => { const newExps = [...experiences]; newExps[i].title = e.target.value; setExperiences(newExps); }} placeholder="Position" className="w-full border border-orange-300 rounded px-2 py-1 text-sm mb-2" />
                      <input type="text" value={exp.company} onChange={(e) => { const newExps = [...experiences]; newExps[i].company = e.target.value; setExperiences(newExps); }} placeholder="Company" className="w-full border border-orange-300 rounded px-2 py-1 text-sm mb-2" />
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
            id="resume-preview"
            className="bg-white shadow-2xl overflow-hidden relative"
            style={{ width: '210mm', minHeight: '297mm' }}
          >
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white">
              <div className="flex gap-6 items-center">
                {profilePhoto && (
                  <img src={profilePhoto} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
                )}
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">{name}</h1>
                  <h2 className="text-xl text-orange-100 mt-2 font-medium">{title}</h2>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {/* Contact */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-700 border-b pb-6 px-1">
                <span className="flex items-center gap-2">📧 {email}</span>
                <span className="flex items-center gap-2">📞 {phone}</span>
                <span className="flex items-center gap-2">📍 {address}</span>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-sm font-bold text-orange-600 uppercase mb-3 px-1">Executive Summary</h3>
                <p className="text-sm text-gray-700 leading-relaxed px-1">{summary}</p>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-sm font-bold text-orange-600 uppercase mb-4 px-1">Entrepreneurial Experience</h3>
                <div className="space-y-4">
                  {experiences.map((exp, i) => (
                    <div key={i} className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border-l-4 border-orange-500">
                      <div className="flex justify-between items-baseline mb-2">
                        <div className="font-bold text-gray-900 text-lg">{exp.title}</div>
                        <div className="text-xs text-orange-700 font-semibold uppercase">{exp.period}</div>
                      </div>
                      <div className="text-sm text-orange-800 font-medium mb-2">{exp.company} • {exp.location}</div>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        {exp.bullets.map((bullet, j) => (
                          <li key={j}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Skills */}
              <div>
                <h3 className="text-sm font-bold text-orange-600 uppercase mb-3 px-1">Core Competencies</h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill, i) => (
                    <div key={i} className="bg-white border border-orange-100 p-2 rounded flex justify-between items-center px-3">
                      <span className="text-sm font-semibold text-gray-700">{skill.name}</span>
                      <div className="w-24 bg-gray-100 rounded-full h-1.5 ml-2">
                        <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${skill.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-sm font-bold text-orange-600 uppercase mb-3 px-1">Recognition & Awards</h3>
                <div className="grid grid-cols-1 gap-2">
                  {certifications.map((cert, i) => (
                    <div key={i} className="text-sm text-gray-700 flex items-center gap-2 px-1">
                      <span className="text-orange-500 text-lg">★</span> {cert}
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-sm font-bold text-orange-600 uppercase mb-3 px-1">Education</h3>
                <div className="space-y-2 px-1">
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
