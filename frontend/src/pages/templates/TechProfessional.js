import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';

export default function TechProfessional() {
  const [name, setName] = useState('EMILY RODRIGUEZ');
  const [title, setTitle] = useState('Full Stack Developer');
  const [summary, setSummary] = useState('Experienced Full Stack Developer with 6+ years building scalable web applications using React, Node.js, and cloud technologies. Passionate about clean code and innovative solutions.');
  const [phone, setPhone] = useState('+1 (555) 456-7890');
  const [email, setEmail] = useState('emily.rodriguez@email.com');
  const [address, setAddress] = useState('San Francisco, USA');
  const [website, setWebsite] = useState('emilydev.io');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [skills, setSkills] = useState([
    { name: 'React/JavaScript', percentage: 95 },
    { name: 'Node.js', percentage: 90 },
    { name: 'Cloud Architecture', percentage: 85 },
    { name: 'Database Design', percentage: 88 },
    { name: 'DevOps', percentage: 82 }
  ]);

  const [experiences, setExperiences] = useState([
    {
      period: '2021 - Present',
      title: 'Senior Full Stack Developer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      bullets: [
        'Built microservices architecture serving 1M+ users',
        'Reduced API response time by 40%',
        'Mentored 5 junior developers'
      ]
    },
    {
      period: '2019 - 2021',
      title: 'Full Stack Developer',
      company: 'StartupX',
      location: 'San Francisco, CA',
      bullets: [
        'Developed e-commerce platform',
        'Implemented CI/CD pipelines',
        'Optimized database queries'
      ]
    }
  ]);

  const [education, setEducation] = useState([
    { degree: 'BS Computer Science', school: 'UC Berkeley', year: '2019' }
  ]);

  const [certifications, setCertifications] = useState([
    'AWS Solutions Architect',
    'Kubernetes Certification'
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
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded shadow flex items-center gap-2 text-sm font-medium transition-colors"
                title="Download as PDF"
              >
                <Download className="w-4 h-4" /> Export PDF
              </button>
            </div>

            {/* Photo Upload */}
            <div className="mb-8 p-4 bg-slate-900 rounded-lg border-2 border-cyan-500">
              <h3 className="text-lg font-bold text-white mb-4">Profile Photo</h3>
              <div className="flex flex-col items-center gap-4">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded object-cover border-4 border-cyan-500 shadow-lg" />
                ) : (
                  <div className="w-32 h-32 rounded bg-slate-700 flex items-center justify-center text-4xl text-cyan-400">{'<>'}</div>
                )}
                <label className="cursor-pointer bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition block text-center font-semibold w-full">
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  Upload Photo
                </label>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Personal Information</h3>
                <div className="space-y-3">
                  <input type="text" value={name.split(' ')[0]} onChange={(e) => setName(`${e.target.value} ${name.split(' ')[1]}`)} placeholder="First Name" className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900" />
                  <input type="text" value={name.split(' ')[1]} onChange={(e) => setName(`${name.split(' ')[0]} ${e.target.value}`)} placeholder="Last Name" className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900" />
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Summary</h3>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Skills</h3>
                  <button onClick={addSkill} className="text-sm bg-cyan-600 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <input type="text" value={skill.name} onChange={(e) => updateSkillName(index, e.target.value)} className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm bg-white text-gray-900" />
                      <button onClick={() => removeSkill(index)} className="text-red-600">✕</button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Experience</h3>
                  <button onClick={addExperience} className="text-sm bg-cyan-600 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border border-gray-300 rounded p-3 bg-gray-50">
                      <input type="text" value={exp.title} onChange={(e) => { const newExps = [...experiences]; newExps[i].title = e.target.value; setExperiences(newExps); }} placeholder="Job Title" className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-2 bg-white text-gray-900" />
                      <button onClick={() => removeExperience(i)} className="text-red-600 text-sm">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: A4 PREVIEW */}
        <div className="flex-1 bg-slate-800 overflow-y-auto p-8 flex justify-center">
          <div
            id="resume-preview"
            className="shadow-2xl overflow-hidden relative"
            style={{ width: '210mm', minHeight: '297mm', backgroundColor: '#0f172a' }}
          >
            {/* Resume Content */}
            <div className="p-12 h-full flex flex-col relative z-0">
              {/* Background Elements */}
              <div className="absolute top-0 left-0 w-32 h-full bg-slate-800/50 -skew-x-12 -translate-x-16" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />

              <div className="relative z-10 space-y-12">
                {/* Header */}
                <div className="border-b-2 border-cyan-500 pb-8 flex items-start gap-8">
                  {profilePhoto && (
                    <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded object-cover border-4 border-cyan-500 shadow-lg shrink-0" />
                  )}
                  <div className="flex-1 pt-2">
                    <h1 className="text-5xl font-bold text-cyan-400 mb-2 tracking-tight">{name}</h1>
                    <h2 className="text-2xl text-gray-300">/* {title} */</h2>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-12 gap-12">
                  {/* Left Column (Skills & Contact) - 4 cols */}
                  <div className="col-span-4 space-y-10">
                    {/* Contact */}
                    <div>
                      <h3 className="text-lg font-bold text-cyan-400 uppercase mb-4 flex items-center gap-2">
                        <span className="text-cyan-500">{'//'}</span> Contact
                      </h3>
                      <div className="text-sm text-gray-300 space-y-3 font-mono">
                        <div className="break-words">{email}</div>
                        <div>{phone}</div>
                        <div>{address}</div>
                        <div>{website}</div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <h3 className="text-lg font-bold text-cyan-400 uppercase mb-4 flex items-center gap-2">
                        <span className="text-cyan-500">{'//'}</span> Tech Stack
                      </h3>
                      <div className="space-y-4">
                        {skills.map((skill, i) => (
                          <div key={i} className="text-sm text-gray-300">
                            <div className="flex justify-between mb-1">
                              <span className="text-cyan-100">{skill.name}</span>
                              <span className="text-cyan-500 font-mono">{skill.percentage}%</span>
                            </div>
                            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${skill.percentage}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <h3 className="text-lg font-bold text-cyan-400 uppercase mb-4 flex items-center gap-2">
                        <span className="text-cyan-500">{'//'}</span> Education
                      </h3>
                      <div className="space-y-4">
                        {education.map((edu, i) => (
                          <div key={i} className="text-sm text-gray-300">
                            <div className="font-bold text-white mb-1">{edu.degree}</div>
                            <div className="text-cyan-400">{edu.school}</div>
                            <div className="text-gray-500 font-mono text-xs mt-1">{edu.year}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Summary & Experience) - 8 cols */}
                  <div className="col-span-8 space-y-10">
                    {/* Summary */}
                    <div>
                      <h3 className="text-lg font-bold text-cyan-400 uppercase mb-4 flex items-center gap-2">
                        <span className="text-cyan-500">{'//'}</span> About Me
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-base">
                        {summary}
                      </p>
                    </div>

                    {/* Experience */}
                    <div>
                      <h3 className="text-lg font-bold text-cyan-400 uppercase mb-4 flex items-center gap-2">
                        <span className="text-cyan-500">{'//'}</span> Experience
                      </h3>
                      <div className="space-y-8 relative before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-800 before:content-[''] pl-8">
                        {experiences.map((exp, i) => (
                          <div key={i} className="relative">
                            <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-cyan-500 border-2 border-slate-900 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                            <div className="mb-3">
                              <h4 className="text-xl font-bold text-white mb-1">{exp.title}</h4>
                              <div className="flex items-center gap-3 text-sm font-mono">
                                <span className="text-cyan-400">{exp.company}</span>
                                <span className="text-slate-600">|</span>
                                <span className="text-slate-400">{exp.period}</span>
                              </div>
                            </div>
                            <ul className="space-y-2">
                              {exp.bullets.map((bullet, j) => (
                                <li key={j} className="text-gray-400 text-sm pl-4 relative before:absolute before:left-0 before:top-2.5 before:w-1 before:h-1 before:bg-slate-600 before:rounded-full">
                                  {bullet}
                                </li>
                              ))}
                            </ul>
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
      </div>
    </div>
  );
}
