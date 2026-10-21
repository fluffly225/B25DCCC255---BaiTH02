import type { Unit } from '../types';

interface Props {
  unit: Unit;
  onChange: (unit: Unit) => void;
}

export default function UnitToggle({ unit, onChange }: Props) {
  return (
    <div className="unit-toggle" role="group" aria-label="Đơn vị nhiệt độ">
      {(['C', 'F'] as const).map((u) => (
        <button key={u} type="button" aria-pressed={unit === u} onClick={() => onChange(u)}>
          °{u}
        </button>
      ))}
    </div>
  );
}
