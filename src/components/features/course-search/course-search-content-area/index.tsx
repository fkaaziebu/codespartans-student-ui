"use client";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { InstantSearch, useSearchBox } from "react-instantsearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { CourseGrid } from "../course-grid";
import { FilterBar } from "../filter-bar";
import { Pagination } from "../pagination";
import { SearchHeader } from "../search-header";

const MEILI_INDEX = process.env.MEILI_INDEX || "";

const QuerySync = ({ query }: { query: string }) => {
  const { refine } = useSearchBox();

  useEffect(() => {
    refine(query);
  }, [query, refine]);

  return null;
};

const CourseSearchContentAreaInner = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const { searchClient } = instantMeiliSearch(
    process.env.MEILI_URL || "http://localhost:7700",
    process.env.MEILI_MASTER_KEY || "password",
    {
      finitePagination: true,
    },
  );

  return (
    <InstantSearch indexName={MEILI_INDEX} searchClient={searchClient}>
      <QuerySync query={query} />
      <div className="min-h-screen bg-gray-50">
        <div className="px-2 sm:px-10 lg:px-20 xl:px-35 py-8">
          <SearchHeader />
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-64 flex-shrink-0">
              <FilterBar />
            </aside>
            <main className="flex-1 min-w-0">
              <CourseGrid />
              <Pagination />
            </main>
          </div>
        </div>
      </div>
    </InstantSearch>
  );
};

export const CourseSearchContentArea = () => {
  return (
    <Suspense>
      <CourseSearchContentAreaInner />
    </Suspense>
  );
};
