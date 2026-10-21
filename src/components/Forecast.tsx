import type { Unit, WeatherData } from '../types';
import { convertTemp, dayMonthLabel, weekdayLabel } from '../utils/format';
import { getWeatherInfo } from '../utils/weatherCodes';

interface Props {
  daily: WeatherData['daily'];
  unit: Unit;
}

export default function Forecast({ daily, unit }: Props) {
  return (
    <section className="forecast">
      <h3>Dự báo 7 ngày</h3>
      <ol>
        {daily.time.map((date, i) => {
          const info = getWeatherInfo(daily.weather_code[i]);
          return (
            <li key={date} title={info.label}>
              <strong>{weekdayLabel(date)}</strong>
              <span className="muted">{dayMonthLabel(date)}</span>
              <span className="forecast-icon" aria-label={info.label}>
                {info.icon}
              </span>
              <span className="temp-max">{convertTemp(daily.temperature_2m_max[i], unit)}°</span>
              <span className="temp-min">{convertTemp(daily.temperature_2m_min[i], unit)}°</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
