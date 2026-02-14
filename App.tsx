import React, { useState, useEffect, useRef } from 'react';
import { PRIMARY_ATTRIBUTES, SECONDARY_STATS, SKILL_STATS, WEAPON_CLASSES } from './data';
import { EssenceInstance, Weapon, PrimaryAttribute, SecondaryStat, SkillStat } from './types';
import { api, AppBackup } from './services/api';
import { analyzeCollection } from './services/gemini';
import { 
  Plus, Trash2, Sparkles, Package, 
  Target, X, Loader2, Database, ShieldCheck, Terminal, LayoutList, Image as ImageIcon, Sparkle, Edit3, Download, Upload, AlertCircle, Layers
} from 'lucide-react';

const App: React.FC = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [instances, setInstances] = useState<EssenceInstance[]>([]);
  const [targetWeaponIds, setTargetWeaponIds] = useState<string[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWeaponModal, setShowWeaponModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'vault' | 'plans' | 'databank'>('vault');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [editingWeaponId, setEditingWeaponId] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New Essence State (Levels removed)
  const [newEssence, setNewEssence] = useState<Partial<EssenceInstance>>({
    primary: PRIMARY_ATTRIBUTES[0],
    secondary: SECONDARY_STATS[0],
    skill: SKILL_STATS[0]
  });

  const initialWeaponState: Partial<Weapon> = {
    name: '',
    rarity: '5-Star',
    type: 'Sword',
    imageUrl: '',
    stats: { atk: 100 },
    requiredStats: {
      primary: PRIMARY_ATTRIBUTES[0],
      secondary: SECONDARY_STATS[0],
      skill: SKILL_STATS[0]
    }
  };

  const [weaponEdit, setWeaponEdit] = useState<Partial<Weapon>>(initialWeaponState);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [catalogue, savedInstances, savedTargets] = await Promise.all([
        api.getCatalogue(),
        api.getInstances(),
        api.getTargets()
      ]);
      setWeapons(catalogue.weapons);
      setInstances(savedInstances);
      setTargetWeaponIds(savedTargets);
    } catch (err) {
      console.error("Initialization failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleExport = async () => {
    const data = await api.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `endfield_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const backup: AppBackup = JSON.parse(content);
        
        if (confirm("System Restoration initiated. Current data will be purged. Confirm?")) {
          await api.importData(backup);
          await loadData();
          alert("Restore complete. Neural link established.");
        }
      } catch (err) {
        alert("Restoration failed: Data corruption detected.");
        console.error(err);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleAddInstance = async () => {
    if (!newEssence.primary || !newEssence.secondary || !newEssence.skill) return;
    
    // Check for duplicates to stack
    const existingIndex = instances.findIndex(i => 
      i.primary === newEssence.primary && 
      i.secondary === newEssence.secondary && 
      i.skill === newEssence.skill
    );

    let updated: EssenceInstance[];
    if (existingIndex > -1) {
      updated = [...instances];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + 1,
        timestamp: Date.now()
      };
    } else {
      const instance: EssenceInstance = {
        id: crypto.randomUUID(),
        primary: newEssence.primary as PrimaryAttribute,
        secondary: newEssence.secondary as SecondaryStat,
        skill: newEssence.skill as SkillStat,
        quantity: 1,
        timestamp: Date.now()
      };
      updated = [instance, ...instances];
    }

    setInstances(updated);
    setShowAddModal(false);
    await api.saveInstances(updated);
  };

  const handleRemoveInstance = async (id: string) => {
    const updated = instances.filter(i => i.id !== id);
    setInstances(updated);
    await api.saveInstances(updated);
  };

  const handleSaveWeapon = async () => {
    if (!weaponEdit.name || !weaponEdit.imageUrl || !weaponEdit.requiredStats) return;
    
    let updated: Weapon[];
    if (editingWeaponId) {
      updated = weapons.map(w => w.id === editingWeaponId ? {
        ...w,
        name: weaponEdit.name!,
        rarity: weaponEdit.rarity as any,
        type: weaponEdit.type as any,
        imageUrl: weaponEdit.imageUrl!,
        requiredStats: weaponEdit.requiredStats as any
      } : w);
    } else {
      const newWep: Weapon = {
        id: crypto.randomUUID(),
        name: weaponEdit.name,
        rarity: weaponEdit.rarity as any,
        type: weaponEdit.type as any,
        imageUrl: weaponEdit.imageUrl,
        stats: { atk: weaponEdit.stats?.atk || 0 },
        requiredStats: weaponEdit.requiredStats as any
      };
      updated = [...weapons, newWep];
    }

    setWeapons(updated);
    setShowWeaponModal(false);
    setEditingWeaponId(null);
    await api.saveCatalogue(updated);
    setWeaponEdit(initialWeaponState);
  };

  const handleEditWeapon = (weapon: Weapon) => {
    setEditingWeaponId(weapon.id);
    setWeaponEdit({
      name: weapon.name,
      rarity: weapon.rarity,
      type: weapon.type,
      imageUrl: weapon.imageUrl,
      stats: weapon.stats,
      requiredStats: weapon.requiredStats
    });
    setShowWeaponModal(true);
  };

  const handleRemoveWeapon = async (id: string) => {
    const updated = weapons.filter(w => w.id !== id);
    setWeapons(updated);
    await api.saveCatalogue(updated);
  };

  const toggleTarget = async (id: string) => {
    const updated = targetWeaponIds.includes(id) ? targetWeaponIds.filter(tid => tid !== id) : [...targetWeaponIds, id];
    setTargetWeaponIds(updated);
    await api.saveTargets(updated);
  };

  const getInstanceMatch = (instance: EssenceInstance) => {
    let bestMatchCount = 0;
    let bestWeapon: Weapon | null = null;

    weapons.forEach(w => {
      let count = 0;
      if (w.requiredStats.primary === instance.primary) count++;
      if (w.requiredStats.secondary === instance.secondary) count++;
      if (w.requiredStats.skill === instance.skill) count++;
      
      const isTarget = targetWeaponIds.includes(w.id);
      if (count > bestMatchCount) {
        bestMatchCount = count;
        bestWeapon = w;
      } else if (count > 0 && count === bestMatchCount && isTarget && (!bestWeapon || !targetWeaponIds.includes(bestWeapon.id))) {
        bestWeapon = w;
      }
    });

    if (bestMatchCount === 3) {
      const color = bestWeapon?.rarity === '6-Star' ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.2)]';
      return { label: 'OPTIMAL', color, count: 3, weapon: bestWeapon };
    }
    if (bestMatchCount > 0) {
      const color = bestWeapon?.rarity === '6-Star' ? 'border-red-500/30' : 'border-yellow-400/30';
      return { label: 'PARTIAL', color, count: bestMatchCount, weapon: bestWeapon };
    }
    return { label: 'SCRAP', color: 'border-zinc-800 bg-zinc-900/40 opacity-40 grayscale outline-dashed outline-1 outline-zinc-800', count: 0, weapon: null };
  };

  const isWeaponReady = (weapon: Weapon) => {
    return instances.some(inst => 
      inst.primary === weapon.requiredStats.primary &&
      inst.secondary === weapon.requiredStats.secondary &&
      inst.skill === weapon.requiredStats.skill
    );
  };

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    const result = await analyzeCollection(instances, weapons);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-amber-500" size={40} />
        <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.3em] animate-pulse">Neural Link Synchronization...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 flex flex-col md:flex-row overflow-hidden font-sans">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".json" />
      
      <aside className="w-full md:w-64 bg-zinc-950 border-r border-zinc-800 p-6 flex flex-col gap-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
            <ShieldCheck className="text-black" size={24} />
          </div>
          <h1 className="font-bold text-xl tracking-tighter leading-tight font-mono">ENDFIELD<br/><span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Core.System</span></h1>
        </div>
        
        <nav className="flex flex-col gap-1">
          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-3 px-4">Operator Terminal</p>
          <button onClick={() => setActiveTab('vault')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'vault' ? 'bg-zinc-900 text-amber-500 border border-zinc-800' : 'text-zinc-400 hover:bg-zinc-900/50'}`}>
            <Package size={18} />
            <span className="font-bold text-sm">Vault</span>
          </button>
          <button onClick={() => setActiveTab('plans')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'plans' ? 'bg-zinc-900 text-amber-500 border border-zinc-800' : 'text-zinc-400 hover:bg-zinc-900/50'}`}>
            <LayoutList size={18} />
            <span className="font-bold text-sm">Weapon Plans</span>
          </button>
        </nav>

      </aside>

      <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#0d0d0f]">
        {activeTab === 'vault' && (
          <div className="max-w-6xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-4xl font-black mb-2 tracking-tighter uppercase font-mono text-zinc-100">Essence Vault</h2>
                <p className="text-zinc-500 font-medium text-sm">Log extractions and stack matching archetypes.</p>
              </div>
              <button onClick={() => setShowAddModal(true)} className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-black py-3 px-6 rounded-xl transition-all shadow-xl shadow-amber-500/10 text-xs uppercase tracking-widest">
                <Plus size={20} />
                LOG RESULT
              </button>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {instances.map(instance => {
                const match = getInstanceMatch(instance);
                const isScrap = match.label === 'SCRAP';
                const weaponColor = isScrap ? 'text-zinc-700' : (match.weapon?.rarity === '6-Star' ? 'text-red-500' : 'text-yellow-500');

                return (
                  <div key={instance.id} className={`group relative bg-zinc-900/80 border ${match.color} rounded-xl p-3 hover:translate-y-[-2px] transition-all overflow-hidden flex flex-col`}>
                    <div className="absolute top-2 right-2 bg-zinc-950/80 px-1.5 py-0.5 rounded text-[9px] font-black text-amber-500 border border-amber-500/20 z-10">
                      x{instance.quantity}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-8 h-8 flex-shrink-0 bg-zinc-950 rounded border ${isScrap ? 'border-zinc-800' : (match.weapon?.rarity === '6-Star' ? 'border-red-500/40' : 'border-yellow-400/40')} overflow-hidden`}>
                        {!isScrap && match.weapon ? <img src={match.weapon.imageUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center opacity-10"><Package size={14} /></div>}
                      </div>
                      <div className="min-w-0">
                        <span className={`text-[9px] font-black uppercase truncate block ${weaponColor}`}>
                          {isScrap ? 'WASTE DATA' : match.weapon?.name}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-[8px] font-mono mb-2 flex-1">
                      <div className="flex justify-between items-center bg-black/40 px-2 py-0.5 rounded border border-zinc-800/30">
                        <span className="text-blue-500 font-black">P</span>
                        <span className="text-zinc-400 truncate ml-2 uppercase">{instance.primary}</span>
                      </div>
                      <div className="flex justify-between items-center bg-black/40 px-2 py-0.5 rounded border border-zinc-800/30">
                        <span className="text-cyan-500 font-black">S</span>
                        <span className="text-zinc-400 truncate ml-2 uppercase">{instance.secondary}</span>
                      </div>
                      <div className="flex justify-between items-center bg-black/40 px-2 py-0.5 rounded border border-zinc-800/30">
                        <span className="text-purple-500 font-black">K</span>
                        <span className="text-zinc-400 truncate ml-2 uppercase">{instance.skill}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-zinc-800 pt-2 mt-auto">
                      <span className={`text-[7px] font-black px-1 rounded ${isScrap ? 'bg-zinc-800 text-zinc-600' : (match.weapon?.rarity === '6-Star' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500')}`}>
                        {match.label}
                      </span>
                      <button onClick={() => handleRemoveInstance(instance.id)} className="text-zinc-800 hover:text-red-500 transition-colors"><Trash2 size={12} /></button>
                    </div>
                  </div>
                );
              })}
            </div>
            {instances.length === 0 && <div className="text-center py-24 border-2 border-dashed border-zinc-800/50 rounded-2xl text-zinc-700 font-mono text-[10px] uppercase tracking-widest">Inventory Empty</div>}
          </div>
        )}

        {activeTab === 'plans' && (
          <div className="max-w-6xl mx-auto">
            <header className="mb-10"><h2 className="text-4xl font-black mb-2 uppercase tracking-tighter font-mono text-zinc-100">Hardware Plans</h2><p className="text-zinc-500">Inventory cross-reference for registered blueprints.</p></header>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {weapons.map(weapon => {
                const isTarget = targetWeaponIds.includes(weapon.id);
                const ready = isWeaponReady(weapon);
                const isSixStar = weapon.rarity === '6-Star';
                return (
                  <div key={weapon.id} className={`flex flex-col md:flex-row bg-zinc-900 border rounded-xl overflow-hidden transition-all ${ready ? 'border-green-500 shadow-lg shadow-green-500/5' : isTarget ? (isSixStar ? 'border-red-500' : 'border-amber-500') : 'border-zinc-800'}`}>
                    <div className="w-full md:w-40 h-40 md:h-auto relative">
                      <img src={weapon.imageUrl} alt={weapon.name} className={`w-full h-full object-cover ${ready || isTarget ? 'opacity-100' : 'opacity-20 grayscale'}`} />
                      <div className={`absolute top-2 left-2 ${ready ? 'bg-green-500' : (isSixStar ? 'bg-red-600' : 'bg-yellow-500')} text-black text-[8px] font-black px-2 py-0.5 rounded shadow font-mono`}>{ready ? 'READY' : weapon.rarity}</div>
                    </div>
                    <div className="flex-1 p-5 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div><h3 className={`text-lg font-black uppercase tracking-tight ${isSixStar ? 'text-red-500' : 'text-yellow-400'}`}>{weapon.name}</h3><span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{weapon.type} UNIT</span></div>
                        <button onClick={() => toggleTarget(weapon.id)} className={`p-1.5 rounded-lg transition-all ${isTarget ? (isSixStar ? 'bg-red-600 text-white shadow-lg shadow-red-500/20' : 'bg-amber-500 text-black shadow-lg shadow-amber-500/20') : 'bg-zinc-800 text-zinc-600 hover:text-zinc-400'}`}><Target size={18} /></button>
                      </div>
                      <div className="space-y-1 mt-auto">
                        <div className="flex justify-between items-center bg-black/50 px-2 py-1 rounded border border-zinc-800/50"><span className="text-[8px] text-blue-500 font-black">PRI</span><span className="text-[8px] text-zinc-400 font-bold uppercase">{weapon.requiredStats.primary}</span></div>
                        <div className="flex justify-between items-center bg-black/50 px-2 py-1 rounded border border-zinc-800/50"><span className="text-[8px] text-cyan-500 font-black">SEC</span><span className="text-[8px] text-zinc-400 font-bold uppercase">{weapon.requiredStats.secondary}</span></div>
                        <div className="flex justify-between items-center bg-black/50 px-2 py-1 rounded border border-zinc-800/50"><span className="text-[8px] text-purple-500 font-black">SKL</span><span className="text-[8px] text-zinc-400 font-bold uppercase">{weapon.requiredStats.skill}</span></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'databank' && (
          <div className="max-w-6xl mx-auto flex flex-col h-full space-y-8">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-4xl font-black mb-2 tracking-tighter uppercase font-mono text-zinc-100">Databank Registry</h2>
                <p className="text-zinc-500 font-medium text-sm">Hardware blueprint maintenance and local core backups.</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleExport} className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-black py-2.5 px-5 rounded-lg transition-all text-[10px] uppercase tracking-widest">
                  <Download size={14} />
                  Export JSON
                </button>
                <button onClick={handleImportClick} className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-black py-2.5 px-5 rounded-lg transition-all text-[10px] uppercase tracking-widest">
                  <Upload size={14} />
                  Import JSON
                </button>
                <button onClick={() => { setEditingWeaponId(null); setWeaponEdit(initialWeaponState); setShowWeaponModal(true); }} className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black py-2.5 px-5 rounded-lg transition-all shadow-xl shadow-indigo-500/20 text-[10px] uppercase tracking-widest">
                  <Plus size={16} />
                  Register New
                </button>
              </div>
            </header>

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex-1 flex flex-col">
              <div className="bg-zinc-900/50 border-b border-zinc-800 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Terminal size={18} className="text-amber-500" />
                  <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest">Core.System Blueprints</span>
                </div>
              </div>
              
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse font-mono">
                  <thead className="text-[10px] font-black text-zinc-600 uppercase bg-zinc-900/20 border-b border-zinc-800">
                    <tr>
                      <th className="p-4 border-r border-zinc-800/50">Hardware</th>
                      <th className="p-4 border-r border-zinc-800/50">Stars</th>
                      <th className="p-4 border-r border-zinc-800/50">Class</th>
                      <th className="p-4 border-r border-zinc-800/50">Stats (P / S / K)</th>
                      <th className="p-4 text-center">Protocol</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/30">
                    {weapons.map(w => (
                      <tr key={w.id} className="hover:bg-zinc-900/30 transition-colors group">
                        <td className="p-4 border-r border-zinc-800/50">
                          <div className="flex items-center gap-3">
                            <img src={w.imageUrl} className="w-8 h-8 object-cover rounded border border-zinc-700 bg-zinc-900" />
                            <span className="font-bold text-[11px] text-zinc-200 uppercase">{w.name}</span>
                          </div>
                        </td>
                        <td className="p-4 border-r border-zinc-800/50 text-[10px]">
                          <span className={`${w.rarity === '6-Star' ? 'text-red-500' : 'text-yellow-500'}`}>{w.rarity}</span>
                        </td>
                        <td className="p-4 border-r border-zinc-800/50 text-[10px] text-zinc-400 uppercase">{w.type}</td>
                        <td className="p-4 border-r border-zinc-800/50 text-[9px]">
                          <div className="flex gap-2">
                            <span className="text-blue-500">{w.requiredStats.primary}</span>
                            <span className="text-cyan-500">{w.requiredStats.secondary}</span>
                            <span className="text-purple-500">{w.requiredStats.skill}</span>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => handleEditWeapon(w)} className="p-2 text-zinc-700 hover:text-amber-500 transition-colors"><Edit3 size={14} /></button>
                            <button onClick={() => handleRemoveWeapon(w.id)} className="p-2 text-zinc-700 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Essence Modal (Simplified, No Levels) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="w-full max-w-2xl space-y-8 p-8 border border-zinc-800 bg-zinc-950 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <h3 className="text-lg font-bold uppercase text-white font-mono flex items-center gap-3"><Terminal size={20} className="text-amber-500" /> NEW EXTRACTION</h3>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-600 hover:text-white"><X size={24} /></button>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              {([
                { title: 'Primary', state: newEssence.primary, opts: PRIMARY_ATTRIBUTES, setter: (v: any) => setNewEssence(p => ({...p, primary: v})), c: 'text-blue-500' },
                { title: 'Secondary', state: newEssence.secondary, opts: SECONDARY_STATS, setter: (v: any) => setNewEssence(p => ({...p, secondary: v})), c: 'text-cyan-500' },
                { title: 'Skill', state: newEssence.skill, opts: SKILL_STATS, setter: (v: any) => setNewEssence(p => ({...p, skill: v})), c: 'text-purple-500' }
              ]).map(sec => (
                <div key={sec.title} className="space-y-3">
                  <h4 className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${sec.c}`}>
                    <Layers size={10} /> {sec.title} Archetype
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {sec.opts.map(opt => (
                      <button key={opt} onClick={() => sec.setter(opt)} className={`px-2.5 py-1.5 rounded border text-[9px] font-mono font-bold transition-all ${sec.state === opt ? 'bg-amber-500 text-black border-amber-500' : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}>{opt}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-zinc-800">
              <button onClick={handleAddInstance} className="w-full py-4 rounded-xl bg-amber-500 text-black font-black uppercase text-xs tracking-[0.2em] transition-all shadow-lg shadow-amber-500/10">Log Synthesis</button>
            </div>
          </div>
        </div>
      )}

      {/* Weapon Modal */}
      {showWeaponModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="w-full max-w-2xl space-y-6 p-8 border border-zinc-800 bg-zinc-950 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <h3 className="text-xl font-bold uppercase text-white font-mono flex items-center gap-3"><Database size={20} className="text-indigo-500" /> {editingWeaponId ? 'UPDATE REGISTRY' : 'REGISTRY ENTRY'}</h3>
              <button onClick={() => { setShowWeaponModal(false); setEditingWeaponId(null); setWeaponEdit(initialWeaponState); }} className="text-zinc-600 hover:text-white"><X size={24} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase font-mono tracking-widest">Hardware Unit Name</label>
                <input value={weaponEdit.name} onChange={e => setWeaponEdit(p => ({...p, name: e.target.value}))} className="w-full bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-all text-zinc-200" placeholder="e.g. Ancient Canal" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase font-mono tracking-widest">Stars (Rarity)</label>
                <select value={weaponEdit.rarity} onChange={e => setWeaponEdit(p => ({...p, rarity: e.target.value as any}))} className="w-full bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl text-sm appearance-none text-zinc-200">
                  <option value="6-Star">6-Star (Elite)</option>
                  <option value="5-Star">5-Star (Standard)</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase font-mono tracking-widest flex items-center gap-2"><ImageIcon size={10} /> Image Resource Endpoint</label>
                <input value={weaponEdit.imageUrl} onChange={e => setWeaponEdit(p => ({...p, imageUrl: e.target.value}))} className="w-full bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl text-[11px] focus:outline-none focus:border-indigo-500 transition-all font-mono text-indigo-400" placeholder="https://..." />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase font-mono tracking-widest">Required Primary</label>
                <select value={weaponEdit.requiredStats?.primary} onChange={e => setWeaponEdit(p => ({...p, requiredStats: {...p.requiredStats!, primary: e.target.value as any}}))} className="w-full bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl text-[11px] font-mono text-blue-400">
                  {PRIMARY_ATTRIBUTES.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase font-mono tracking-widest">Required Secondary</label>
                <select value={weaponEdit.requiredStats?.secondary} onChange={e => setWeaponEdit(p => ({...p, requiredStats: {...p.requiredStats!, secondary: e.target.value as any}}))} className="w-full bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl text-[11px] font-mono text-cyan-400">
                  {SECONDARY_STATS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase font-mono tracking-widest">Required Skill</label>
                <select value={weaponEdit.requiredStats?.skill} onChange={e => setWeaponEdit(p => ({...p, requiredStats: {...p.requiredStats!, skill: e.target.value as any}}))} className="w-full bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl text-[11px] font-mono text-purple-400">
                  {SKILL_STATS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase font-mono tracking-widest">Weapon Class</label>
                <select value={weaponEdit.type} onChange={e => setWeaponEdit(p => ({...p, type: e.target.value as any}))} className="w-full bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl text-sm text-zinc-200">
                  {WEAPON_CLASSES.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                </select>
              </div>
            </div>
            <div className="pt-6 border-t border-zinc-800">
              <button onClick={handleSaveWeapon} className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase text-xs tracking-[0.1em] transition-all shadow-lg shadow-indigo-600/10">
                {editingWeaponId ? 'Update Blueprint' : 'Register Blueprint'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
