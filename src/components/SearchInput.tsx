import CloseIcon from "@src/icons/CloseIcon";
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

  const handleClear = () => {
    setInputValue("");
    onSearch("");
  };

  return (
    <form className="mx-auto mb-8 max-w-lg" onSubmit={handleSubmit}>
      <div className="relative">
        <input
          type="search"
          id="default-search"
          className="block w-full rounded-lg border border-gray-300 bg-transparent py-4 pe-32 ps-4 text-sm text-gray-900 focus:border-dracula-500 focus:ring-dracula-500 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-dracula-400 dark:focus:ring-dracula-400 [&::-webkit-search-cancel-button]:appearance-none"
          placeholder="Search Themes... (min 3 characters)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          minLength={3}
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute end-24 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-dracula-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <CloseIcon className="size-4" />
          </button>
        )}
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
