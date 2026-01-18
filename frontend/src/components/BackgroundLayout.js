import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const BackgroundLayout = ({ children }) => {
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen relative font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a2a] text-white' : 'bg-slate-50 text-gray-900'
            }`}>
            {/* Background Effects - Only visible in dark mode */}
            <div className={`fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none transition-opacity duration-500 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'
                }`}>
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/30 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/30 blur-[120px]"></div>
                <div className="absolute top-[20%] right-[30%] w-[30%] h-[30%] rounded-full bg-blue-900/20 blur-[100px]"></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>
            </div>

            {/* Light Mode subtle background - Only visible in light mode */}
            <div className={`fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none transition-opacity duration-500 ${theme === 'light' ? 'opacity-100' : 'opacity-0'
                }`}>
                <div className="absolute top-0 right-0 w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-[50%] h-[50%] rounded-full bg-purple-100/50 blur-[100px]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
};
