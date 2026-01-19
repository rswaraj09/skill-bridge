import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';

export default function ExecutiveSummary() {
  const [name, setName] = useState('DAVID WILLIAMS');
  const [title, setTitle] = useState('Chief Marketing Officer');
  const [summary, setSummary] = useState('Strategic marketing executive with 12+ years driving brand growth and revenue impact across Fortune 500 companies. Expert in digital transformation, team leadership, and go-to-market strategy.');
  const [phone, setPhone] = useState('+1 (555) 678-9012');
  const [email, setEmail] = useState('david.williams@email.com');
  const [address, setAddress] = useState('New York, USA');
  const [website, setWebsite] = useState('dwilliams.com');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [skills, setSkills] = useState([
    { name: 'Strategic Planning', percentage: 95 },
    { name: 'Team Leadership', percentage: 92 },
    { name: 'Digital Marketing', percentage: 88 },
    { name: 'Budget Management', percentage: 90 },
    { name: 'Brand Strategy', percentage: 94 }
  ]);

  const [experiences, setExperiences] = useState([
    {
      period: '2019 - Present',
      title: 'Chief Marketing Officer',
      company: 'Global Brands Inc',
      location: 'New York, NY',
      bullets: [
        'Increased revenue by 35% through market expansion',
        'Led team of 45 marketing professionals',
        'Spearheaded digital transformation initiative'
      ]
    },
    {
      period: '2015 - 2019',
      title: 'VP Marketing',
      company: 'Digital Solutions Corp',
      location: 'Boston, MA',
      bullets: [
        'Managed $50M+ marketing budget',
        'Launched 15+ product campaigns',
        'Grew brand awareness by 280%'
      ]
    }
  ]);

  const [education, setEducation] = useState([
    { degree: 'MBA Business Administration', school: 'Harvard Business School', year: '2008' },
    { degree: 'BS Marketing', school: 'Cornell University', year: '2006' }
  ]);

  const [certifications, setCertifications] = useState([
    'Certified Digital Marketing Professional',
    'Executive Leadership Certificate'
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
                className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded shadow flex items-center gap-2 text-sm font-medium transition-colors"
                title="Download as PDF"
              >
                <Download className="w-4 h-4" /> Export PDF
              </button>
            </div>

            {/* Photo Upload */}
            <div className="mb-8 p-4 bg-amber-50 rounded-lg border-2 border-amber-700">
              <h3 className="text-lg font-bold text-amber-900 mb-4">Profile Photo</h3>
              <div className="flex flex-col items-center gap-4">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-amber-700 shadow-lg" />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-amber-200 flex items-center justify-center text-4xl text-amber-700">👤</div>
                )}
                <label className="cursor-pointer bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-800 transition block text-center font-semibold w-full">
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
                  <input type="text" value={name.split(' ')[0]} onChange={(e) => setName(`${e.target.value} ${name.split(' ')[1]}`)} placeholder="First Name" className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700" />
                  <input type="text" value={name.split(' ')[1]} onChange={(e) => setName(`${name.split(' ')[0]} ${e.target.value}`)} placeholder="Last Name" className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700" />
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Professional Summary</h3>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Core Competencies</h3>
                  <button onClick={addSkill} className="text-sm bg-amber-700 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <input type="text" value={skill.name} onChange={(e) => updateSkillName(index, e.target.value)} className="flex-1 border border-amber-300 rounded px-2 py-1 text-sm" />
                      <button onClick={() => removeSkill(index)} className="text-red-600">✕</button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Professional Experience</h3>
                  <button onClick={addExperience} className="text-sm bg-amber-700 text-white px-3 py-1 rounded">+ Add</button>
                </div>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border border-amber-300 rounded p-3 bg-amber-50">
                      <input type="text" value={exp.title} onChange={(e) => { const newExps = [...experiences]; newExps[i].title = e.target.value; setExperiences(newExps); }} placeholder="Job Title" className="w-full border border-amber-300 rounded px-2 py-1 text-sm mb-2" />
                      <input type="text" value={exp.company} onChange={(e) => { const newExps = [...experiences]; newExps[i].company = e.target.value; setExperiences(newExps); }} placeholder="Company" className="w-full border border-amber-300 rounded px-2 py-1 text-sm mb-2" />
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
            className="bg-white shadow-2xl overflow-hidden relative border-t-8 border-amber-700"
            style={{ width: '210mm', minHeight: '297mm' }}
          >
            <div className="p-8 space-y-6">
              {/* Header */}
              <div className="text-center border-b-2 border-amber-200 pb-6">
                {profilePhoto && (
                  <img src={profilePhoto} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-amber-700 shadow-md" />
                )}
                <h1 className="text-4xl font-bold text-gray-900">{name}</h1>
                <h2 className="text-xl text-amber-700 font-semibold mt-2">{title}</h2>
              </div>

              {/* Contact */}
              <div className="text-center text-sm text-gray-700">
                <div className="flex justify-center gap-4 flex-wrap">
                  <span>{email}</span>
                  <span>•</span>
                  <span>{phone}</span>
                  <span>•</span>
                  <span>{address}</span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
              </div>

              {/* Core Competencies */}
              <div>
                <h3 className="text-sm font-bold text-amber-700 uppercase mb-3">Core Competencies</h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill, i) => (
                    <div key={i} className="text-xs">
                      <div className="text-gray-800 font-semibold mb-1">{skill.name}</div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-700 h-full transition-all" style={{ width: `${skill.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-sm font-bold text-amber-700 uppercase mb-3">Professional Experience</h3>
                <div className="space-y-4">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border-l-4 border-amber-700 pl-3">
                      <div className="font-semibold text-gray-900">{exp.title}</div>
                      <div className="text-xs text-amber-700">{exp.company} • {exp.period}</div>
                      <div className="text-xs text-gray-600">{exp.location}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-sm font-bold text-amber-700 uppercase mb-2">Certifications</h3>
                <div className="space-y-1">
                  {certifications.map((cert, i) => (
                    <div key={i} className="text-xs text-gray-700">✓ {cert}</div>
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
