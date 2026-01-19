import React from 'react';

export default function TemplatePreview({ templateId, templateName }) {
  const imagePath = `/templates/Template${templateId}.jpeg`;

  return (
    <div className="w-full h-full bg-gray-100 overflow-hidden">
      <img
        src={imagePath}
        alt={templateName}
        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.style.display = 'none';
          e.target.parentNode.innerHTML = `<div class="flex items-center justify-center h-full text-gray-400 text-sm">Preview not available</div>`;
        }}
      />
    </div>
  );
};
