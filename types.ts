
export type PrimaryAttribute = 
  | 'Agility Boost' 
  | 'Strength Boost' 
  | 'Will Boost' 
  | 'Intellect Boost' 
  | 'Main Attribute Boost';

export type SecondaryStat = 
  | 'Attack Boost' 
  | 'HP Boost' 
  | 'Physical DMG Boost' 
  | 'Heat DMG Boost' 
  | 'Electric DMG Boost' 
  | 'Cryo DMG Boost' 
  | 'Nature DMG Boost' 
  | 'Critical Rate Boost' 
  | 'Arts Intensity Boost' 
  | 'Ultimate Gain Boost' 
  | 'Arts DMG Boost' 
  | 'Treatment Efficiency Boost';

export type SkillStat = 
  | 'Assault' 
  | 'Suppression' 
  | 'Pursuit' 
  | 'Crusher' 
  | 'Inspiring' 
  | 'Combative' 
  | 'Brutality' 
  | 'Infliction' 
  | 'Medicant' 
  | 'Fracture' 
  | 'Detonate' 
  | 'Twilight' 
  | 'Flow' 
  | 'Efficacy';

export interface EssenceStats {
  primary: PrimaryAttribute | null;
  secondary: SecondaryStat | null;
  skill: SkillStat | null;
}

export interface Essence extends EssenceStats {
  id: string;
  name?: string;
  dateAdded: number;
}

export interface Weapon {
  id: string;
  name: string;
  img: string;
  rarity: 4 | 5 | 6;
  type: string;
  requiredEssence: {
    primary: PrimaryAttribute;
    secondary: SecondaryStat;
    skill: SkillStat;
  };
}

export interface UserWeapon {
  id: string;
  weaponId: string;
  level?: number;
}
