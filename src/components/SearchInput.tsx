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
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-4 ps-4 text-sm text-gray-900 focus:border-dracula-500 focus:ring-dracula-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-dracula-400 dark:focus:ring-dracula-400"
          placeholder="Search Themes... (min 3 characters)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          minLength={3}
        />
        <button
          type="submit"
          className="absolute bottom-2.5 end-2.5 rounded-lg bg-dracula-600 px-4 py-2 text-sm font-medium text-white hover:bg-dracula-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-dracula-200 dark:focus-visible:ring-dracula-800"
        >
          Search
        </button>
      </div>
    </form>
  );
}
