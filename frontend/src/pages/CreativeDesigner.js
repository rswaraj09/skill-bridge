import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';

export default function CreativeDesigner() {
  const [name, setName] = useState('DANIEL JONES');
  const [title, setTitle] = useState('Photographer');
  const [summary, setSummary] = useState('Experienced and innovative photographer bringing forth a true passion for capturing life\'s moments through a lens. Connected to the ultimate satisfaction of a client, and apt in the use of modern photography software and techniques. Bringing forth five years of experience working as a Freelance Photographer on over 200 projects.');

  const [phone, setPhone] = useState('(123) 456-7890');
  const [email, setEmail] = useState('daniel.jones@email.com');
  const [address, setAddress] = useState('Vancouver, BC V6J 2N5, Canada');
  const [website, setWebsite] = useState('danieljones.photography');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [skills, setSkills] = useState([
    { name: 'Outstanding Technical Skills', percentage: 90 },
    { name: 'Creative Direction', percentage: 85 },
    { name: 'Photography Expertise', percentage: 95 },
    { name: 'Adobe Creative Suite', percentage: 88 }
  ]);

  const [experiences, setExperiences] = useState([
    {
      period: 'June 2020 - Present',
      title: 'Freelance Photographer',
      company: 'Self Employed',
      location: 'Vancouver, BC',
      bullets: [
        'Consulted with clients about their photo needs and interests',
        'Offered fresh ideas and concepts, in addition to classic styles',
        'Established and leveraged social media presence to grow clientele'
      ]
    },
    {
      period: 'April 2019 - May 2020',
      title: 'Photographer Assistant at John Ray Photography',
      company: 'John Ray Photography',
      location: 'Vancouver, BC',
      bullets: [
        'Worked alongside experienced photographers to improve skills',
        'Took detailed notes from photography direction during prior shoots',
        'Communicated with clients and addressed questions and concerns'
      ]
    }
  ]);

  const [education, setEducation] = useState([
    {
      degree: 'Bachelor of Marketing',
      school: 'RCIS University, Montreal',
      year: 'Graduated 2019'
    },
    {
      degree: 'High School Diploma',
      school: 'Lakeside Academy, Montreal',
      year: 'Graduated 2016'
    }
  ]);

  const [certifications, setCertifications] = useState([
    'Professional Photography Certification',
    'Adobe Lightroom Certification',
    'Advanced Editing Course Completion'
  ]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setProfilePhoto(null);
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

  const addSkill = () => {
    setSkills([...skills, { name: 'New Skill', percentage: 75 }]);
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const addExperience = () => {
    setExperiences([...experiences, {
      period: 'Start Date - End Date',
      title: 'Job Title',
      company: 'Company',
      location: 'Location',
      bullets: ['Achievement 1']
    }]);
  };

  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const addBullet = (expIndex) => {
    const newExps = [...experiences];
    newExps[expIndex].bullets.push('New bullet point');
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Creative Designer Resume</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: FORM */}
          <div className="bg-white rounded-lg shadow p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Edit Your Resume</h2>
              <button
                onClick={handleDownloadPDF}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow flex items-center gap-2 text-sm font-medium transition-colors"
                title="Download as PDF"
              >
                <Download className="w-4 h-4" /> Export PDF
              </button>
            </div>

            {/* Photo Upload */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <h3 className="text-lg font-bold mb-4 pb-2 border-b-2 border-blue-600">Profile Photo</h3>
              <div className="flex flex-col items-center gap-4">
                {profilePhoto ? (
                  <div className="relative">
                    <img
                      src={profilePhoto}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-600 shadow-lg"
                    />
                    <button
                      onClick={removePhoto}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-4xl text-white shadow-lg">
                    📷
                  </div>
                )}
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <span className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition block text-center font-semibold">
                    Upload Photo
                  </span>
                </label>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-blue-600">Personal Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">First Name</label>
                    <input
                      type="text"
                      value={name.split(' ')[0]}
                      onChange={(e) => setName(`${e.target.value} ${name.split(' ')[1]}`)}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Last Name</label>
                    <input
                      type="text"
                      value={name.split(' ')[1]}
                      onChange={(e) => setName(`${name.split(' ')[0]} ${e.target.value}`)}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Title/Profession</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Website/Portfolio</label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-blue-600">Professional Summary</h3>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={5}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Experience */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-blue-600">
                <h3 className="text-xl font-bold">Employment History</h3>
                <button
                  onClick={addExperience}
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-6">
                {experiences.map((exp, expIndex) => (
                  <div key={expIndex} className="border border-gray-200 rounded p-4 bg-gray-50">
                    <div className="flex justify-between mb-3">
                      <h4 className="font-semibold">Experience {expIndex + 1}</h4>
                      <button
                        onClick={() => removeExperience(expIndex)}
                        className="text-red-600 hover:text-red-800 text-sm font-bold"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold mb-1">Period</label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => {
                              const newExps = [...experiences];
                              newExps[expIndex].period = e.target.value;
                              setExperiences(newExps);
                            }}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1">Job Title</label>
                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) => {
                              const newExps = [...experiences];
                              newExps[expIndex].title = e.target.value;
                              setExperiences(newExps);
                            }}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold mb-1">Company</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => {
                              const newExps = [...experiences];
                              newExps[expIndex].company = e.target.value;
                              setExperiences(newExps);
                            }}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1">Location</label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => {
                              const newExps = [...experiences];
                              newExps[expIndex].location = e.target.value;
                              setExperiences(newExps);
                            }}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-xs font-semibold">Key Achievements</label>
                          <button
                            onClick={() => addBullet(expIndex)}
                            className="text-xs text-blue-600 hover:text-blue-800 font-bold"
                          >
                            + Add
                          </button>
                        </div>
                        <div className="space-y-2">
                          {exp.bullets.map((bullet, bulletIndex) => (
                            <div key={bulletIndex} className="flex gap-2">
                              <input
                                type="text"
                                value={bullet}
                                onChange={(e) => {
                                  const newExps = [...experiences];
                                  newExps[expIndex].bullets[bulletIndex] = e.target.value;
                                  setExperiences(newExps);
                                }}
                                className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <button
                                onClick={() => removeBullet(expIndex, bulletIndex)}
                                className="text-red-600 hover:text-red-800 font-bold"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-blue-600">Education</h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="border border-gray-200 rounded p-3 bg-gray-50">
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          const newEdu = [...education];
                          newEdu[index].degree = e.target.value;
                          setEducation(newEdu);
                        }}
                        placeholder="Degree"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => {
                          const newEdu = [...education];
                          newEdu[index].school = e.target.value;
                          setEducation(newEdu);
                        }}
                        placeholder="School/University"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => {
                          const newEdu = [...education];
                          newEdu[index].year = e.target.value;
                          setEducation(newEdu);
                        }}
                        placeholder="Graduation Year"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => setEducation(education.filter((_, i) => i !== index))}
                        className="text-red-600 hover:text-red-800 text-sm font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-blue-600">
                <h3 className="text-xl font-bold">Skills</h3>
                <button
                  onClick={addSkill}
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="border border-gray-200 rounded p-3 bg-gray-50">
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => updateSkillName(index, e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={skill.percentage}
                          onChange={(e) => updateSkillPercentage(index, parseInt(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm font-semibold w-10 text-right">{skill.percentage}%</span>
                        <button
                          onClick={() => removeSkill(index)}
                          className="text-red-600 hover:text-red-800 font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-blue-600">Certifications</h3>
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={cert}
                      onChange={(e) => {
                        const newCerts = [...certifications];
                        newCerts[index] = e.target.value;
                        setCertifications(newCerts);
                      }}
                      className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => setCertifications(certifications.filter((_, i) => i !== index))}
                      className="text-red-600 hover:text-red-800 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setCertifications([...certifications, 'New Certification'])}
                className="text-sm text-blue-600 hover:text-blue-800 font-bold mt-3"
              >
                + Add
              </button>
            </div>
          </div>

          {/* RIGHT: PREVIEW */}
          <div
            className="bg-white rounded-lg shadow overflow-hidden max-h-[calc(100vh-200px)] overflow-y-auto sticky top-8"
          >
            <div id="resume-preview" className="bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="grid grid-cols-4 gap-0 min-h-screen">
                {/* Left Sidebar */}
                <div className="col-span-1 bg-gradient-to-b from-blue-50 to-blue-100 p-4 space-y-6 border-r border-blue-200">
                  {/* Profile Photo */}
                  <div className="text-center">
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-blue-600 shadow-lg"
                      />
                    ) : (
                      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 mx-auto flex items-center justify-center text-5xl text-white shadow-lg">
                        📷
                      </div>
                    )}
                  </div>

                  {/* Contact */}
                  <div>
                    <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 pb-1.5 border-b-2 border-blue-600">Contact</h3>
                    <div className="space-y-1 text-xs text-gray-700">
                      <div><strong className="text-gray-600">Phone:</strong> {phone}</div>
                      <div className="break-all"><strong className="text-gray-600">Email:</strong> {email}</div>
                      <div><strong className="text-gray-600">Address:</strong> {address}</div>
                      <div className="break-all"><strong className="text-gray-600">Website:</strong> {website}</div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 pb-1.5 border-b-2 border-blue-600">Skills</h3>
                    <div className="space-y-2">
                      {skills.map((skill, index) => (
                        <div key={index} className="space-y-0.5">
                          <div className="text-xs font-medium text-gray-800">{skill.name}</div>
                          <div className="w-full bg-gray-300 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300"
                              style={{ width: `${skill.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 pb-1.5 border-b-2 border-blue-600">Certifications</h3>
                    <div className="space-y-1">
                      {certifications.map((cert, index) => (
                        <div key={index} className="text-xs text-gray-700">• {cert}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Content */}
                <div className="col-span-3 p-6 space-y-5 relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200 to-purple-200 rounded-bl-full opacity-30 -z-10"></div>

                  {/* Header */}
                  <div className="border-b-2 border-blue-600 pb-3">
                    <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
                    <h2 className="text-sm font-semibold text-blue-600">{title}</h2>
                  </div>

                  {/* Summary */}
                  <div>
                    <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
                  </div>

                  {/* Employment History */}
                  <div>
                    <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 pb-1.5 border-b-2 border-blue-600">Employment History</h3>
                    <div className="space-y-3">
                      {experiences.map((exp, expIndex) => (
                        <div key={expIndex}>
                          <div className="text-xs text-gray-600 mb-0.5">{exp.period}</div>
                          <h4 className="text-sm font-bold text-gray-900">{exp.title}</h4>
                          <p className="text-xs text-gray-600">{exp.company} • {exp.location}</p>
                          <ul className="mt-1.5 space-y-0.5 ml-2">
                            {exp.bullets.map((bullet, bulletIndex) => (
                              <li key={bulletIndex} className="text-xs text-gray-700 flex gap-1.5">
                                <span className="text-blue-500 font-bold flex-shrink-0">•</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 pb-1.5 border-b-2 border-blue-600">Education</h3>
                    <div className="space-y-2">
                      {education.map((edu, index) => (
                        <div key={index}>
                          <h4 className="text-sm font-bold text-gray-900">{edu.degree}</h4>
                          <p className="text-xs text-gray-700">{edu.school}</p>
                          <p className="text-xs text-gray-600">{edu.year}</p>
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
  );
}
