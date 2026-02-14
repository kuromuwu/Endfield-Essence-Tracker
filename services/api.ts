
import { EssenceInstance, Weapon } from '../types';
import { WEAPONS as INITIAL_WEAPONS } from '../data';

const LATENCY = 300;

export interface AppBackup {
  instances: EssenceInstance[];
  weapons: Weapon[];
  targets: string[];
  version: string;
  timestamp: number;
}

export const api = {
  async getInstances(): Promise<EssenceInstance[]> {
    const data = localStorage.getItem('endfield_instances');
    return data ? JSON.parse(data) : [];
  },

  async saveInstances(instances: EssenceInstance[]): Promise<void> {
    localStorage.setItem('endfield_instances', JSON.stringify(instances));
  },

  async getTargets(): Promise<string[]> {
    const data = localStorage.getItem('endfield_targets');
    return data ? JSON.parse(data) : [];
  },

  async saveTargets(targets: string[]): Promise<void> {
    localStorage.setItem('endfield_targets', JSON.stringify(targets));
  },

  async getCatalogue(): Promise<{ weapons: Weapon[] }> {
    const storedWeapons = localStorage.getItem('endfield_catalogue_weapons');
    const weapons = storedWeapons ? JSON.parse(storedWeapons) : INITIAL_WEAPONS;
    return { weapons };
  },

  async saveCatalogue(weapons: Weapon[]): Promise<void> {
    localStorage.setItem('endfield_catalogue_weapons', JSON.stringify(weapons));
  },

  // Bulk Import/Export
  async exportData(): Promise<AppBackup> {
    const [instances, targets, catalogue] = await Promise.all([
      this.getInstances(),
      this.getTargets(),
      this.getCatalogue()
    ]);

    return {
      instances,
      weapons: catalogue.weapons,
      targets,
      version: "1.0.0",
      timestamp: Date.now()
    };
  },

  async importData(backup: AppBackup): Promise<void> {
    await Promise.all([
      this.saveInstances(backup.instances || []),
      this.saveCatalogue(backup.weapons || []),
      this.saveTargets(backup.targets || [])
    ]);
  }
};
