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
  const handleSingleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked, value } = event.target;
    onChange(checked ? value : defaultValue || "");
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="relative inline-block">
      {options.length === 1 ? (
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={options[0].value}
              onChange={handleSingleCheckboxChange}
              defaultChecked={defaultValue === options[0].value}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span>{options[0].label}</span>
          </label>
        </div>
      ) : (
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={handleSelectChange}
          defaultValue={defaultValue}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
