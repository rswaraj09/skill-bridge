import React, { useState } from 'react';
import { Card } from '../components/ui/card';

export default function ModernMinimalist() {
  const [name, setName] = useState('SARAH CHEN');
  const [title, setTitle] = useState('PRODUCT DESIGNER');
  const [phone, setPhone] = useState('(123) 456-7890');
  const [email, setEmail] = useState('sarah.chen@email.com');
  const [address, setAddress] = useState('San Francisco, CA 94102');
  const [website, setWebsite] = useState('sarahchen.design');
  const [linkedin, setLinkedin] = useState('linkedin.com/in/sarah.chen');
  
  const [summary, setSummary] = useState('Product Designer with 6+ years of experience in UX/UI design, user research, and design systems. Passionate about creating intuitive digital experiences that solve real user problems.');
  
  const [skills, setSkills] = useState([
    { name: 'UI/UX Design', percentage: 95 },
    { name: 'Figma', percentage: 90 },
    { name: 'User Research', percentage: 85 },
    { name: 'Prototyping', percentage: 88 },
    { name: 'Adobe Creative Suite', percentage: 80 },
    { name: 'Design Systems', percentage: 90 }
  ]);
  
  const [experiences, setExperiences] = useState([
    {
      period: 'January 2021 - Present',
      title: 'Senior Product Designer',
      company: 'Tech Startup',
      location: 'San Francisco, CA',
      bullets: [
        'Led design of 15+ product features improving user engagement by 40%',
        'Established design system used across 5+ teams',
        'Conducted user research sessions with 200+ users'
      ]
    },
    {
      period: 'June 2018 - December 2020',
      title: 'Product Designer',
      company: 'Design Agency',
      location: 'San Francisco, CA',
      bullets: [
        'Designed interfaces for 20+ client projects',
        'Improved conversion rates by 25% through UX optimization',
        'Mentored 3 junior designers'
      ]
    }
  ]);

  const [education, setEducation] = useState({
    degree: 'Bachelor of Fine Arts in Graphic Design',
    university: 'California College of the Arts',
    graduation: 'May 2018',
    gpa: 'GPA: 3.7/4.0'
  });

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

  const addSkill = () => {
    setSkills([...skills, { name: 'New Skill', percentage: 75 }]);
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Resume Preview */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-white border-b-2 border-blue-500 px-8 py-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-3xl font-bold text-gray-900 bg-transparent border-none focus:outline-none mb-1"
            />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-sm text-gray-600 bg-transparent border-none focus:outline-none tracking-wide"
            />
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Left Column */}
            <div className="md:w-1/3 bg-gray-50 px-6 py-8 border-r border-gray-200 space-y-8">
              {/* Contact */}
              <div>
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-4 pb-2 border-b-2 border-blue-500">Contact</h3>
                <div className="space-y-2 text-xs text-gray-700">
                  <div>
                    <label className="font-semibold text-gray-600">Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1 text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-gray-600">Email</label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1 text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-gray-600">Location</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1 text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-gray-600">Website</label>
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1 text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-gray-600">LinkedIn</label>
                    <input
                      type="text"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1 text-gray-800"
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-3 pb-2 border-b-2 border-blue-500">About</h3>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full text-xs text-gray-700 leading-relaxed bg-transparent border border-transparent hover:border-gray-300 focus:border-blue-400 focus:outline-none rounded p-2 resize-none"
                  rows={6}
                />
              </div>

              {/* Skills */}
              <div>
                <div className="flex justify-between items-center mb-3 pb-2 border-b-2 border-blue-500">
                  <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Skills</h3>
                  <button
                    onClick={addSkill}
                    className="text-xs text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    + Add
                  </button>
                </div>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => updateSkillName(index, e.target.value)}
                          className="bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none flex-1 text-gray-800 font-medium py-0.5"
                        />
                        <input
                          type="number"
                          value={skill.percentage}
                          onChange={(e) => updateSkillPercentage(index, parseInt(e.target.value) || 0)}
                          className="bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none w-10 text-right text-blue-600 font-semibold py-0.5 ml-2"
                          min="0"
                          max="100"
                        />
                        <span className="text-blue-600 font-semibold ml-0.5">%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-500 h-full transition-all duration-300"
                          style={{ width: `${skill.percentage}%` }}
                        />
                      </div>
                      <button
                        onClick={() => removeSkill(index)}
                        className="text-xs text-gray-400 hover:text-red-500 ml-auto block"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-3 pb-2 border-b-2 border-blue-500">Education</h3>
                <div className="space-y-2 text-xs text-gray-700">
                  <input
                    type="text"
                    value={education.degree}
                    onChange={(e) => setEducation({...education, degree: e.target.value})}
                    className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1 font-medium text-gray-800"
                  />
                  <input
                    type="text"
                    value={education.university}
                    onChange={(e) => setEducation({...education, university: e.target.value})}
                    className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1 text-gray-700"
                  />
                  <input
                    type="text"
                    value={education.graduation}
                    onChange={(e) => setEducation({...education, graduation: e.target.value})}
                    className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1 text-gray-700"
                  />
                  <input
                    type="text"
                    value={education.gpa}
                    onChange={(e) => setEducation({...education, gpa: e.target.value})}
                    className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1 text-gray-600 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="md:w-2/3 px-8 py-8 space-y-8">
              {/* Professional Experience */}
              <div>
                <div className="flex justify-between items-center mb-3 pb-2 border-b-2 border-blue-500">
                  <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Professional Experience</h3>
                  <button
                    onClick={addExperience}
                    className="text-xs text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    + Add
                  </button>
                </div>
                <div className="space-y-6">
                  {experiences.map((exp, expIndex) => (
                    <div key={expIndex} className="space-y-1">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => {
                              const newExps = [...experiences];
                              newExps[expIndex].period = e.target.value;
                              setExperiences(newExps);
                            }}
                            className="text-xs text-gray-600 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-0.5 w-full"
                          />
                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) => {
                              const newExps = [...experiences];
                              newExps[expIndex].title = e.target.value;
                              setExperiences(newExps);
                            }}
                            className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none text-sm font-bold text-gray-800 py-1 mt-1"
                          />
                          <input
                            type="text"
                            value={`${exp.company} • ${exp.location}`}
                            onChange={(e) => {
                              const parts = e.target.value.split('•');
                              const newExps = [...experiences];
                              newExps[expIndex].company = parts[0]?.trim() || '';
                              newExps[expIndex].location = parts[1]?.trim() || '';
                              setExperiences(newExps);
                            }}
                            className="w-full text-xs text-gray-600 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-0.5"
                          />
                        </div>
                        <button
                          onClick={() => removeExperience(expIndex)}
                          className="text-xs text-gray-400 hover:text-red-500 ml-2"
                        >
                          ✕
                        </button>
                      </div>
                      <ul className="mt-2 space-y-1 ml-3">
                        {exp.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="text-xs text-gray-700 flex gap-2">
                            <span className="text-blue-500 font-bold">›</span>
                            <textarea
                              value={bullet}
                              onChange={(e) => {
                                const newExps = [...experiences];
                                newExps[expIndex].bullets[bulletIndex] = e.target.value;
                                setExperiences(newExps);
                              }}
                              className="flex-1 bg-transparent border border-transparent hover:border-gray-300 focus:border-blue-400 focus:outline-none rounded px-1 resize-none"
                              rows={2}
                            />
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

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold">
            Download PDF
          </button>
          <button className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors text-sm font-semibold">
            Preview
          </button>
        </div>
      </div>
    </div>
  );
}
