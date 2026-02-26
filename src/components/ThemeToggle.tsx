import { useTheme } from '../context/ThemeContext';
import type { ThemePreference } from '../context/ThemeContext';

const options: { value: ThemePreference; label: string }[] = [
  { value: 'system', label: '系統' },
  { value: 'light', label: '淺色' },
  { value: 'dark', label: '深色' },
];

const ThemeToggle = () => {
  const { preference, setPreference } = useTheme();

  return (
    <div className="theme-toggle" role="group" aria-label="顯示模式">
      {options.map(opt => (
        <button
          key={opt.value}
          className={`theme-toggle-btn${preference === opt.value ? ' active' : ''}`}
          onClick={() => setPreference(opt.value)}
          aria-pressed={preference === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
