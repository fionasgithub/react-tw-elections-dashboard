interface YearSelectorProps {
  years: number[];
  selectedYear: number;
  onYearChange: (year: number) => void;
}

const YearSelector = ({ years, selectedYear, onYearChange }: YearSelectorProps) => {
  return (
    <div className="year-selector">
      {years.map(year => (
        <button
          key={year}
          className={`year-button ${selectedYear === year ? 'active' : ''}`}
          onClick={() => onYearChange(year)}
        >
          {year}
        </button>
      ))}
    </div>
  );
};

export default YearSelector;
