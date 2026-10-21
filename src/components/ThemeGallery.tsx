import NoDataIcon from "@src/icons/NoDataIcon";
import { trackEvent } from "@src/utils/analytics";
import type { Popularity } from "@src/utils/popularity";
import { resolveThemeImages } from "@src/utils/themeImages";
import { themeSlug } from "@src/utils/themeSlug";
import type { CollectionEntry } from "astro:content";
import { useEffect, useMemo, useRef, useState } from "react";
import Card from "./Card";
import FilterButton from "./FilterButton";
import SearchInput from "./SearchInput";

enum FilterType {
  NONE = "",
  ALL = "all",
  POPULAR = "popular",
  ONLY_WITH_IMAGES = "only_with_images",
  RECENTLY_ADDED = "recently_added",
  MINIMAL = "minimal",
  DARK = "dark"
}

const FILTERS = [
  { type: FilterType.ALL, label: "All" },
  { type: FilterType.POPULAR, label: "Popular" },
  { type: FilterType.RECENTLY_ADDED, label: "Recently Added" },
  { type: FilterType.MINIMAL, label: "Minimal" },
  { type: FilterType.DARK, label: "Dark" }
];

// Keyword filters match the theme's name and description
const KEYWORD_FILTERS: Partial<Record<FilterType, RegExp>> = {
  [FilterType.MINIMAL]: /minimal/i,
  [FilterType.DARK]: /\bdark/i
};

type Theme = CollectionEntry<"themes">;

export default function ThemeGallery({
  themes,
  popularity
}: {
  themes: Theme[];
  popularity: Popularity;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>(FilterType.ALL);
  const lastTrackedSearch = useRef("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length >= 3) {
      setActiveFilter(FilterType.NONE);
    } else if (query.trim() === "") {
      setActiveFilter(FilterType.ALL);
    }
  };

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setSearchQuery("");
    trackEvent("select_filter", { filter_name: filter });
  };

  const themesWithImages = useMemo(() => {
    return themes.map((theme) => ({
      ...theme,
      data: { ...theme.data, images: resolveThemeImages(theme) }
    }));
  }, [themes]);

  const popularIds = useMemo(
    () => new Set(popularity.popularIds),
    [popularity.popularIds]
  );

  const filteredThemes = useMemo(() => {
    const keyword = KEYWORD_FILTERS[activeFilter];

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
          (activeFilter === FilterType.POPULAR &&
            popularity.clicks[theme.id] > 0) ||
          (activeFilter === FilterType.RECENTLY_ADDED &&
            theme.data.recently_added) ||
          (activeFilter === FilterType.ONLY_WITH_IMAGES &&
            theme.data.images.length > 0) ||
          (keyword !== undefined &&
            keyword.test(`${theme.data.name} ${theme.data.description}`));

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        // Popular lists the most clicked themes first
        if (activeFilter === FilterType.POPULAR) {
          return popularity.clicks[b.id] - popularity.clicks[a.id];
        }

        // First sort by recently_added (true comes first)
        if (a.data.recently_added && !b.data.recently_added) return -1;
        if (!a.data.recently_added && b.data.recently_added) return 1;

        // If both have same recently_added status, sort by creation_date (newest first)
        return (
          new Date(b.data.creation_date).getTime() -
          new Date(a.data.creation_date).getTime()
        );
      });
  }, [themesWithImages, searchQuery, activeFilter, popularity.clicks]);

  // Report each submitted search once, with how many themes it found
  useEffect(() => {
    if (searchQuery.length < 3 || searchQuery === lastTrackedSearch.current) {
      return;
    }
    lastTrackedSearch.current = searchQuery;
    trackEvent("search", {
      search_term: searchQuery.trim().toLowerCase(),
      results_count: filteredThemes.length
    });
  }, [searchQuery, filteredThemes.length]);

  return (
    <div className="container mx-auto mb-12 px-4 lg:mb-24">
      <div className="mb-8">
        <SearchInput value={searchQuery} onSearch={handleSearch} />
        <div className="flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map(({ type, label }) => (
            <FilterButton
              key={type}
              isActive={activeFilter === type}
              onClick={() => handleFilterChange(type)}
            >
              {label}
            </FilterButton>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredThemes.length > 0 &&
          filteredThemes.map((theme) => (
            <Card
              id={theme.id}
              key={theme.id}
              slug={themeSlug(theme.data.link)}
              name={theme.data.name}
              description={theme.data.description}
              link={theme.data.link}
              user={theme.data.user}
              user_url={theme.data.user_url}
              images={theme.data.images}
              recently_added={theme.data.recently_added}
              popular={popularIds.has(theme.id)}
            />
          ))}
        {filteredThemes.length === 0 && (
          <div className="col-span-full mx-auto w-full max-w-2xl py-8">
            <NoDataIcon className="mx-auto size-64 opacity-10" />
            <p className="mt-4 text-center text-sm text-gray-500">
              No themes found
            </p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearch("")}
                className="mx-auto mt-2 block text-sm font-medium text-dracula-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-dracula-500 dark:text-dracula-400"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
