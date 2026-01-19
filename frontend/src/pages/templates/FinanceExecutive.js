import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';

export default function FinanceExecutive() {
  const [name, setName] = useState('WILLIAM ANDERSON');
  const [title, setTitle] = useState('Chief Financial Officer');
  const [summary, setSummary] = useState('Strategic CFO with 18+ years leading financial operations at Fortune 500 companies. Expert in mergers & acquisitions, financial restructuring, and investor relations. Proven track record of increasing shareholder value and optimizing capital structure.');
  const [phone, setPhone] = useState('+1 (555) 901-2345');
  const [email, setEmail] = useState('william.anderson@email.com');
  const [address, setAddress] = useState('Los Angeles, CA');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [skills, setSkills] = useState([
    { name: 'Financial Strategy', percentage: 96 },
    { name: 'M&A Operations', percentage: 94 },
    { name: 'Investor Relations', percentage: 92 },
    { name: 'Risk Management', percentage: 90 },
    { name: 'Capital Markets', percentage: 91 }
  ]);

  const [experiences, setExperiences] = useState([
    {
      period: '2020 - Present',
      title: 'Chief Financial Officer',
      company: 'Global Industries Inc',
      location: 'Los Angeles, CA',
      bullets: [
        'Managed $2B+ operating budget',
        'Led successful $500M acquisition',
        'Improved EBITDA margins by 240bps'
      ]
    },
    {
      period: '2015 - 2020',
      title: 'VP Finance & Controller',
      company: 'Financial Services Corp',
      location: 'New York, NY',
      bullets: [
        'Oversaw $5B+ asset portfolio',
        'Directed IPO preparation process',
        'Increased operational efficiency by 35%'
      ]
    }
  ]);

  const [education, setEducation] = useState([
    { degree: 'MBA Finance & Economics', school: 'University of Chicago Booth', year: '2004' },
    { degree: 'BS Accounting', school: 'NYU Stern', year: '2002' }
  ]);

  const [certifications, setCertifications] = useState([
    'CPA (California)',
    'Chartered Financial Analyst (CFA)',
    'Director - American Financial Association'
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
                className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded shadow flex items-center gap-2 text-sm font-medium transition-colors"
                title="Download as PDF"
              >
                <Download className="w-4 h-4" /> Export PDF
              </button>
            </div>

            {/* Photo Upload */}
            <div className="mb-8 p-4 bg-purple-50 rounded-lg border-2 border-purple-700">
              <h3 className="text-lg font-bold text-purple-900 mb-4">Profile Photo</h3>
              <div className="flex flex-col items-center gap-4">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded-lg object-cover border-4 border-purple-700 shadow-lg" />
                ) : (
                  <div className="w-32 h-32 rounded-lg bg-purple-200 flex items-center justify-center text-4xl">💰</div>
                )}
                <label className="cursor-pointer bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition block text-center font-semibold w-full">
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
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full border border-purple-300 rounded px-3 py-2" />
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border border-purple-300 rounded px-3 py-2" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-purple-300 rounded px-3 py-2" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full border border-purple-300 rounded px-3 py-2" />
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Location" className="w-full border border-purple-300 rounded px-3 py-2" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Executive Summary</h3>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full border border-purple-300 rounded px-3 py-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Financial Expertise</h3>
                  <button onClick={addSkill} className="text-sm bg-purple-700 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <input type="text" value={skill.name} onChange={(e) => updateSkillName(index, e.target.value)} className="flex-1 border border-purple-300 rounded px-2 py-1 text-sm" />
                      <button onClick={() => removeSkill(index)} className="text-red-600">✕</button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Executive Experience</h3>
                  <button onClick={addExperience} className="text-sm bg-purple-700 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border border-purple-300 rounded p-3 bg-purple-50">
                      <input type="text" value={exp.title} onChange={(e) => { const newExps = [...experiences]; newExps[i].title = e.target.value; setExperiences(newExps); }} placeholder="Position" className="w-full border border-purple-300 rounded px-2 py-1 text-sm mb-2" />
                      <input type="text" value={exp.company} onChange={(e) => { const newExps = [...experiences]; newExps[i].company = e.target.value; setExperiences(newExps); }} placeholder="Company" className="w-full border border-purple-300 rounded px-2 py-1 text-sm mb-2" />
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
            className="shadow-2xl overflow-hidden relative"
            style={{ width: '210mm', minHeight: '297mm' }}
          >
            <div className="bg-gradient-to-b from-purple-900 to-purple-800 text-white h-full min-h-[297mm] p-8 space-y-5">
              {/* Header */}
              <div className="border-b-2 border-purple-400 pb-6">
                <div className="flex gap-4 items-center mb-3">
                  {profilePhoto && (
                    <img src={profilePhoto} alt="Profile" className="w-20 h-20 rounded-lg object-cover border-3 border-purple-300 shadow-lg" />
                  )}
                  <div>
                    <h1 className="text-3xl font-bold text-purple-100">{name}</h1>
                    <h2 className="text-lg text-purple-200">{title}</h2>
                  </div>
                </div>
                <div className="text-sm text-purple-200 space-y-0.5">
                  <div>{email}</div>
                  <div>{phone}</div>
                  <div>{address}</div>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wide mb-2">Executive Summary</h3>
                <p className="text-sm text-purple-100 leading-relaxed">{summary}</p>
              </div>

              {/* Executive Experience */}
              <div>
                <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wide mb-3">Executive Experience</h3>
                <div className="space-y-4">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border-l-4 border-purple-400 pl-3">
                      <div className="font-semibold text-purple-100">{exp.title}</div>
                      <div className="text-sm text-purple-300">{exp.company}</div>
                      <div className="text-xs text-purple-400">{exp.period} • {exp.location}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Expertise */}
              <div>
                <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wide mb-3">Financial Expertise</h3>
                <div className="space-y-2">
                  {skills.map((skill, i) => (
                    <div key={i} className="text-sm">
                      <div className="flex justify-between mb-1 text-purple-200">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-purple-300">{skill.percentage}%</span>
                      </div>
                      <div className="w-full bg-purple-700 h-2 rounded">
                        <div className="bg-purple-300 h-full rounded" style={{ width: `${skill.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wide mb-2">Education</h3>
                <div className="space-y-2">
                  {education.map((edu, i) => (
                    <div key={i} className="text-sm">
                      <div className="font-semibold text-purple-100">{edu.degree}</div>
                      <div className="text-purple-200">{edu.school} • {edu.year}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Credentials */}
              <div>
                <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wide mb-2">Professional Credentials</h3>
                <div className="space-y-1">
                  {certifications.map((cert, i) => (
                    <div key={i} className="text-sm text-purple-200">✓ {cert}</div>
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
