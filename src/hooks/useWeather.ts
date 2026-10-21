import { useCallback, useEffect, useRef, useState } from 'react';
import type { City, Status, WeatherData } from '../types';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

function buildUrl({ lat, lon }: City): string {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'Asia/Ho_Chi_Minh',
    forecast_days: '7',
  });
  return `${BASE_URL}?${params}`;
}

/**
 * Tải thời tiết của thành phố đang chọn.
 * Kết quả được lưu tạm theo thành phố; đổi °C/°F không đi qua hook này nên không gọi lại API.
 */
export function useWeather(city: City | null) {
  const cache = useRef(new Map<string, WeatherData>());
  const [data, setData] = useState<WeatherData | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!city) {
      setData(null);
      setStatus('idle');
      return;
    }

    const cached = cache.current.get(city.id);
    if (cached) {
      setData(cached);
      setStatus('success');
      return;
    }

    const controller = new AbortController();
    setStatus('loading');

    fetch(buildUrl(city), { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<WeatherData>;
      })
      .then((json) => {
        if (!json.current || !json.daily) throw new Error('Dữ liệu không hợp lệ');
        cache.current.set(city.id, json);
        setData(json);
        setStatus('success');
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setStatus('error');
      });

    return () => controller.abort();
  }, [city, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { data, status, retry };
}
