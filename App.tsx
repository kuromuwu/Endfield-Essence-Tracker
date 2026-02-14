
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Briefcase, 
  Layers, 
  RefreshCcw, 
  Info,
  ShieldCheck,
  Star,
  Download,
  Upload,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  Essence, 
  EssenceStats, 
  PrimaryAttribute, 
  SecondaryStat, 
  SkillStat,
  Weapon
} from './types';
import { 
  WEAPONS, 
  PRIMARY_ATTRIBUTES, 
  SECONDARY_STATS, 
  SKILL_STATS 
} from './constants';
import { StatButton } from './components/StatButton';
import { WeaponCard } from './components/WeaponCard';

type Tab = 'essence-matcher' | 'my-inventory';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('essence-matcher');
  const [myEssences, setMyEssences] = useState<Essence[]>([]);
  const [myWeaponIds, setMyWeaponIds] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedStats, setSelectedStats] = useState<EssenceStats>({
    primary: null,
    secondary: null,
    skill: null
  });

  useEffect(() => {
    const savedEssences = localStorage.getItem('my_essences');
    const savedWeapons = localStorage.getItem('my_weapons');
    if (savedEssences) setMyEssences(JSON.parse(savedEssences));
    if (savedWeapons) setMyWeaponIds(JSON.parse(savedWeapons));
  }, []);

  useEffect(() => {
    localStorage.setItem('my_essences', JSON.stringify(myEssences));
  }, [myEssences]);

  useEffect(() => {
    localStorage.setItem('my_weapons', JSON.stringify(myWeaponIds));
  }, [myWeaponIds]);

  const handleClearStats = () => {
    setSelectedStats({ primary: null, secondary: null, skill: null });
  };

  const handleAddEssence = () => {
    if (!selectedStats.primary && !selectedStats.secondary && !selectedStats.skill) return;
    const newEssence: Essence = {
      ...selectedStats,
      id: Math.random().toString(36).substr(2, 9),
      dateAdded: Date.now()
    };
    setMyEssences(prev => [newEssence, ...prev]);
  };

  const handleRemoveEssence = (id: string) => {
    setMyEssences(prev => prev.filter(e => e.id !== id));
  };

  const toggleWeaponOwned = (weaponId: string) => {
    setMyWeaponIds(prev => 
      prev.includes(weaponId) ? prev.filter(id => id !== weaponId) : [...prev, weaponId]
    );
  };

  const handleExport = () => {
    const data = {
      essences: myEssences,
      weapons: myWeaponIds
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `essence_forge_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.essences && Array.isArray(json.essences)) {
          setMyEssences(json.essences);
        }
        if (json.weapons && Array.isArray(json.weapons)) {
          setMyWeaponIds(json.weapons);
        }
        alert('Data imported successfully!');
      } catch (err) {
        alert('Failed to parse file. Ensure it is a valid backup JSON.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const matchingWeapons = useMemo(() => {
    return WEAPONS.map(w => {
      let score = 0;
      if (selectedStats.primary === w.requiredEssence.primary) score++;
      if (selectedStats.secondary === w.requiredEssence.secondary) score++;
      if (selectedStats.skill === w.requiredEssence.skill) score++;
      return { weapon: w, score };
    }).sort((a, b) => b.score - a.score);
  }, [selectedStats]);

  const groupedMatches = useMemo(() => {
    return {
      perfect: matchingWeapons.filter(m => m.score === 3),
      good: matchingWeapons.filter(m => m.score === 2),
      partial: matchingWeapons.filter(m => m.score === 1),
    };
  }, [matchingWeapons]);

  // Check if an essence matches ANY weapon perfectly
  const doesEssenceMatchAny = (essence: Essence) => {
    return WEAPONS.some(w => 
      w.requiredEssence.primary === essence.primary &&
      w.requiredEssence.secondary === essence.secondary &&
      w.requiredEssence.skill === essence.skill
    );
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-gray-300 pb-20">
      <header className="sticky top-0 z-50 bg-[#0c0c0c]/80 backdrop-blur-md border-b border-[#222] px-4 py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-2 rounded">
              <ShieldCheck className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-xl font-black text-white uppercase tracking-tighter italic">Essence Forge</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <nav className="flex bg-black/40 p-1 rounded-lg border border-[#333]">
              <button 
                onClick={() => setActiveTab('essence-matcher')}
                className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'essence-matcher' ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 'text-gray-500 hover:text-white'}`}
              >
                <Layers className="w-4 h-4" /> Matcher
              </button>
              <button 
                onClick={() => setActiveTab('my-inventory')}
                className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'my-inventory' ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 'text-gray-500 hover:text-white'}`}
              >
                <Briefcase className="w-4 h-4" /> My Inventory
              </button>
            </nav>

            <div className="flex gap-2">
              <button 
                onClick={handleExport}
                title="Export Data"
                className="p-2 bg-[#1a1a1a] border border-[#333] rounded hover:border-[#555] transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
              <button 
                onClick={() => fileInputRef.current?.click()}
                title="Import Data"
                className="p-2 bg-[#1a1a1a] border border-[#333] rounded hover:border-[#555] transition-colors"
              >
                <Upload className="w-4 h-4" />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImport} 
                className="hidden" 
                accept=".json"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8">
        {activeTab === 'essence-matcher' ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stat Selection Panel */}
            <section className="bg-[#151515] border border-[#222] rounded-xl p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider">Select Essence Stats</h2>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleClearStats} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded hover:bg-red-500/20 text-xs font-bold transition-colors">
                    <RefreshCcw className="w-3.5 h-3.5" /> Clear
                  </button>
                  <button onClick={handleAddEssence} className="flex items-center gap-1.5 px-4 py-1.5 bg-yellow-400 text-black rounded hover:bg-yellow-300 text-xs font-bold transition-all active:scale-95">
                    <Plus className="w-4 h-4" /> Add to Collection
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                <StatGroup title="Primary Attribute" color="bg-blue-500" items={PRIMARY_ATTRIBUTES} current={selectedStats.primary} onSelect={(val) => setSelectedStats(p => ({...p, primary: val}))} />
                <StatGroup title="Secondary Stat" color="bg-green-500" items={SECONDARY_STATS} current={selectedStats.secondary} onSelect={(val) => setSelectedStats(p => ({...p, secondary: val}))} />
                <StatGroup title="Skill Stat" color="bg-purple-500" items={SKILL_STATS} current={selectedStats.skill} onSelect={(val) => setSelectedStats(p => ({...p, skill: val}))} />
              </div>
            </section>

            {/* Compatible Weapons Area */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-yellow-400" />
                <h2 className="text-sm font-bold text-white tracking-wide">
                  Compatible Weapons <span className="text-gray-500 font-normal">({matchingWeapons.filter(m => m.score > 0).length} found)</span>
                </h2>
              </div>

              {groupedMatches.perfect.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                    Perfect (3/3) <span className="text-gray-500 text-xs font-normal">— {groupedMatches.perfect.length}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {groupedMatches.perfect.map(m => (
                      <WeaponCard key={m.weapon.id} weapon={m.weapon} selectedEssence={selectedStats} />
                    ))}
                  </div>
                </div>
              )}

              {groupedMatches.good.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]" />
                    Good (2/3) <span className="text-gray-500 text-xs font-normal">— {groupedMatches.good.length}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {groupedMatches.good.map(m => (
                      <WeaponCard key={m.weapon.id} weapon={m.weapon} selectedEssence={selectedStats} />
                    ))}
                  </div>
                </div>
              )}

              {groupedMatches.partial.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                    Partial (1/3) <span className="text-gray-500 text-xs font-normal">— {groupedMatches.partial.length}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {groupedMatches.partial.map(m => (
                      <WeaponCard key={m.weapon.id} weapon={m.weapon} selectedEssence={selectedStats} />
                    ))}
                  </div>
                </div>
              )}

              {matchingWeapons.filter(m => m.score > 0).length === 0 && (
                <div className="text-center py-20 bg-[#111] rounded-xl border border-dashed border-[#222]">
                  <p className="text-gray-500 font-medium italic">Select essence stats to see compatible weapons.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                   Inventory <span className="text-gray-500 font-normal text-sm">({myWeaponIds.length} weapons)</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {WEAPONS.map(weapon => {
                  const isOwned = myWeaponIds.includes(weapon.id);
                  const matchingEssenceCount = myEssences.filter(e => 
                    e.primary === weapon.requiredEssence.primary && 
                    e.secondary === weapon.requiredEssence.secondary && 
                    e.skill === weapon.requiredEssence.skill
                  ).length;

                  return (
                    <div 
                      key={weapon.id}
                      onClick={() => toggleWeaponOwned(weapon.id)}
                      className={`relative cursor-pointer group rounded-xl p-4 border transition-all ${isOwned ? 'bg-[#1a1a1a] border-yellow-400/50 shadow-xl opacity-100 grayscale-0' : 'bg-[#111] border-[#222] grayscale hover:grayscale-0 opacity-40 hover:opacity-100'}`}
                    >
                      <div className="flex gap-4 items-center">
                        <div className={`w-16 h-16 rounded overflow-hidden shrink-0 border-2 ${weapon.rarity === 6 ? 'border-red-500' : weapon.rarity === 5 ? 'border-yellow-500' : 'border-purple-500'}`}>
                          <img src={weapon.img} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-white truncate">{weapon.name}</h3>
                          <div className="flex gap-1 mt-1">
                            {Array.from({length: weapon.rarity}).map((_, i) => (
                              <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>

                        {/* Unowned status: show matching essence count */}
                        {!isOwned && matchingEssenceCount > 0 && (
                          <div className="shrink-0 flex flex-col items-center justify-center">
                            <div className="relative">
                              <Layers className="w-5 h-5 text-yellow-400" />
                              <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                                {matchingEssenceCount}
                              </span>
                            </div>
                            <span className="text-[7px] font-bold text-yellow-400 mt-1 uppercase">Matches</span>
                          </div>
                        )}

                        {isOwned && (
                          <div className="absolute top-2 right-2 bg-yellow-400 p-1 rounded-full text-black">
                            <Plus className="w-3 h-3 rotate-45" />
                          </div>
                        )}
                      </div>
                      
                      {isOwned && (
                        <div className="mt-4 pt-3 border-t border-[#333] space-y-3">
                          <div className="text-[10px] font-black text-gray-500 uppercase">Requirement</div>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="text-[10px] bg-black/40 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">{weapon.requiredEssence.primary}</span>
                            <span className="text-[10px] bg-black/40 text-green-400 px-2 py-0.5 rounded border border-green-500/20">{weapon.requiredEssence.secondary}</span>
                            <span className="text-[10px] bg-black/40 text-purple-400 px-2 py-0.5 rounded border border-purple-500/20">{weapon.requiredEssence.skill}</span>
                          </div>

                          <div className="space-y-2">
                             <div className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2">
                               Matching Essences 
                               <span className="bg-yellow-400/20 text-yellow-400 px-1 rounded">
                                 {matchingEssenceCount}
                               </span>
                             </div>
                             <div className="max-h-24 overflow-y-auto custom-scrollbar space-y-1">
                               {matchingEssenceCount > 0 ? (
                                 myEssences
                                   .filter(e => 
                                     e.primary === weapon.requiredEssence.primary && 
                                     e.secondary === weapon.requiredEssence.secondary && 
                                     e.skill === weapon.requiredEssence.skill
                                   )
                                   .map(e => (
                                     <div key={e.id} className="text-[10px] flex justify-between items-center bg-green-500/5 p-1 rounded border border-green-500/10">
                                       <span className="text-green-500 font-bold">Essence #{e.id.slice(0, 4)}</span>
                                       <span className="text-gray-500 italic text-[9px]">Exact Match</span>
                                     </div>
                                   ))
                               ) : (
                                 <div className="text-[10px] text-gray-600 italic">No exact matches in collection.</div>
                               )}
                             </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-24">
                <div className="bg-[#151515] border border-[#222] rounded-xl overflow-hidden shadow-2xl">
                  <div className="bg-[#1a1a1a] px-4 py-3 border-b border-[#222] flex justify-between items-center">
                    <h2 className="font-bold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-yellow-400" /> Collection
                    </h2>
                    <span className="text-xs bg-black px-2 py-0.5 rounded text-gray-500 font-mono">
                      {myEssences.length} UNITS
                    </span>
                  </div>
                  
                  <div className="max-h-[70vh] overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {myEssences.length > 0 ? (
                      myEssences.map(essence => {
                        const hasMatch = doesEssenceMatchAny(essence);
                        return (
                          <div key={essence.id} className={`bg-black/40 border rounded-lg p-3 group relative hover:border-yellow-400/30 transition-all ${hasMatch ? 'border-green-500/20' : 'border-[#333]'}`}>
                            <div className="flex justify-between items-start mb-2">
                              <div className="text-[9px] font-bold text-gray-600 font-mono tracking-widest uppercase">ID: {essence.id.slice(0, 6)}</div>
                              <div className="flex gap-2">
                                {hasMatch && (
                                  <div title="Perfect Weapon Match Found" className="text-green-500 animate-pulse">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                  </div>
                                )}
                                <button onClick={() => handleRemoveEssence(essence.id)} className="p-1 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <EssenceStatRow label="P" value={essence.primary} color="blue" />
                              <EssenceStatRow label="S" value={essence.secondary} color="green" />
                              <EssenceStatRow label="K" value={essence.skill} color="purple" />
                            </div>

                            {hasMatch ? (
                              <div className="mt-2 text-[8px] text-green-500 font-bold uppercase tracking-wider flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> Potential Weapon Found
                              </div>
                            ) : (
                              <div className="mt-2 text-[8px] text-gray-600 font-bold uppercase tracking-wider">
                                No Weapon Found
                              </div>
                            )}

                            <button onClick={() => { setSelectedStats({ primary: essence.primary, secondary: essence.secondary, skill: essence.skill }); setActiveTab('essence-matcher'); }} className="mt-3 w-full py-1 text-[10px] font-bold text-gray-500 hover:text-yellow-400 border border-transparent hover:border-yellow-400/20 rounded bg-black/20 hover:bg-yellow-400/5 transition-all flex items-center justify-center gap-1">
                              <Search className="w-3 h-3" /> Quick Match
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-12 px-4">
                        <Info className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                        <p className="text-sm text-gray-600">Your collection is empty.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const StatGroup = ({ title, color, items, current, onSelect }: any) => (
  <div>
    <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${color}`} /> {title}
    </h3>
    <div className="flex flex-wrap gap-2">
      <StatButton label="None" isActive={current === null} onClick={() => onSelect(null)} />
      {items.map((item: any) => (
        <StatButton key={item} label={item} isActive={current === item} onClick={() => onSelect(item)} />
      ))}
    </div>
  </div>
);

const EssenceStatRow = ({ label, value, color }: { label: string; value: string | null; color: 'blue' | 'green' | 'purple' }) => {
  const colorMap = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    green: 'text-green-400 bg-green-500/10 border-green-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
  };
  return (
    <div className={`flex items-center gap-2 text-[10px] px-2 py-1 rounded border ${value ? colorMap[color] : 'bg-black/20 text-gray-700 border-[#222]'}`}>
      <span className="w-4 font-black opacity-50 shrink-0">{label}</span>
      <span className="truncate font-medium">{value || '---'}</span>
    </div>
  );
};

export default App;
