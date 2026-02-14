
export type Rarity = '6-Star' | '5-Star' | 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';

export type PrimaryAttribute = 
  | 'Agility' | 'Strength' | 'Will' 
  | 'Intellect' | 'Main Attribute';

export type SecondaryStat = 
  | 'Attack' | 'Critical Rate' | 'HP' 
  | 'Arts Intensity' | 'Physical DMG' | 'Ultimate Gain' 
  | 'Heat DMG' | 'Arts DMG' | 'Electric DMG' 
  | 'Cryo DMG' | 'Treatment' | 'Nature DMG';

export type SkillStat = 
  | 'Assault' | 'Suppression' | 'Pursuit' | 'Crusher' | 'Inspiring' 
  | 'Combative' | 'Brutality' | 'Fracture' | 'Detonate' | 'Twilight' 
  | 'Flow' | 'Efficacy' | 'Medicant' | 'Infliction';

export type WeaponClass = 'Sword' | 'Greatsword' | 'Handcannon' | 'Polearm' | 'Arts Unit';

export interface EssenceInstance {
  id: string;
  primary: PrimaryAttribute;
  secondary: SecondaryStat;
  skill: SkillStat;
  quantity: number;
  timestamp: number;
}

export interface Weapon {
  id: string;
  name: string;
  rarity: '6-Star' | '5-Star';
  type: WeaponClass;
  imageUrl: string;
  stats: {
    atk: number;
    special?: string;
  };
  requiredStats: {
    primary: PrimaryAttribute;
    secondary: SecondaryStat;
    skill: SkillStat;
  };
}

export interface UserPreferences {
  targetWeaponIds: string[];
}
