import { useEffect, useState } from "react";

export default function SearchInput({
  value,
  onSearch
}: {
  value: string;
  onSearch: (query: string) => void;
}) {
  const [inputValue, setInputValue] = useState(value);

  // Update local state when value prop changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim().length >= 3 || inputValue.trim() === "") {
      onSearch(inputValue);
    }
  };

  return (
    <form className="mx-auto mb-8 max-w-lg" onSubmit={handleSubmit}>
      <div className="relative">
        <input
          type="search"
          id="default-search"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-4 ps-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Search Themes... (min 3 characters)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          minLength={3}
        />
        <button
          type="submit"
          className="absolute bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
}
