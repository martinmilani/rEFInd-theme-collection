import NoDataIcon from "@src/icons/NoDataIcon";
import type { CollectionEntry } from "astro:content";
import { useMemo, useState } from "react";
import Card from "./Card";
import FilterButton from "./FilterButton";
import SearchInput from "./SearchInput";

enum FilterType {
  NONE = "",
  ALL = "all",
  ONLY_WITH_IMAGES = "only_with_images",
  RECENTLY_ADDED = "recently_added"
}

const images = import.meta.glob<{
  default: ImageMetadata;
}>("/src/assets/*.webp", { eager: true });

type Theme = CollectionEntry<"themes">;

export default function ThemeGallery({ themes }: { themes: Theme[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>(FilterType.ALL);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length >= 3) {
      setActiveFilter(FilterType.NONE);
    }
  };

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setSearchQuery("");
  };

  const themesWithImages = useMemo(() => {
    return themes.map((theme) => {
      const imagePaths = theme.data.images.map((image) => {
        return images[image]?.default.src;
      });
      return {
        ...theme,
        data: {
          ...theme.data,
          images: imagePaths.filter(Boolean) // Filter out undefined paths
        }
      };
    });
  }, [themes]);

  const filteredThemes = useMemo(() => {
    return themesWithImages
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
          activeFilter === FilterType.NONE ||
          activeFilter === FilterType.ALL ||
          (activeFilter === FilterType.RECENTLY_ADDED &&
            theme.data.recently_added) ||
          (activeFilter === FilterType.ONLY_WITH_IMAGES &&
            theme.data.images.length > 0);

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        // First sort by recently_added (true comes first)
        if (a.data.recently_added && !b.data.recently_added) return -1;
        if (!a.data.recently_added && b.data.recently_added) return 1;

        // If both have same recently_added status, sort by creation_date (newest first)
        return (
          new Date(b.data.creation_date).getTime() -
          new Date(a.data.creation_date).getTime()
        );
      });
  }, [themesWithImages, searchQuery, activeFilter]);

  return (
    <div className="container mx-auto mb-12 px-4 lg:mb-24">
      <div className="mb-8">
        <SearchInput value={searchQuery} onSearch={handleSearch} />
        <div className="flex flex-wrap items-center justify-center gap-2">
          <FilterButton
            isActive={activeFilter === FilterType.ALL}
            onClick={() => handleFilterChange(FilterType.ALL)}
          >
            All
          </FilterButton>
          <FilterButton
            isActive={activeFilter === FilterType.RECENTLY_ADDED}
            onClick={() => handleFilterChange(FilterType.RECENTLY_ADDED)}
          >
            Recently Added
          </FilterButton>
          <FilterButton
            isActive={activeFilter === FilterType.ONLY_WITH_IMAGES}
            onClick={() => handleFilterChange(FilterType.ONLY_WITH_IMAGES)}
          >
            Only With Images
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
              images={theme.data.images as unknown as string[]} // Cast to string array
              recently_added={theme.data.recently_added}
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
