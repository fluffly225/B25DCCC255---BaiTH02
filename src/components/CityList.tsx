import { useMemo, useState } from 'react';
import type { City } from '../types';
import { removeDiacritics } from '../utils/format';

interface Props {
  cities: City[];
  selectedId: string | null;
  favorites: string[];
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function CityList({ cities, selectedId, favorites, onSelect, onToggleFavorite }: Props) {
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = removeDiacritics(query.trim());
    return cities
      .filter((c) => removeDiacritics(c.name).includes(q))
      .sort((a, b) => Number(favorites.includes(b.id)) - Number(favorites.includes(a.id)));
  }, [cities, query, favorites]);

  return (
    <aside className="city-list">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Tìm thành phố, không cần gõ dấu"
        aria-label="Tìm thành phố"
      />
      <ul>
        {visible.map((city) => {
          const isFav = favorites.includes(city.id);
          return (
            <li key={city.id}>
              <button
                type="button"
                className="city-btn"
                aria-pressed={city.id === selectedId}
                onClick={() => onSelect(city.id)}
              >
                {city.name}
              </button>
              <button
                type="button"
                className="fav-btn"
                aria-pressed={isFav}
                aria-label={isFav ? `Bỏ yêu thích ${city.name}` : `Yêu thích ${city.name}`}
                onClick={() => onToggleFavorite(city.id)}
              >
                {isFav ? '★' : '☆'}
              </button>
            </li>
          );
        })}
      </ul>
      {visible.length === 0 && <p className="muted">Không có thành phố nào khớp với "{query}".</p>}
    </aside>
  );
}
