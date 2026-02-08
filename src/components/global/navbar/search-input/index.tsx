"use client";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { InstantSearch, useSearchBox, useHits } from "react-instantsearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const MEILI_INDEX = process.env.MEILI_INDEX || "";

export const SearchInput = () => {
  return (
    <Suspense>
      <MeilisearchInputWithSearchParams />
    </Suspense>
  );
};

const MeilisearchInputWithSearchParams = () => {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  const { searchClient } = instantMeiliSearch(
    process.env.MEILI_URL || "http://localhost:7700",
    process.env.MEILI_MASTER_KEY || "password",
  );

  return (
    <InstantSearch
      indexName={MEILI_INDEX}
      searchClient={searchClient}
      initialUiState={{
        [MEILI_INDEX]: {
          query: queryParam,
        },
      }}
      key={queryParam}
    >
      <MeilisearchCustomSearchUI />
    </InstantSearch>
  );
};

const MeilisearchCustomSearchUI = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { query, refine, clear } = useSearchBox();
  const { hits } = useHits();

  // Extract unique suggestion terms from hit titles
  const suggestions = Array.from(
    new Set(
      hits
        .map(
          (hit) =>
            ((hit as Record<string, unknown>).title as string) ??
            ((hit as Record<string, unknown>).description as string),
        )
        .filter(Boolean),
    ),
  ).slice(0, 5);

  const handleClear = () => {
    clear();
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  const handleChange = (value: string) => {
    refine(value);
    if (value.trim()) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  return (
    <div className="relative w-full">
      <div
        className={`flex items-center gap-2 px-3 border transition-all duration-200 ${
          isFocused
            ? "border-purple-700 bg-purple-50 shadow-md"
            : "border-gray-200 bg-white hover:border-gray-300"
        }`}
      >
        <Search
          size={18}
          className={`transition-colors flex-shrink-0 ${
            isFocused ? "text-purple-600" : "text-gray-400"
          }`}
        />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && query.trim()) {
              setShowDropdown(false);
              router.push(`/courses/search?q=${query}`);
            }
          }}
          onFocus={() => {
            setIsFocused(true);
            if (query.trim()) {
              setShowDropdown(true);
            }
          }}
          onBlur={() => {
            setIsFocused(false);
            setTimeout(() => setShowDropdown(false), 200);
          }}
          placeholder="Search courses..."
          className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 focus-visible:outline-none px-0 text-sm"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 hover:bg-gray-200 rounded-md transition-colors flex-shrink-0"
            aria-label="Clear search"
          >
            <X
              size={16}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border-[0.5px] border-purple-200 shadow-lg z-50 max-h-96 overflow-y-auto">
          {suggestions.length > 0 ? (
            <ul className="py-2">
              {suggestions.map((suggestion) => (
                <li key={suggestion}>
                  <button
                    type="button"
                    onClick={() =>
                      router.push(`/courses/search?q=${suggestion}`)
                    }
                    onMouseDown={(e) => e.preventDefault()}
                    className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex justify-between items-center w-full">
                      <p className="font-medium text-gray-900 text-sm">
                        {suggestion}
                      </p>
                      <Search
                        size={14}
                        className="transition-colors flex-shrink-0 text-gray-400"
                      />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-gray-500 text-sm">No courses found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
