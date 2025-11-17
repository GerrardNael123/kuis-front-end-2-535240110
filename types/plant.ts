export interface Plant {
  id: string;
  name: string;
  type: string;
  lastWatered: string;
  wateringSchedule: number;
  careNotes: string[];
}

// Perenual
export interface ApiPlant {
  id: number;
  common_name: string;
  scientific_name: string[];
  cycle: string;
  watering: string;
  sunlight: string[];
  default_image?: {
    thumbnail: string;
    regular_url: string;
  };
}

export type PlantFormData = Omit<Plant, 'id'>;