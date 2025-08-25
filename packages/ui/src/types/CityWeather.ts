export type City = {
    id: number;
    name: string;
    sys?: { country?: string };
    coord: { lat: number; lon: number };
    main?: { temp: number };
    weather?: { icon: string; description: string }[];
  };
  
  export type CityWeatherProps = {
    city: City;
  };
  