import { useState } from 'react';
import CityList from './components/CityList';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import StatusView from './components/StatusView';
import UnitToggle from './components/UnitToggle';
import { CITIES } from './data/cities';
import { useFavorites } from './hooks/useFavorites';
import { useWeather } from './hooks/useWeather';
import type { Unit } from './types';

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [unit, setUnit] = useState<Unit>('C');
  const { favorites, toggle } = useFavorites();

  const city = CITIES.find((c) => c.id === selectedId) ?? null;
  const { data, status, retry } = useWeather(city);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Thời tiết Việt Nam</h1>
        <UnitToggle unit={unit} onChange={setUnit} />
      </header>

      <div className="layout">
        <CityList
          cities={CITIES}
          selectedId={selectedId}
          favorites={favorites}
          onSelect={setSelectedId}
          onToggleFavorite={toggle}
        />

        <main>
          {status === 'success' && city && data ? (
            <>
              <CurrentWeather city={city} current={data.current} unit={unit} />
              <Forecast daily={data.daily} unit={unit} />
            </>
          ) : (
            <StatusView kind={status === 'success' ? 'loading' : status} onRetry={retry} />
          )}
        </main>
      </div>
    </div>
  );
}
