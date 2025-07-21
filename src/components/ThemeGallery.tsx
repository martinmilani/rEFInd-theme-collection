import NoDataIcon from "@src/icons/NoDataIcon";
import type { CollectionEntry } from "astro:content";
import { useState } from "react";
import Card from "./Card";
import FilterButton from "./FilterButton";
import SearchInput from "./SearchInput";

type FilterType = "" | "all" | "new" | "multiple";

type Theme = CollectionEntry<"themes">;

export default function ThemeGallery({ themes }: { themes: Theme[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length >= 3) {
      setActiveFilter("");
    }
  };

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setSearchQuery("");
  };

  const filteredThemes = themes
    .filter((theme) => {
      // Apply search filter if query is 3+ characters
      const matchesSearch =
        searchQuery.length < 3 ||
        theme.data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.data.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        theme.data.user.toLowerCase().includes(searchQuery.toLowerCase());

      // Apply category filter
      const matchesFilter =
        activeFilter === "" ||
        activeFilter === "all" ||
        (activeFilter === "new" && theme.data.isNew) ||
        (activeFilter === "multiple" && theme.data.multipleThemes);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      // First sort by isNew (true comes first)
      if (a.data.isNew && !b.data.isNew) return -1;
      if (!a.data.isNew && b.data.isNew) return 1;

      // If both have same isNew status, sort by creation_date (newest first)
      return (
        new Date(b.data.creation_date).getTime() -
        new Date(a.data.creation_date).getTime()
      );
    });

  return (
    <div className="container mx-auto mb-12 px-4 lg:mb-24">
      <div className="mb-8">
        <SearchInput value={searchQuery} onSearch={handleSearch} />
        <div className="flex flex-wrap items-center justify-center gap-2">
          <FilterButton
            isActive={activeFilter === "all"}
            onClick={() => handleFilterChange("all")}
          >
            All
          </FilterButton>
          <FilterButton
            isActive={activeFilter === "new"}
            onClick={() => handleFilterChange("new")}
          >
            New
          </FilterButton>
          <FilterButton
            isActive={activeFilter === "multiple"}
            onClick={() => handleFilterChange("multiple")}
          >
            Multiple Themes
          </FilterButton>
        </div>
      </div>

      <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredThemes.length > 0 &&
          filteredThemes.map((theme) => (
            <Card
              id={theme.id}
              key={theme.id}
              name={theme.data.name}
              description={theme.data.description}
              link={theme.data.link}
              user={theme.data.user}
              user_url={theme.data.user_url}
              images={theme.data.images}
              multipleThemes={theme.data.multipleThemes}
              isNew={theme.data.isNew}
            />
          ))}
        {filteredThemes.length === 0 && (
          <div className="col-span-full mx-auto w-full max-w-2xl py-8">
            <NoDataIcon className="mx-auto size-64 opacity-10" />
            <p className="mt-4 text-center text-sm text-gray-500">
              No themes found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
