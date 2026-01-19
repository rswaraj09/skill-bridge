import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';

export default function ModernMinimalist() {
  const [name, setName] = useState('SARAH CHEN');
  const [title, setTitle] = useState('Product Designer');
  const [summary, setSummary] = useState('Creative and user-focused Product Designer with 7+ years designing digital products for startups and Fortune 500 companies. Passionate about creating intuitive user experiences and leading design teams through complex problem-solving.');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [email, setEmail] = useState('sarah.chen@email.com');
  const [address, setAddress] = useState('San Francisco, CA');
  const [website, setWebsite] = useState('sarahchen.design');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [skills, setSkills] = useState([
    { name: 'UI/UX Design', percentage: 95 },
    { name: 'Figma', percentage: 93 },
    { name: 'User Research', percentage: 90 },
    { name: 'Prototyping', percentage: 92 },
    { name: 'Design Systems', percentage: 88 }
  ]);

  const [experiences, setExperiences] = useState([
    {
      period: '2020 - Present',
      title: 'Lead Product Designer',
      company: 'Design Studio Co',
      location: 'San Francisco, CA',
      bullets: [
        'Led design for mobile app with 2M+ users',
        'Increased user engagement by 45%',
        'Built design system used across 15+ products'
      ]
    },
    {
      period: '2018 - 2020',
      title: 'Product Designer',
      company: 'Tech Innovations LLC',
      location: 'San Francisco, CA',
      bullets: [
        'Designed 5 major product features',
        'Conducted user research with 200+ participants',
        'Improved conversion rate by 38%'
      ]
    }
  ]);

  const [education, setEducation] = useState([
    { degree: 'BS Design & Technology', school: 'Carnegie Mellon University', year: '2017' }
  ]);

  const [certifications, setCertifications] = useState([
    'Google UX Design Certificate',
    'Interaction Design Foundation Certified'
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
                className="bg-neutral-800 hover:bg-neutral-900 text-white px-4 py-2 rounded shadow flex items-center gap-2 text-sm font-medium transition-colors"
                title="Download as PDF"
              >
                <Download className="w-4 h-4" /> Export PDF
              </button>
            </div>

            {/* Photo Upload */}
            <div className="mb-8 p-4 bg-neutral-100 rounded-lg border-2 border-neutral-400">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Profile Photo</h3>
              <div className="flex flex-col items-center gap-4">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-neutral-400 shadow-lg" />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-neutral-300 flex items-center justify-center text-4xl">✦</div>
                )}
                <label className="cursor-pointer bg-neutral-700 text-white px-4 py-2 rounded hover:bg-neutral-800 transition block text-center font-semibold w-full">
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
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full border border-neutral-300 rounded px-3 py-2" />
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border border-neutral-300 rounded px-3 py-2" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-neutral-300 rounded px-3 py-2" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full border border-neutral-300 rounded px-3 py-2" />
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Location" className="w-full border border-neutral-300 rounded px-3 py-2" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Professional Summary</h3>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full border border-neutral-300 rounded px-3 py-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Key Skills</h3>
                  <button onClick={addSkill} className="text-sm bg-neutral-700 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <input type="text" value={skill.name} onChange={(e) => updateSkillName(index, e.target.value)} className="flex-1 border border-neutral-300 rounded px-2 py-1 text-sm" />
                      <button onClick={() => removeSkill(index)} className="text-red-600">✕</button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Professional Experience</h3>
                  <button onClick={addExperience} className="text-sm bg-neutral-700 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border border-neutral-300 rounded p-3 bg-neutral-50">
                      <input type="text" value={exp.title} onChange={(e) => { const newExps = [...experiences]; newExps[i].title = e.target.value; setExperiences(newExps); }} placeholder="Position" className="w-full border border-neutral-300 rounded px-2 py-1 text-sm mb-2" />
                      <input type="text" value={exp.company} onChange={(e) => { const newExps = [...experiences]; newExps[i].company = e.target.value; setExperiences(newExps); }} placeholder="Company" className="w-full border border-neutral-300 rounded px-2 py-1 text-sm mb-2" />
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
            className="bg-white shadow-2xl overflow-hidden relative border-t-2 border-neutral-900"
            style={{ width: '210mm', minHeight: '297mm' }}
          >
            <div className="p-12 space-y-8">
              {/* Header */}
              <div className="space-y-4">
                {profilePhoto && (
                  <img src={profilePhoto} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-neutral-300 shadow-sm" />
                )}
                <div>
                  <h1 className="text-4xl font-light text-neutral-900 tracking-tight">{name}</h1>
                  <h2 className="text-lg text-neutral-600 font-light mt-1">{title}</h2>
                </div>
                <div className="h-px bg-neutral-300" />
              </div>

              {/* Contact */}
              <div className="flex gap-6 text-sm text-neutral-700">
                <span>{email}</span>
                <span>{phone}</span>
                <span>{address}</span>
              </div>

              {/* Summary */}
              <div>
                <p className="text-sm text-neutral-700 leading-relaxed font-light">{summary}</p>
              </div>

              {/* Experience */}
              <div className="space-y-6">
                <div className="h-px bg-neutral-300" />
                <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-widest">Experience</h3>
                <div className="space-y-6">
                  {experiences.map((exp, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between items-baseline gap-4">
                        <h4 className="font-semibold text-neutral-900">{exp.title}</h4>
                        <span className="text-xs text-neutral-600 whitespace-nowrap">{exp.period}</span>
                      </div>
                      <p className="text-sm text-neutral-700">{exp.company}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <div className="h-px bg-neutral-300" />
                <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-widest">Skills</h3>
                <div className="grid grid-cols-1 gap-3">
                  {skills.map((skill, i) => (
                    <div key={i} className="text-xs">
                      <div className="flex justify-between mb-1">
                        <span className="text-neutral-900 font-medium">{skill.name}</span>
                        <span className="text-neutral-600">{skill.percentage}%</span>
                      </div>
                      <div className="w-full bg-neutral-200 h-1.5 rounded-full">
                        <div className="bg-neutral-900 h-full rounded-full" style={{ width: `${skill.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-4">
                <div className="h-px bg-neutral-300" />
                <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-widest">Education</h3>
                <div className="space-y-2">
                  {education.map((edu, i) => (
                    <div key={i} className="text-sm">
                      <div className="font-semibold text-neutral-900">{edu.degree}</div>
                      <div className="text-neutral-600">{edu.school} • {edu.year}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {certifications.length > 0 && (
                <div className="space-y-4">
                  <div className="h-px bg-neutral-300" />
                  <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-widest">Certifications</h3>
                  <div className="space-y-1">
                    {certifications.map((cert, i) => (
                      <p key={i} className="text-sm text-neutral-700">• {cert}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
