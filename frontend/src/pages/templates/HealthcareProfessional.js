import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';

export default function HealthcareProfessional() {
  const [name, setName] = useState('DR. ELIZABETH GARCIA');
  const [title, setTitle] = useState('Registered Nurse');
  const [summary, setSummary] = useState('Compassionate and dedicated healthcare professional with 12+ years of nursing experience in acute care, emergency medicine, and patient advocacy. Known for clinical excellence, team collaboration, and patient-centered care.');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [email, setEmail] = useState('elizabeth.garcia@email.com');
  const [address, setAddress] = useState('Miami, FL');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [skills, setSkills] = useState([
    { name: 'Patient Care', percentage: 95 },
    { name: 'Clinical Assessment', percentage: 92 },
    { name: 'Emergency Response', percentage: 90 },
    { name: 'Team Leadership', percentage: 88 },
    { name: 'Electronic Health Records', percentage: 87 }
  ]);

  const [experiences, setExperiences] = useState([
    {
      period: '2017 - Present',
      title: 'Senior Registered Nurse',
      company: 'Miami General Hospital',
      location: 'Miami, FL',
      bullets: [
        'Lead ICU team of 8 nurses',
        'Reduced patient complications by 22%',
        'Implemented new care protocols'
      ]
    },
    {
      period: '2013 - 2017',
      title: 'Registered Nurse - Emergency Department',
      company: 'St. Luke Medical Center',
      location: 'Tampa, FL',
      bullets: [
        'Managed 40+ patients daily',
        'Trained 15+ new nurses',
        'Received Patient Care Excellence Award'
      ]
    }
  ]);

  const [education, setEducation] = useState([
    { degree: 'MSN - Nurse Leadership', school: 'University of Miami', year: '2018' },
    { degree: 'BSN - Nursing', school: 'Florida International University', year: '2012' }
  ]);

  const [certifications, setCertifications] = useState([
    'RN License (Florida)',
    'CCRN - Critical Care Nursing',
    'ACLS Certified',
    'PALS Certified'
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
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow flex items-center gap-2 text-sm font-medium transition-colors"
                title="Download as PDF"
              >
                <Download className="w-4 h-4" /> Export PDF
              </button>
            </div>

            {/* Photo Upload */}
            <div className="mb-8 p-4 bg-green-50 rounded-lg border-2 border-green-600">
              <h3 className="text-lg font-bold text-green-900 mb-4">Profile Photo</h3>
              <div className="flex flex-col items-center gap-4">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-green-600 shadow-lg" />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-green-200 flex items-center justify-center text-4xl">⚕️</div>
                )}
                <label className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition block text-center font-semibold w-full">
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
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full border border-green-300 rounded px-3 py-2" />
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border border-green-300 rounded px-3 py-2" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-green-300 rounded px-3 py-2" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full border border-green-300 rounded px-3 py-2" />
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Location" className="w-full border border-green-300 rounded px-3 py-2" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Professional Summary</h3>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full border border-green-300 rounded px-3 py-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Clinical Skills</h3>
                  <button onClick={addSkill} className="text-sm bg-green-600 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <input type="text" value={skill.name} onChange={(e) => updateSkillName(index, e.target.value)} className="flex-1 border border-green-300 rounded px-2 py-1 text-sm" />
                      <button onClick={() => removeSkill(index)} className="text-red-600">✕</button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Professional Experience</h3>
                  <button onClick={addExperience} className="text-sm bg-green-600 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border border-green-300 rounded p-3 bg-green-50">
                      <input type="text" value={exp.title} onChange={(e) => { const newExps = [...experiences]; newExps[i].title = e.target.value; setExperiences(newExps); }} placeholder="Position" className="w-full border border-green-300 rounded px-2 py-1 text-sm mb-2" />
                      <input type="text" value={exp.company} onChange={(e) => { const newExps = [...experiences]; newExps[i].company = e.target.value; setExperiences(newExps); }} placeholder="Hospital/Facility" className="w-full border border-green-300 rounded px-2 py-1 text-sm mb-2" />
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
            className="bg-white shadow-2xl overflow-hidden relative border-t-8 border-green-600"
            style={{ width: '210mm', minHeight: '297mm' }}
          >
            <div className="p-8 space-y-5">
              {/* Header */}
              <div className="border-b-2 border-green-200 pb-5">
                <div className="flex gap-4 items-center mb-3">
                  {profilePhoto && (
                    <img src={profilePhoto} alt="Profile" className="w-20 h-20 rounded-full object-cover border-3 border-green-600 shadow-md" />
                  )}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
                    <h2 className="text-lg text-green-700 font-semibold">{title}</h2>
                  </div>
                </div>
                <div className="text-sm text-gray-700 space-y-0.5">
                  <div>📧 {email}</div>
                  <div>📞 {phone}</div>
                  <div>📍 {address}</div>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-sm font-bold text-green-700 uppercase tracking-wide mb-2">Professional Summary</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
              </div>

              {/* Professional Experience */}
              <div>
                <h3 className="text-sm font-bold text-green-700 uppercase tracking-wide mb-3">Professional Experience</h3>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border-l-4 border-green-600 pl-3">
                      <div className="font-semibold text-gray-900">{exp.title}</div>
                      <div className="text-sm text-green-700">{exp.company}</div>
                      <div className="text-xs text-gray-600">{exp.period} • {exp.location}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinical Skills */}
              <div>
                <h3 className="text-sm font-bold text-green-700 uppercase tracking-wide mb-3">Clinical Skills</h3>
                <div className="space-y-2">
                  {skills.map((skill, i) => (
                    <div key={i} className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-900 font-medium">{skill.name}</span>
                        <span className="text-green-700">{skill.percentage}%</span>
                      </div>
                      <div className="w-full bg-green-100 h-2 rounded">
                        <div className="bg-green-600 h-full rounded" style={{ width: `${skill.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-sm font-bold text-green-700 uppercase tracking-wide mb-2">Education</h3>
                <div className="space-y-2">
                  {education.map((edu, i) => (
                    <div key={i} className="text-sm">
                      <div className="font-semibold text-gray-900">{edu.degree}</div>
                      <div className="text-gray-700">{edu.school} • {edu.year}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-sm font-bold text-green-700 uppercase tracking-wide mb-2">Licenses & Certifications</h3>
                <div className="space-y-1">
                  {certifications.map((cert, i) => (
                    <div key={i} className="text-sm text-gray-700">✓ {cert}</div>
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
