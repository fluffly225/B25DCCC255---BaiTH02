export interface City {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

export type Unit = 'C' | 'F';

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface WeatherData {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}
