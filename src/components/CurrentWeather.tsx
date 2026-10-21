import type { City, Unit, WeatherData } from '../types';
import { convertTemp, formatUpdatedAt } from '../utils/format';
import { getWeatherInfo } from '../utils/weatherCodes';

interface Props {
  city: City;
  current: WeatherData['current'];
  unit: Unit;
}

export default function CurrentWeather({ city, current, unit }: Props) {
  const info = getWeatherInfo(current.weather_code);

  return (
    <section className="current" data-theme={info.theme}>
      <div className="current-head">
        <h2>{city.name}</h2>
        <p>Cập nhật lúc {formatUpdatedAt(current.time)}</p>
      </div>

      <div className="current-main">
        <span className="current-icon" aria-hidden="true">
          {info.icon}
        </span>
        <div>
          <p className="current-temp">
            {convertTemp(current.temperature_2m, unit)}°{unit}
          </p>
          <p className="current-label">{info.label}</p>
        </div>
      </div>

      <dl className="current-stats">
        <div>
          <dt>Độ ẩm</dt>
          <dd>{current.relative_humidity_2m}%</dd>
        </div>
        <div>
          <dt>Tốc độ gió</dt>
          <dd>{current.wind_speed_10m} km/h</dd>
        </div>
      </dl>
    </section>
  );
}
