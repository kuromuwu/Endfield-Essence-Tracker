
import React from 'react';

interface StatButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

export const StatButton: React.FC<StatButtonProps> = ({ label, isActive, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-medium transition-all duration-200
        ${isActive 
          ? 'bg-yellow-400 border-yellow-400 text-black shadow-[0_0_10px_rgba(250,204,21,0.3)]' 
          : 'bg-black/40 border-[#333] text-[#aaa] hover:border-[#555] hover:text-white'
        }
      `}
    >
      {icon && <span className="opacity-70">{icon}</span>}
      {label}
    </button>
  );
};
