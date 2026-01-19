import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';

export default function ProfessionalClassic() {
  const [name, setName] = useState('JOHN ANDERSON');
  const [title, setTitle] = useState('Marketing Manager');
  const [summary, setSummary] = useState('Results-driven Marketing Manager with 8+ years of experience in digital marketing, brand management, and team leadership. Proven track record of increasing market share and revenue through strategic campaigns.');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [email, setEmail] = useState('john.anderson@email.com');
  const [address, setAddress] = useState('New York, USA, 10001');
  const [website, setWebsite] = useState('johnanderson.com');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [skills, setSkills] = useState([
    { name: 'Digital Marketing', percentage: 95 },
    { name: 'Brand Management', percentage: 90 },
    { name: 'Team Leadership', percentage: 88 },
    { name: 'Analytics', percentage: 85 }
  ]);

  const [experiences, setExperiences] = useState([
    {
      period: '2020 - Present',
      title: 'Senior Marketing Manager',
      company: 'ABC Corporation',
      location: 'New York, NY',
      bullets: [
        'Led cross-functional teams to execute 15+ successful marketing campaigns',
        'Increased brand awareness by 45% year-over-year',
        'Managed marketing budget of $2.5M'
      ]
    },
    {
      period: '2018 - 2020',
      title: 'Marketing Coordinator',
      company: 'XYZ Inc',
      location: 'New York, NY',
      bullets: [
        'Coordinated digital marketing initiatives',
        'Created content for social media platforms',
        'Analyzed campaign performance metrics'
      ]
    }
  ]);

  const [education, setEducation] = useState([
    { degree: 'MBA in Marketing', school: 'New York University', year: 'Graduated 2018' },
    { degree: 'Bachelor of Business Administration', school: 'State University', year: 'Graduated 2016' }
  ]);

  const [certifications, setCertifications] = useState([
    'Google Analytics Certification',
    'HubSpot Marketing Certification'
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

  const addExperience = () => {
    setExperiences([...experiences, {
      period: 'Start - End',
      title: 'Job Title',
      company: 'Company',
      location: 'Location',
      bullets: ['Achievement 1']
    }]);
  };

  const removeExperience = (index) => setExperiences(experiences.filter((_, i) => i !== index));

  const addBullet = (expIndex) => {
    const newExps = [...experiences];
    newExps[expIndex].bullets.push('New achievement');
    setExperiences(newExps);
  };

  const removeBullet = (expIndex, bulletIndex) => {
    const newExps = [...experiences];
    newExps[expIndex].bullets = newExps[expIndex].bullets.filter((_, i) => i !== bulletIndex);
    setExperiences(newExps);
  };

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
            <div className="mb-8 p-4 bg-gray-100 rounded-lg border-2 border-gray-400">
              <h3 className="text-lg font-bold mb-4">Profile Photo</h3>
              <div className="flex flex-col items-center gap-4">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-gray-700 shadow-lg" />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-400 flex items-center justify-center text-4xl text-white shadow-lg">👤</div>
                )}
                <label className="cursor-pointer bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition block text-center font-semibold w-full">
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  Upload Photo
                </label>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" value={name.split(' ')[0]} onChange={(e) => setName(`${e.target.value} ${name.split(' ')[1]}`)} placeholder="First Name" className="w-full border border-gray-300 rounded px-3 py-2" />
                  <input type="text" value={name.split(' ')[1]} onChange={(e) => setName(`${name.split(' ')[0]} ${e.target.value}`)} placeholder="Last Name" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border border-gray-300 rounded px-3 py-2" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-gray-300 rounded px-3 py-2" />
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full border border-gray-300 rounded px-3 py-2" />
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="w-full border border-gray-300 rounded px-3 py-2" />
                <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
            </div>

            {/* Summary */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Professional Summary</h3>
              <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full border border-gray-300 rounded px-3 py-2 resize-none" />
            </div>

            {/* Experience */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Employment History</h3>
                <button onClick={addExperience} className="text-sm bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800">+ Add</button>
              </div>
              <div className="space-y-4">
                {experiences.map((exp, expIndex) => (
                  <div key={expIndex} className="border border-gray-300 rounded p-3 bg-gray-50">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-semibold">Experience {expIndex + 1}</h4>
                      <button onClick={() => removeExperience(expIndex)} className="text-red-600 text-sm font-bold">Remove</button>
                    </div>
                    <input type="text" value={exp.period} onChange={(e) => { const newExps = [...experiences]; newExps[expIndex].period = e.target.value; setExperiences(newExps); }} placeholder="Period" className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-2" />
                    <input type="text" value={exp.title} onChange={(e) => { const newExps = [...experiences]; newExps[expIndex].title = e.target.value; setExperiences(newExps); }} placeholder="Job Title" className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-2" />
                    <input type="text" value={exp.company} onChange={(e) => { const newExps = [...experiences]; newExps[expIndex].company = e.target.value; setExperiences(newExps); }} placeholder="Company" className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-2" />
                    <input type="text" value={exp.location} onChange={(e) => { const newExps = [...experiences]; newExps[expIndex].location = e.target.value; setExperiences(newExps); }} placeholder="Location" className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-2" />
                    <div className="flex justify-between mb-2">
                      <label className="text-xs font-semibold">Achievements</label>
                      <button onClick={() => addBullet(expIndex)} className="text-xs text-gray-600">+ Add</button>
                    </div>
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <div key={bulletIndex} className="flex gap-2 mb-1">
                        <input type="text" value={bullet} onChange={(e) => { const newExps = [...experiences]; newExps[expIndex].bullets[bulletIndex] = e.target.value; setExperiences(newExps); }} className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm" />
                        <button onClick={() => removeBullet(expIndex, bulletIndex)} className="text-red-600 font-bold">✕</button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Education */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Skills</h3>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input type="text" value={skill.name} onChange={(e) => updateSkillName(index, e.target.value)} className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm" />
                    <input type="range" min="0" max="100" value={skill.percentage} onChange={(e) => updateSkillPercentage(index, parseInt(e.target.value))} className="w-24" />
                    <button onClick={() => removeSkill(index)} className="text-red-600">✕</button>
                  </div>
                ))}
              </div>
              <button onClick={addSkill} className="text-sm text-gray-600 mt-2">+ Add Skill</button>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-xl font-bold mb-4">Certifications</h3>
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex gap-2">
                    <input type="text" value={cert} onChange={(e) => { const newCerts = [...certifications]; newCerts[index] = e.target.value; setCertifications(newCerts); }} className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm" />
                    <button onClick={() => setCertifications(certifications.filter((_, i) => i !== index))} className="text-red-600">✕</button>
                  </div>
                ))}
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
            <div className="grid grid-cols-3 h-full min-h-[297mm]">
              {/* Left Column - 35% */}
              <div className="col-span-1 bg-gray-800 text-white p-8 space-y-8">
                {/* Photo */}
                <div className="text-center">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-lg" />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-600 flex items-center justify-center text-3xl mx-auto shadow-lg">👤</div>
                  )}
                </div>

                {/* Contact */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-gray-600 pb-2">Contact</h3>
                  <div className="text-sm space-y-3 font-light">
                    <div>
                      <span className="block text-gray-400 text-xs uppercase mb-1">Phone</span>
                      {phone}
                    </div>
                    <div>
                      <span className="block text-gray-400 text-xs uppercase mb-1">Email</span>
                      {email}
                    </div>
                    <div>
                      <span className="block text-gray-400 text-xs uppercase mb-1">Address</span>
                      {address}
                    </div>
                    <div>
                      <span className="block text-gray-400 text-xs uppercase mb-1">Website</span>
                      {website}
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-gray-600 pb-2">Skills</h3>
                  <div className="space-y-3">
                    {skills.map((skill, index) => (
                      <div key={index} className="text-sm">
                        <div className="font-medium mb-1">{skill.name}</div>
                        <div className="w-full bg-gray-600 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-gray-200 h-full rounded-full" style={{ width: `${skill.percentage}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-gray-600 pb-2">Certifications</h3>
                  <div className="text-sm space-y-2 font-light">
                    {certifications.map((cert, index) => (
                      <div key={index}>• {cert}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - 65% */}
              <div className="col-span-2 p-10 space-y-8">
                {/* Header */}
                <div className="border-b-2 border-gray-800 pb-6">
                  <h1 className="text-4xl font-bold text-gray-900 tracking-tight uppercase">{name}</h1>
                  <h2 className="text-xl text-gray-600 mt-2 font-light tracking-wide uppercase">{title}</h2>
                </div>

                {/* Summary */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 uppercase tracking-widest mb-3">Profile</h3>
                  <p className="text-sm text-gray-700 leading-relaxed font-light">{summary}</p>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 uppercase tracking-widest mb-4">Experience</h3>
                  <div className="space-y-6">
                    {experiences.map((exp, expIndex) => (
                      <div key={expIndex}>
                        <div className="flex justify-between items-baseline mb-1">
                          <div className="font-bold text-gray-800 text-base">{exp.title}</div>
                          <div className="text-sm text-gray-600 font-medium">{exp.period}</div>
                        </div>
                        <div className="text-sm text-gray-600 italic mb-2">{exp.company} | {exp.location}</div>
                        <ul className="space-y-1 ml-4 list-disc text-sm text-gray-700 font-light">
                          {exp.bullets.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 uppercase tracking-widest mb-4">Education</h3>
                  <div className="space-y-4">
                    {education.map((edu, index) => (
                      <div key={index}>
                        <div className="font-bold text-gray-800">{edu.degree}</div>
                        <div className="text-sm text-gray-600">{edu.school}</div>
                        <div className="text-sm text-gray-500 italic">{edu.year}</div>
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
