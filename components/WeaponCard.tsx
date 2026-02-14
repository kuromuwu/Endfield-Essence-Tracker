
import React from 'react';
import { Check } from 'lucide-react';
import { Weapon, EssenceStats } from '../types';

interface WeaponCardProps {
  weapon: Weapon;
  selectedEssence: EssenceStats;
}

export const WeaponCard: React.FC<WeaponCardProps> = ({ weapon, selectedEssence }) => {
  const matches = {
    primary: selectedEssence.primary === weapon.requiredEssence.primary,
    secondary: selectedEssence.secondary === weapon.requiredEssence.secondary,
    skill: selectedEssence.skill === weapon.requiredEssence.skill,
  };

  const matchCount = Object.values(matches).filter(Boolean).length;
  
  const getMatchLabel = () => {
    if (matchCount === 3) return '3/3 Perfect';
    if (matchCount === 2) return '2/3 Good';
    if (matchCount === 1) return '1/3 Partial';
    return '0/3 No Match';
  };

  const getMatchBadgeColor = () => {
    if (matchCount === 3) return 'bg-green-600/20 text-green-400 border-green-500/30';
    if (matchCount === 2) return 'bg-blue-600/20 text-blue-400 border-blue-500/30';
    if (matchCount === 1) return 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30';
    return 'bg-gray-600/20 text-gray-400 border-gray-500/30';
  };

  const getRarityColor = (rarity: number) => {
    if (rarity === 6) return 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]';
    if (rarity === 5) return 'border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.2)]';
    if (rarity === 4) return 'border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.2)]';
    return 'border-gray-500';
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded p-3 flex gap-4 items-center group hover:bg-[#222] transition-all">
      {/* Weapon Image Container */}
      <div className={`relative w-16 h-16 shrink-0 border-2 rounded overflow-hidden ${getRarityColor(weapon.rarity)}`}>
        <img 
          src={weapon.img} 
          alt={weapon.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute bottom-0 right-0 bg-black/80 text-[8px] font-bold px-1 py-0.5 text-white flex items-center">
          {weapon.rarity}★
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold text-white truncate">{weapon.name}</h3>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${getMatchBadgeColor()}`}>
            {getMatchLabel()}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <StatTag label={weapon.requiredEssence.primary} matched={matches.primary} />
          <StatTag label={weapon.requiredEssence.secondary} matched={matches.secondary} />
          <StatTag label={weapon.requiredEssence.skill} matched={matches.skill} />
        </div>
      </div>
    </div>
  );
};

const StatTag = ({ label, matched }: { label: string; matched: boolean }) => (
  <div className={`
    flex items-center gap-1 text-[10px] px-2 py-1 rounded transition-all border
    ${matched 
      ? 'bg-yellow-400/20 border-yellow-400/50 text-yellow-400 font-bold' 
      : 'bg-[#000]/30 border-[#333] text-gray-400 opacity-60'
    }
  `}>
    {matched && <Check className="w-3 h-3" strokeWidth={3} />}
    <span className="truncate">{label}</span>
  </div>
);
