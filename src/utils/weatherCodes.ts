export type Theme = 'sunny' | 'cloudy' | 'rainy' | 'storm' | 'fog' | 'snow';

export interface WeatherInfo {
  icon: string;
  label: string;
  theme: Theme;
}

const UNKNOWN: WeatherInfo = { icon: '❓', label: 'Không xác định', theme: 'cloudy' };

/** Bảng mã thời tiết WMO của Open-Meteo. */
const TABLE: Record<number, WeatherInfo> = {
  0: { icon: '☀️', label: 'Trời quang', theme: 'sunny' },
  1: { icon: '🌤️', label: 'Ít mây', theme: 'sunny' },
  2: { icon: '⛅', label: 'Có mây rải rác', theme: 'cloudy' },
  3: { icon: '☁️', label: 'Nhiều mây', theme: 'cloudy' },
  45: { icon: '🌫️', label: 'Sương mù', theme: 'fog' },
  48: { icon: '🌫️', label: 'Sương mù đóng băng', theme: 'fog' },
  51: { icon: '🌦️', label: 'Mưa phùn nhẹ', theme: 'rainy' },
  53: { icon: '🌦️', label: 'Mưa phùn', theme: 'rainy' },
  55: { icon: '🌦️', label: 'Mưa phùn dày', theme: 'rainy' },
  56: { icon: '🌧️', label: 'Mưa phùn lạnh', theme: 'rainy' },
  57: { icon: '🌧️', label: 'Mưa phùn lạnh dày', theme: 'rainy' },
  61: { icon: '🌧️', label: 'Mưa nhỏ', theme: 'rainy' },
  63: { icon: '🌧️', label: 'Mưa vừa', theme: 'rainy' },
  65: { icon: '🌧️', label: 'Mưa to', theme: 'rainy' },
  66: { icon: '🌧️', label: 'Mưa lạnh nhẹ', theme: 'rainy' },
  67: { icon: '🌧️', label: 'Mưa lạnh to', theme: 'rainy' },
  71: { icon: '🌨️', label: 'Tuyết nhẹ', theme: 'snow' },
  73: { icon: '🌨️', label: 'Tuyết vừa', theme: 'snow' },
  75: { icon: '❄️', label: 'Tuyết dày', theme: 'snow' },
  77: { icon: '❄️', label: 'Hạt tuyết', theme: 'snow' },
  80: { icon: '🌦️', label: 'Mưa rào nhẹ', theme: 'rainy' },
  81: { icon: '🌧️', label: 'Mưa rào', theme: 'rainy' },
  82: { icon: '🌧️', label: 'Mưa rào lớn', theme: 'rainy' },
  85: { icon: '🌨️', label: 'Tuyết rào nhẹ', theme: 'snow' },
  86: { icon: '🌨️', label: 'Tuyết rào nặng', theme: 'snow' },
  95: { icon: '⛈️', label: 'Dông', theme: 'storm' },
  96: { icon: '⛈️', label: 'Dông kèm mưa đá nhẹ', theme: 'storm' },
  99: { icon: '⛈️', label: 'Dông kèm mưa đá lớn', theme: 'storm' },
};

export function getWeatherInfo(code: number): WeatherInfo {
  return TABLE[code] ?? UNKNOWN;
}
