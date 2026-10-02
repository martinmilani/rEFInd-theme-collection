import { type ReactNode } from "react";

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
    "mb-2 me-2 rounded-full border px-4 py-2 text-center text-sm font-medium focus:outline-none focus-visible:ring-4 transition duration-200 ease-in-out";

  const activeClasses =
    "bg-dracula-600 text-white border-dracula-600 hover:bg-dracula-700 focus-visible:ring-dracula-200 dark:bg-dracula-600 dark:border-dracula-500 dark:hover:bg-dracula-700 dark:focus-visible:ring-dracula-800";

  const inactiveClasses =
    "border-gray-300 text-gray-700 hover:border-dracula-400 hover:text-dracula-600 focus-visible:ring-dracula-200 dark:border-gray-600 dark:text-gray-300 dark:hover:border-dracula-400 dark:hover:text-dracula-300 dark:focus-visible:ring-dracula-800";

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
