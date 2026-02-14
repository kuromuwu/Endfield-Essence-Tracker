
import { Weapon, PrimaryAttribute, SecondaryStat, SkillStat } from './types';

export const PRIMARY_ATTRIBUTES: PrimaryAttribute[] = [
  'Agility Boost', 'Strength Boost', 'Will Boost', 'Intellect Boost', 'Main Attribute Boost'
];

export const SECONDARY_STATS: SecondaryStat[] = [
  'Attack Boost', 'HP Boost', 'Physical DMG Boost', 'Heat DMG Boost', 
  'Electric DMG Boost', 'Cryo DMG Boost', 'Nature DMG Boost', 'Critical Rate Boost', 
  'Arts Intensity Boost', 'Ultimate Gain Boost', 'Arts DMG Boost', 'Treatment Efficiency Boost'
];

export const SKILL_STATS: SkillStat[] = [
  'Assault', 'Suppression', 'Pursuit', 'Crusher', 'Inspiring', 
  'Combative', 'Brutality', 'Infliction', 'Medicant', 'Fracture', 
  'Detonate', 'Twilight', 'Flow', 'Efficacy'
];

export const WEAPONS: Weapon[] = [
  {
    id: 'w1',
    name: 'Thunderberge',
    img: 'https://picsum.photos/seed/thunderberge/200/200',
    rarity: 6,
    type: 'Heavy Blade',
    requiredEssence: {
      primary: 'Strength Boost',
      secondary: 'HP Boost',
      skill: 'Medicant'
    }
  },
  {
    id: 'w2',
    name: 'Delivery Guaranteed',
    img: 'https://picsum.photos/seed/delivery/200/200',
    rarity: 6,
    type: 'Launcher',
    requiredEssence: {
      primary: 'Will Boost',
      secondary: 'Ultimate Gain Boost',
      skill: 'Pursuit'
    }
  },
  {
    id: 'w3',
    name: 'Monaihe',
    img: 'https://picsum.photos/seed/monaihe/200/200',
    rarity: 5,
    type: 'Sword',
    requiredEssence: {
      primary: 'Will Boost',
      secondary: 'Ultimate Gain Boost',
      skill: 'Inspiring'
    }
  },
  {
    id: 'w4',
    name: 'Chivalric Virtues',
    img: 'https://picsum.photos/seed/virtues/200/200',
    rarity: 6,
    type: 'Spear',
    requiredEssence: {
      primary: 'Will Boost',
      secondary: 'HP Boost',
      skill: 'Medicant'
    }
  },
  {
    id: 'w5',
    name: 'Former Finery',
    img: 'https://picsum.photos/seed/finery/200/200',
    rarity: 6,
    type: 'Greatsword',
    requiredEssence: {
      primary: 'Will Boost',
      secondary: 'HP Boost',
      skill: 'Efficacy'
    }
  },
  {
    id: 'w6',
    name: 'Never Rest',
    img: 'https://picsum.photos/seed/rest/200/200',
    rarity: 6,
    type: 'Blade',
    requiredEssence: {
      primary: 'Will Boost',
      secondary: 'Attack Boost',
      skill: 'Flow'
    }
  },
  {
    id: 'w7',
    name: 'Astral Whisper',
    img: 'https://picsum.photos/seed/astral/200/200',
    rarity: 4,
    type: 'Staff',
    requiredEssence: {
      primary: 'Intellect Boost',
      secondary: 'Arts Intensity Boost',
      skill: 'Inspiring'
    }
  }
];
