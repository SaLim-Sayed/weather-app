export type City = {
    id: number;
    name: string;
    sys?: { country?: string };
    coord: { lat: number; lon: number };
  };