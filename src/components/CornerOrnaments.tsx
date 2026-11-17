'use client';

import React from 'react';

interface CornerOrnamentsProps {
  color?: string;
}

export const CornerOrnaments: React.FC<CornerOrnamentsProps> = ({ color = 'text-[#c5a059]/40' }) => {
  return (
    <>
      {/* Top Left Corner */}
      <div className={`absolute top-2.5 left-2.5 w-6 h-6 ${color} pointer-events-none select-none`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
          <path d="M2 12C2 6.477 6.477 2 12 2" strokeLinecap="round" />
          <path d="M4 12C4 7.582 7.582 4 12 4" strokeLinecap="round" strokeDasharray="1 2" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <path d="M2 4L6 4L6 8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Top Right Corner */}
      <div className={`absolute top-2.5 right-2.5 w-6 h-6 ${color} pointer-events-none select-none rotate-90`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
          <path d="M2 12C2 6.477 6.477 2 12 2" strokeLinecap="round" />
          <path d="M4 12C4 7.582 7.582 4 12 4" strokeLinecap="round" strokeDasharray="1 2" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <path d="M2 4L6 4L6 8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Bottom Left Corner */}
      <div className={`absolute bottom-2.5 left-2.5 w-6 h-6 ${color} pointer-events-none select-none -rotate-90`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
          <path d="M2 12C2 6.477 6.477 2 12 2" strokeLinecap="round" />
          <path d="M4 12C4 7.582 7.582 4 12 4" strokeLinecap="round" strokeDasharray="1 2" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <path d="M2 4L6 4L6 8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Bottom Right Corner */}
      <div className={`absolute bottom-2.5 right-2.5 w-6 h-6 ${color} pointer-events-none select-none rotate-180`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
          <path d="M2 12C2 6.477 6.477 2 12 2" strokeLinecap="round" />
          <path d="M4 12C4 7.582 7.582 4 12 4" strokeLinecap="round" strokeDasharray="1 2" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <path d="M2 4L6 4L6 8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </>
  );
};
