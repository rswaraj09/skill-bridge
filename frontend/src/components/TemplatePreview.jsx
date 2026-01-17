import React from 'react';

export const TemplatePreview = ({ templateId, templateName }) => {
  const templates = {
    1: {
      name: 'Professional Classic',
      preview: (
        <div className="w-full h-full bg-white flex flex-col text-xs">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-3 text-center">
            <div className="font-bold">JOHN ANDERSON</div>
            <div className="text-gray-300 text-xs">MARKETING MANAGER</div>
          </div>
          {/* Body */}
          <div className="flex flex-1 p-3 gap-3">
            {/* Left Column */}
            <div className="flex-1 border-r border-gray-300 pr-3">
              <div className="font-bold text-gray-700 mb-1 text-xs">SUMMARY</div>
              <div className="text-gray-600 text-xs leading-tight mb-2">Results-driven professional with 8+ years experience</div>
              <div className="font-bold text-gray-700 mb-1 text-xs">EDUCATION</div>
              <div className="text-gray-600 text-xs leading-tight mb-2">MBA - University</div>
              <div className="font-bold text-gray-700 mb-1 text-xs">SKILLS</div>
              <div className="text-gray-600 text-xs leading-tight">Marketing, Analytics</div>
            </div>
            {/* Right Column */}
            <div className="flex-1">
              <div className="font-bold text-gray-700 mb-1 text-xs">CONTACT</div>
              <div className="text-gray-600 text-xs mb-2">john@email.com</div>
              <div className="font-bold text-gray-700 mb-1 text-xs">EXPERIENCE</div>
              <div className="text-gray-600 text-xs leading-tight">Senior Manager at ABC Corp</div>
            </div>
          </div>
        </div>
      )
    },
    2: {
      name: 'Modern Minimalist',
      preview: (
        <div className="w-full h-full bg-white flex flex-col text-xs overflow-hidden">
          <div className="bg-white border-b-2 border-blue-500 px-3 py-2">
            <div className="font-bold text-sm text-gray-900">SARAH CHEN</div>
            <div className="text-xs text-gray-600">Product Designer</div>
          </div>
          <div className="flex flex-1 overflow-hidden">
            {/* Left sidebar preview */}
            <div className="w-2/5 bg-gray-50 px-2 py-2 border-r border-gray-200 space-y-2 overflow-y-auto">
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase mb-1 pb-1 border-b border-blue-300">Contact</div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>📱 (123) 456-7890</div>
                  <div>✉️ sarah.chen@email.com</div>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase mb-1 pb-1 border-b border-blue-300">Skills</div>
                <div className="space-y-1">
                  <div className="text-xs">
                    <div className="font-medium">UI/UX Design</div>
                    <div className="w-full bg-gray-300 h-1 rounded mt-0.5">
                      <div className="bg-blue-500 h-full rounded" style={{width: '95%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right content preview */}
            <div className="w-3/5 px-2 py-2">
              <div className="text-xs space-y-1">
                <div className="font-bold text-blue-600 border-b border-blue-300 pb-1">EXPERIENCE</div>
                <div>
                  <div className="text-xs text-gray-600">2021 - Present</div>
                  <div className="font-bold text-gray-800">Senior Product Designer</div>
                  <div className="text-gray-600">Tech Startup</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    3: {
      name: 'Creative Bold',
      preview: (
        <div className="w-full h-full bg-white flex flex-col text-xs">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 text-center">
            <div className="font-bold text-lg">MICHAEL TORRES</div>
            <div className="text-pink-100">Creative Director</div>
          </div>
          <div className="flex-1 p-3 space-y-2">
            <div className="border-l-4 border-purple-600 pl-2">
              <div className="font-bold text-purple-600 text-xs">SPECIALIZATION</div>
              <div className="text-gray-600 text-xs">Award-winning campaigns</div>
            </div>
            <div className="border-l-4 border-pink-600 pl-2">
              <div className="font-bold text-pink-600 text-xs">BACKGROUND</div>
              <div className="text-gray-600 text-xs">10+ years in advertising</div>
            </div>
          </div>
        </div>
      )
    },
    4: {
      name: 'Executive Summary',
      preview: (
        <div className="w-full h-full bg-white flex flex-col text-xs">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-3">
            <div className="font-bold">DAVID WILLIAMS</div>
            <div className="text-blue-100">Chief Marketing Officer</div>
          </div>
          <div className="flex-1 p-3">
            <div className="bg-blue-50 p-2 rounded mb-2">
              <div className="font-bold text-blue-900 text-xs">EXECUTIVE PROFILE</div>
              <div className="text-gray-700 text-xs leading-tight">Strategic CMO with 15+ years driving corporate growth</div>
            </div>
            <div className="text-gray-600 text-xs space-y-1">
              <div>• P&L Management: $50M+</div>
              <div>• Revenue Growth: 120%</div>
              <div>• Team Built: 50+ professionals</div>
            </div>
          </div>
        </div>
      )
    },
    5: {
      name: 'Tech Professional',
      preview: (
        <div className="w-full h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col text-xs">
          <div className="p-3 border-b border-gray-700">
            <div className="font-bold">EMILY RODRIGUEZ</div>
            <div className="text-gray-400">Full Stack Developer</div>
          </div>
          <div className="flex-1 p-3 space-y-2">
            <div className="bg-gray-700 bg-opacity-50 p-2 rounded">
              <div className="text-green-400 font-bold text-xs">TECH STACK</div>
              <div className="text-gray-300 text-xs">React • Node.js • AWS</div>
            </div>
            <div className="bg-gray-700 bg-opacity-50 p-2 rounded">
              <div className="text-blue-400 font-bold text-xs">EXPERIENCE</div>
              <div className="text-gray-300 text-xs">7+ years building scalable apps</div>
            </div>
          </div>
        </div>
      )
    },
    6: {
      name: 'Academic Focus',
      preview: (
        <div className="w-full h-full bg-white flex flex-col text-xs">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-3 text-center">
            <div className="font-bold">Prof. JOHNSON</div>
            <div className="text-indigo-100">Research Scholar & Educator</div>
          </div>
          <div className="flex-1 p-3 space-y-2">
            <div>
              <div className="font-bold text-indigo-700 text-xs">PUBLICATIONS</div>
              <div className="text-gray-600 text-xs">40+ peer-reviewed papers</div>
            </div>
            <div>
              <div className="font-bold text-indigo-700 text-xs">RESEARCH GRANTS</div>
              <div className="text-gray-600 text-xs">$5M+ in funded research</div>
            </div>
            <div>
              <div className="font-bold text-indigo-700 text-xs">EDUCATION</div>
              <div className="text-gray-600 text-xs">PhD in Computer Science</div>
            </div>
          </div>
        </div>
      )
    },
    7: {
      name: 'Chronological Order',
      preview: (
        <div className="w-full h-full bg-white flex flex-col text-xs">
          <div className="bg-gray-700 text-white p-3">
            <div className="font-bold">JAMES MITCHELL</div>
            <div className="text-gray-300">Operations Manager</div>
          </div>
          <div className="flex-1 p-3 space-y-1">
            <div className="pb-2 border-b border-gray-300">
              <div className="font-bold text-gray-800">2022 - Present</div>
              <div className="text-gray-600 text-xs">Senior Operations Manager</div>
            </div>
            <div className="pb-2 border-b border-gray-300">
              <div className="font-bold text-gray-800">2019 - 2022</div>
              <div className="text-gray-600 text-xs">Operations Manager</div>
            </div>
            <div>
              <div className="font-bold text-gray-800">2016 - 2019</div>
              <div className="text-gray-600 text-xs">Operations Supervisor</div>
            </div>
          </div>
        </div>
      )
    },
    8: {
      name: 'Functional Format',
      preview: (
        <div className="w-full h-full bg-white flex flex-col text-xs">
          <div className="bg-gradient-to-r from-green-700 to-green-800 text-white p-3 text-center">
            <div className="font-bold">JENNIFER PARKER</div>
            <div className="text-green-100">Sales Executive</div>
          </div>
          <div className="flex-1 p-3">
            <div className="font-bold text-green-700 mb-1">CORE COMPETENCIES</div>
            <div className="text-gray-600 text-xs mb-2">Enterprise Sales • Relationship Management • Revenue Generation</div>
            <div className="font-bold text-green-700 mb-1">KEY ACHIEVEMENTS</div>
            <div className="text-gray-600 text-xs">• Exceeded targets by 45%</div>
          </div>
        </div>
      )
    },
    9: {
      name: 'Hybrid Structure',
      preview: (
        <div className="w-full h-full bg-white flex flex-col text-xs">
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-3">
            <div className="font-bold">ROBERT BENNETT</div>
            <div className="text-orange-100">HR Director</div>
          </div>
          <div className="flex flex-1">
            <div className="flex-1 border-r border-gray-300 p-3">
              <div className="font-bold text-amber-700 mb-1 text-xs">CORE SKILLS</div>
              <div className="text-gray-600 text-xs">Talent Acquisition</div>
              <div className="text-gray-600 text-xs">Leadership</div>
            </div>
            <div className="flex-1 p-3">
              <div className="font-bold text-amber-700 mb-1 text-xs">TIMELINE</div>
              <div className="text-gray-600 text-xs">2022 - Present</div>
            </div>
          </div>
        </div>
      )
    },
    10: {
      name: 'Creative Designer',
      preview: (
        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col text-xs overflow-hidden">
          <div className="grid grid-cols-3 gap-0 h-full">
            {/* Left sidebar */}
            <div className="col-span-1 bg-gradient-to-b from-blue-50 to-blue-100 p-2 border-r border-blue-200 space-y-2 overflow-y-auto">
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase mb-1 pb-1 border-b border-blue-600">Contact</div>
                <div className="text-xs text-gray-700 space-y-0.5 text-xs">
                  <div>📱 (123) 456-7890</div>
                  <div>✉️ daniel@email</div>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase mb-1 pb-1 border-b border-blue-600 flex justify-between">Skills</div>
                <div className="space-y-1">
                  <div className="text-xs">
                    <div className="font-medium text-gray-800">UI/UX Design</div>
                    <div className="w-full bg-gray-300 h-1 rounded mt-0.5">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded" style={{width: '90%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right content */}
            <div className="col-span-2 px-2 py-2 space-y-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-blue-200 to-purple-200 rounded-bl-full opacity-30 -z-10"></div>
              <div className="border-b-2 border-blue-600 pb-1">
                <div className="font-bold text-gray-900 text-xs">DANIEL JONES</div>
                <div className="text-xs text-blue-600">Photographer</div>
              </div>
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-blue-600 border-b border-blue-300 pb-0.5">EMPLOYMENT</div>
                <div className="text-xs text-gray-700">
                  <div className="text-gray-600">June 2020 - Present</div>
                  <div className="font-bold text-gray-900">Senior Photographer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    11: {
      name: 'Corporate Professional',
      preview: (
        <div className="w-full h-full bg-white flex flex-col text-xs">
          <div className="bg-gray-900 text-white p-3 flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-600 rounded"></div>
            <div>
              <div className="font-bold">CHRISTOPHER THOMPSON</div>
              <div className="text-gray-400 text-xs">Finance Manager</div>
            </div>
          </div>
          <div className="flex-1 p-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-100 p-2 rounded">
                <div className="font-bold text-gray-800 text-xs">$100M+</div>
                <div className="text-gray-600 text-xs">Budget Managed</div>
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <div className="font-bold text-gray-800 text-xs">20%</div>
                <div className="text-gray-600 text-xs">Cost Reduction</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    12: {
      name: 'Startup Oriented',
      preview: (
        <div className="w-full h-full bg-gradient-to-br from-cyan-50 to-blue-50 flex flex-col text-xs">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-3">
            <div className="font-bold">NATHAN KUMAR</div>
            <div className="text-cyan-100">Startup Founder & CEO</div>
          </div>
          <div className="flex-1 p-3">
            <div className="space-y-1">
              <div className="flex justify-between text-gray-700">
                <span className="font-bold">Funding Raised</span>
                <span>$5M Series A</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-bold">Users</span>
                <span>100K+</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-bold">Team</span>
                <span>30+ employees</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    13: {
      name: 'One Page Resume',
      preview: (
        <div className="w-full h-full bg-white flex flex-col text-xs overflow-hidden">
          <div className="bg-blue-600 text-white p-2 text-center">
            <div className="font-bold text-sm">MICHELLE DAVIS</div>
            <div className="text-blue-100 text-xs">Junior Software Developer</div>
          </div>
          <div className="flex-1 p-2 text-gray-700 space-y-1 text-xs">
            <div>📧 michelle@email.com | 📱 +1-555-9876</div>
            <div><strong>SKILLS:</strong> JavaScript, React, HTML, CSS</div>
            <div><strong>EXPERIENCE:</strong> Web Developer at Tech Agency</div>
          </div>
        </div>
      )
    },
    14: {
      name: 'Two Column Layout',
      preview: (
        <div className="w-full h-full bg-white flex text-xs">
          <div className="w-1/3 bg-gradient-to-b from-teal-600 to-teal-700 text-white p-3">
            <div className="font-bold mb-2">LAURA STEWART</div>
            <div className="text-teal-100 text-xs mb-2">Project Manager</div>
            <div className="text-xs space-y-1">
              <div className="font-bold">SKILLS</div>
              <div>• Project Mgmt</div>
              <div>• Agile/Scrum</div>
            </div>
          </div>
          <div className="flex-1 p-3">
            <div className="font-bold text-gray-800 mb-1">PROFESSIONAL EXPERIENCE</div>
            <div className="text-gray-600 text-xs mb-2">
              <div>Senior PM | 2021-Present</div>
              <div>15+ simultaneous projects</div>
            </div>
          </div>
        </div>
      )
    },
    15: {
      name: 'Infographic Style',
      preview: (
        <div className="w-full h-full bg-white flex flex-col text-xs p-3">
          <div className="text-center mb-2">
            <div className="font-bold text-gray-900">MARCUS JOHNSON</div>
            <div className="text-gray-600">Data Scientist</div>
          </div>
          <div className="flex gap-1 justify-center mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <div className="w-full bg-gray-300 h-1 rounded"></div>
              <span className="text-xs">Python</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-5/6 bg-gray-300 h-1 rounded"></div>
              <span className="text-xs">ML</span>
            </div>
          </div>
        </div>
      )
    },
    16: {
      name: 'Healthcare Professional',
      preview: (
        <div className="w-full h-full bg-white flex flex-col text-xs">
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-3 text-center">
            <div className="font-bold">DR. ELIZABETH GARCIA</div>
            <div className="text-red-100">Registered Nurse - ICU</div>
          </div>
          <div className="flex-1 p-3">
            <div className="mb-2">
              <div className="font-bold text-red-700">LICENSE & CERTIFICATIONS</div>
              <div className="text-gray-600 text-xs">RN License • ACLS/BLS</div>
            </div>
            <div>
              <div className="font-bold text-red-700">CLINICAL EXPERTISE</div>
              <div className="text-gray-600 text-xs">Critical Care • 11+ years</div>
            </div>
          </div>
        </div>
      )
    },
    17: {
      name: 'Finance Executive',
      preview: (
        <div className="w-full h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col text-xs">
          <div className="p-3 text-center border-b border-slate-700">
            <div className="font-bold">WILLIAM ANDERSON</div>
            <div className="text-slate-400">Chief Financial Officer</div>
          </div>
          <div className="flex-1 p-3">
            <div className="space-y-2">
              <div className="bg-slate-700 bg-opacity-50 p-2 rounded">
                <div className="text-yellow-400 font-bold">FINANCIAL LEADERSHIP</div>
                <div className="text-slate-300">$500M+ Budget Oversight</div>
              </div>
              <div className="bg-slate-700 bg-opacity-50 p-2 rounded">
                <div className="text-green-400 font-bold">M&A EXPERTISE</div>
                <div className="text-slate-300">3 successful acquisitions</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    18: {
      name: 'Marketing Manager',
      preview: (
        <div className="w-full h-full bg-white flex flex-col text-xs">
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white p-3 text-center">
            <div className="font-bold">AMANDA WHITE</div>
            <div className="text-orange-100">Marketing Manager</div>
          </div>
          <div className="flex-1 p-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-orange-50 p-2 rounded border-l-4 border-orange-500">
                <div className="font-bold text-orange-700 text-xs">$5M</div>
                <div className="text-gray-600 text-xs">Budget</div>
              </div>
              <div className="bg-pink-50 p-2 rounded border-l-4 border-pink-500">
                <div className="font-bold text-pink-700 text-xs">50%</div>
                <div className="text-gray-600 text-xs">Growth</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  const template = templates[templateId];
  
  return (
    <div className="w-full h-full rounded-lg border-2 border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {template ? template.preview : <div>Loading...</div>}
    </div>
  );
};

export default TemplatePreview;
