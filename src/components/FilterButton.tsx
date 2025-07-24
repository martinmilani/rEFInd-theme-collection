import type { ReactNode } from "react";

type FilterButtonProps = {
  children: ReactNode;
  isActive?: boolean;
  onClick: () => void;
};

export default function FilterButton({
  children,
  isActive = false,
  onClick
}: FilterButtonProps) {
  const baseClasses =
    "mb-2 me-2 rounded-full border px-4 py-2 text-center text-sm font-medium focus:outline-none focus:ring-4 transition duration-200 ease-in-out";

  const activeClasses =
    "bg-blue-700 text-white border-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:border-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

  const inactiveClasses =
    "border-gray-300 text-gray-700 hover:bg-blue-800 hover:text-white focus:ring-blue-300 dark:border-gray-600 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800";

  return (
    <button
      type="button"
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
