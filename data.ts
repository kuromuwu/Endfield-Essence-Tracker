
import { Weapon, PrimaryAttribute, SecondaryStat, SkillStat, WeaponClass } from './types';

export const PRIMARY_ATTRIBUTES: PrimaryAttribute[] = [
  'Agility', 'Strength', 'Will', 'Intellect', 'Main Attribute'
];

export const SECONDARY_STATS: SecondaryStat[] = [
  'Attack', 'Critical Rate', 'HP', 'Arts Intensity', 'Physical DMG', 
  'Ultimate Gain', 'Heat DMG', 'Arts DMG', 'Electric DMG', 'Cryo DMG', 
  'Treatment', 'Nature DMG'
];

export const SKILL_STATS: SkillStat[] = [
  'Assault', 'Suppression', 'Pursuit', 'Crusher', 'Inspiring', 'Combative',
  'Brutality', 'Fracture', 'Detonate', 'Twilight', 'Flow', 'Efficacy', 
  'Medicant', 'Infliction'
];

export const WEAPON_CLASSES: WeaponClass[] = [
  'Sword', 'Greatsword', 'Handcannon', 'Polearm', 'Arts Unit'
];

export const WEAPONS: Weapon[] = [
  { id: '1', name: 'Ancient Canal', rarity: '5-Star', type: 'Greatsword', imageUrl: 'https://placehold.co/400x400/18181b/eab308?text=Ancient+Canal', stats: { atk: 0 }, requiredStats: { primary: 'Strength', secondary: 'Arts Intensity', skill: 'Brutality' } },
  { id: '2', name: 'Artzy Tyrannical', rarity: '6-Star', type: 'Handcannon', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Artzy+Tyrannical', stats: { atk: 0 }, requiredStats: { primary: 'Intellect', secondary: 'Critical Rate', skill: 'Fracture' } },
  { id: '3', name: 'Aspirant', rarity: '5-Star', type: 'Sword', imageUrl: 'https://placehold.co/400x400/18181b/eab308?text=Aspirant', stats: { atk: 0 }, requiredStats: { primary: 'Agility', secondary: 'Physical DMG', skill: 'Twilight' } },
  { id: '4', name: 'Chimeric Justice', rarity: '5-Star', type: 'Polearm', imageUrl: 'https://placehold.co/400x400/18181b/eab308?text=Chimeric+Justice', stats: { atk: 0 }, requiredStats: { primary: 'Strength', secondary: 'Ultimate Gain', skill: 'Brutality' } },
  { id: '5', name: 'Chivalric Virtues', rarity: '6-Star', type: 'Arts Unit', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Chivalric+Virtues', stats: { atk: 0 }, requiredStats: { primary: 'Will', secondary: 'HP', skill: 'Medicant' } },
  { id: '6', name: 'Clannibal', rarity: '6-Star', type: 'Handcannon', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Clannibal', stats: { atk: 0 }, requiredStats: { primary: 'Main Attribute', secondary: 'Arts DMG', skill: 'Infliction' } },
  { id: '7', name: 'Cohesive Traction', rarity: '5-Star', type: 'Polearm', imageUrl: 'https://placehold.co/400x400/18181b/eab308?text=Cohesive+Traction', stats: { atk: 0 }, requiredStats: { primary: 'Will', secondary: 'Electric DMG', skill: 'Suppression' } },
  { id: '8', name: 'Delivery Guaranteed', rarity: '6-Star', type: 'Arts Unit', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Delivery+Guaranteed', stats: { atk: 0 }, requiredStats: { primary: 'Will', secondary: 'Ultimate Gain', skill: 'Pursuit' } },
  { id: '9', name: 'Detonation Unit', rarity: '6-Star', type: 'Arts Unit', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Detonation+Unit', stats: { atk: 0 }, requiredStats: { primary: 'Main Attribute', secondary: 'Arts Intensity', skill: 'Detonate' } },
  { id: '10', name: 'Dreams of the Starry Beach', rarity: '6-Star', type: 'Arts Unit', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Dreams+of+Starry+Beach', stats: { atk: 0 }, requiredStats: { primary: 'Intellect', secondary: 'Treatment', skill: 'Infliction' } },
  { id: '11', name: 'Eminent Repute', rarity: '6-Star', type: 'Sword', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Eminent+Repute', stats: { atk: 0 }, requiredStats: { primary: 'Main Attribute', secondary: 'Physical DMG', skill: 'Brutality' } },
  { id: '12', name: 'Exemplar', rarity: '6-Star', type: 'Greatsword', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Exemplar', stats: { atk: 0 }, requiredStats: { primary: 'Main Attribute', secondary: 'Attack', skill: 'Suppression' } },
  { id: '13', name: 'Finchaser 3.0', rarity: '5-Star', type: 'Sword', imageUrl: 'https://placehold.co/400x400/18181b/eab308?text=Finchaser+3.0', stats: { atk: 0 }, requiredStats: { primary: 'Strength', secondary: 'Cryo DMG', skill: 'Suppression' } },
  { id: '14', name: 'Finishing Call', rarity: '5-Star', type: 'Greatsword', imageUrl: 'https://placehold.co/400x400/18181b/eab308?text=Finishing+Call', stats: { atk: 0 }, requiredStats: { primary: 'Strength', secondary: 'HP', skill: 'Medicant' } },
  { id: '15', name: 'Forgeborn Scathe', rarity: '6-Star', type: 'Sword', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Forgeborn+Scathe', stats: { atk: 0 }, requiredStats: { primary: 'Intellect', secondary: 'Attack', skill: 'Twilight' } },
  { id: '16', name: 'Former Finery', rarity: '6-Star', type: 'Greatsword', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Former+Finery', stats: { atk: 0 }, requiredStats: { primary: 'Will', secondary: 'HP', skill: 'Efficacy' } },
  { id: '17', name: 'Fortmaker', rarity: '5-Star', type: 'Sword', imageUrl: 'https://placehold.co/400x400/18181b/eab308?text=Fortmaker', stats: { atk: 0 }, requiredStats: { primary: 'Intellect', secondary: 'Ultimate Gain', skill: 'Inspiring' } },
  { id: '18', name: 'Freedom to Proselytize', rarity: '5-Star', type: 'Arts Unit', imageUrl: 'https://placehold.co/400x400/18181b/eab308?text=Freedom+to+Proselytize', stats: { atk: 0 }, requiredStats: { primary: 'Will', secondary: 'Treatment', skill: 'Medicant' } },
  { id: '19', name: 'Grand Vision', rarity: '6-Star', type: 'Sword', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Grand+Vision', stats: { atk: 0 }, requiredStats: { primary: 'Agility', secondary: 'Attack', skill: 'Infliction' } },
  { id: '20', name: 'JET', rarity: '6-Star', type: 'Polearm', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=JET', stats: { atk: 0 }, requiredStats: { primary: 'Main Attribute', secondary: 'Attack', skill: 'Suppression' } },
  { id: '21', name: 'Khravengger', rarity: '6-Star', type: 'Greatsword', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Khravengger', stats: { atk: 0 }, requiredStats: { primary: 'Strength', secondary: 'Attack', skill: 'Detonate' } },
  { id: '22', name: 'Monaihe', rarity: '5-Star', type: 'Arts Unit', imageUrl: 'https://placehold.co/400x400/18181b/eab308?text=Monaihe', stats: { atk: 0 }, requiredStats: { primary: 'Will', secondary: 'Ultimate Gain', skill: 'Inspiring' } },
  { id: '23', name: 'Mountain Bearer', rarity: '6-Star', type: 'Polearm', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Mountain+Bearer', stats: { atk: 0 }, requiredStats: { primary: 'Agility', secondary: 'Physical DMG', skill: 'Efficacy' } },
  { id: '24', name: 'Navigator', rarity: '6-Star', type: 'Handcannon', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Navigator', stats: { atk: 0 }, requiredStats: { primary: 'Intellect', secondary: 'Cryo DMG', skill: 'Infliction' } },
  { id: '25', name: 'Never Rest', rarity: '6-Star', type: 'Sword', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Never+Rest', stats: { atk: 0 }, requiredStats: { primary: 'Will', secondary: 'Attack', skill: 'Flow' } },
  { id: '26', name: 'OBJ Arts Identifier', rarity: '5-Star', type: 'Arts Unit', imageUrl: 'https://placehold.co/400x400/18181b/eab308?text=Arts+Identifier', stats: { atk: 0 }, requiredStats: { primary: 'Intellect', secondary: 'Arts Intensity', skill: 'Pursuit' } },
  { id: '27', name: 'OBJ Edge of Lightness', rarity: '5-Star', type: 'Sword', imageUrl: 'https://placehold.co/400x400/18181b/eab308?text=Edge+of+Lightness', stats: { atk: 0 }, requiredStats: { primary: 'Agility', secondary: 'Attack', skill: 'Flow' } },
  { id: '28', name: 'OBJ Heavy Burden', rarity: '5-Star', type: 'Greatsword', imageUrl: 'https://placehold.co/400x400/18181b/eab308?text=Heavy+Burden', stats: { atk: 0 }, requiredStats: { primary: 'Strength', secondary: 'HP', skill: 'Efficacy' } },
  { id: '29', name: 'OBJ Razorhorn', rarity: '5-Star', type: 'Polearm', imageUrl: 'https://placehold.co/400x400/18181b/eab308?text=Razorhorn', stats: { atk: 0 }, requiredStats: { primary: 'Will', secondary: 'Physical DMG', skill: 'Infliction' } },
  { id: '30', name: 'OBJ Velocitous', rarity: '5-Star', type: 'Handcannon', imageUrl: 'https://placehold.co/400x400/18181b/eab308?text=Velocitous', stats: { atk: 0 }, requiredStats: { primary: 'Agility', secondary: 'Ultimate Gain', skill: 'Detonate' } },
  { id: '31', name: 'Oblivion', rarity: '6-Star', type: 'Arts Unit', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Oblivion', stats: { atk: 0 }, requiredStats: { primary: 'Intellect', secondary: 'Arts DMG', skill: 'Twilight' } },
  { id: '32', name: 'Opus: Etch Figure', rarity: '6-Star', type: 'Arts Unit', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Opus+Etch', stats: { atk: 0 }, requiredStats: { primary: 'Will', secondary: 'Nature DMG', skill: 'Suppression' } },
  { id: '33', name: 'Opus: The Living', rarity: '5-Star', type: 'Handcannon', imageUrl: 'https://placehold.co/400x400/18181b/eab308?text=Opus+The+Living', stats: { atk: 0 }, requiredStats: { primary: 'Agility', secondary: 'Arts DMG', skill: 'Infliction' } },
  { id: '34', name: 'Rapid Ascent', rarity: '6-Star', type: 'Sword', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Rapid+Ascent', stats: { atk: 0 }, requiredStats: { primary: 'Main Attribute', secondary: 'Critical Rate', skill: 'Twilight' } },
  { id: '35', name: 'Rational Farewell', rarity: '5-Star', type: 'Handcannon', imageUrl: 'https://placehold.co/400x400/18181b/eab308?text=Rational+Farewell', stats: { atk: 0 }, requiredStats: { primary: 'Strength', secondary: 'Heat DMG', skill: 'Pursuit' } },
  { id: '36', name: 'Seeker of Dark Lung', rarity: '5-Star', type: 'Greatsword', imageUrl: 'https://placehold.co/400x400/18181b/eab308?text=Seeker+Dark+Lung', stats: { atk: 0 }, requiredStats: { primary: 'Strength', secondary: 'Ultimate Gain', skill: 'Detonate' } },
  { id: '37', name: 'Stanza of Memorials', rarity: '5-Star', type: 'Arts Unit', imageUrl: 'https://placehold.co/400x400/18181b/eab308?text=Stanza+Memorials', stats: { atk: 0 }, requiredStats: { primary: 'Intellect', secondary: 'Attack', skill: 'Twilight' } },
  { id: '38', name: 'Sundered Prince', rarity: '6-Star', type: 'Greatsword', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Sundered+Prince', stats: { atk: 0 }, requiredStats: { primary: 'Strength', secondary: 'Critical Rate', skill: 'Crusher' } },
  { id: '39', name: 'Sundering Steel', rarity: '5-Star', type: 'Sword', imageUrl: 'https://placehold.co/400x400/18181b/eab308?text=Sundering+Steel', stats: { atk: 0 }, requiredStats: { primary: 'Agility', secondary: 'Physical DMG', skill: 'Combative' } },
  { id: '40', name: 'Thermite Cutter', rarity: '6-Star', type: 'Sword', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Thermite+Cutter', stats: { atk: 0 }, requiredStats: { primary: 'Will', secondary: 'Attack', skill: 'Flow' } },
  { id: '41', name: 'Thunderberge', rarity: '6-Star', type: 'Greatsword', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Thunderberge', stats: { atk: 0 }, requiredStats: { primary: 'Strength', secondary: 'HP', skill: 'Medicant' } },
  { id: '42', name: 'Twelve Questions', rarity: '5-Star', type: 'Sword', imageUrl: 'https://placehold.co/400x400/18181b/eab308?text=Twelve+Questions', stats: { atk: 0 }, requiredStats: { primary: 'Agility', secondary: 'Attack', skill: 'Infliction' } },
  { id: '43', name: 'Umbral Torch', rarity: '6-Star', type: 'Sword', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Umbral+Torch', stats: { atk: 0 }, requiredStats: { primary: 'Intellect', secondary: 'Heat DMG', skill: 'Infliction' } },
  { id: '44', name: 'Valiant', rarity: '6-Star', type: 'Polearm', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Valiant', stats: { atk: 0 }, requiredStats: { primary: 'Agility', secondary: 'Physical DMG', skill: 'Combative' } },
  { id: '45', name: 'Wedge', rarity: '6-Star', type: 'Handcannon', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=Wedge', stats: { atk: 0 }, requiredStats: { primary: 'Main Attribute', secondary: 'Critical Rate', skill: 'Infliction' } },
  { id: '46', name: 'White Night Nova', rarity: '6-Star', type: 'Sword', imageUrl: 'https://placehold.co/400x400/18181b/ef4444?text=White+Night+Nova', stats: { atk: 0 }, requiredStats: { primary: 'Main Attribute', secondary: 'Arts Intensity', skill: 'Infliction' } },
  { id: '47', name: 'Wild Wanderer', rarity: '5-Star', type: 'Arts Unit', imageUrl: 'https://placehold.co/400x400/18181b/eab308?text=Wild+Wanderer', stats: { atk: 0 }, requiredStats: { primary: 'Intellect', secondary: 'Electric DMG', skill: 'Infliction' } }
];
