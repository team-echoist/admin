interface SortOption {
  value: string;
  label: string;
}

interface SortSelectProps {
  options: SortOption[];
  onChange: (value: string) => void;
  defaultValue?: string;
}

export default function SortSelect({
  options,
  onChange,
  defaultValue,
}: SortSelectProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="relative inline-block w-48">
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={handleChange}
        defaultValue={defaultValue}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
