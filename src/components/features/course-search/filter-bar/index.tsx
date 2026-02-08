"use client";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import { useState } from "react";
import {
  useRefinementList,
  useRange,
  useSortBy,
  useClearRefinements,
  useCurrentRefinements,
} from "react-instantsearch";

const MEILI_INDEX = process.env.MEILI_INDEX || "";

const FilterSection = ({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="border-b border-gray-200 py-4">
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center justify-between w-full text-left"
    >
      <span className="font-semibold text-gray-900 text-sm">{title}</span>
      {isOpen ? (
        <ChevronUp size={16} className="text-gray-500" />
      ) : (
        <ChevronDown size={16} className="text-gray-500" />
      )}
    </button>
    {isOpen && <div className="mt-3">{children}</div>}
  </div>
);

const InstructorFilter = () => {
  const { items, refine } = useRefinementList({
    attribute: "instructor.name",
    limit: 10,
    sortBy: ["count:desc"],
  });

  return (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {items.map((item) => (
        <label
          key={item.value}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <input
            type="checkbox"
            checked={item.isRefined}
            onChange={() => refine(item.value)}
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">
            {item.label}
          </span>
          <span className="text-xs text-gray-400">({item.count})</span>
        </label>
      ))}
      {items.length === 0 && (
        <p className="text-xs text-gray-400">No instructors found</p>
      )}
    </div>
  );
};

const LevelFilter = () => {
  const { items, refine } = useRefinementList({
    attribute: "level",
    sortBy: ["name:asc"],
  });

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <label
          key={item.value}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <input
            type="checkbox"
            checked={item.isRefined}
            onChange={() => refine(item.value)}
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1 capitalize">
            {item.label.toLowerCase()}
          </span>
          <span className="text-xs text-gray-400">({item.count})</span>
        </label>
      ))}
      {items.length === 0 && (
        <p className="text-xs text-gray-400">No levels found</p>
      )}
    </div>
  );
};

const PriceRangeFilter = () => {
  const { start, range, refine } = useRange({ attribute: "price" });

  const min = range.min ?? 0;
  const max = range.max ?? 1000;
  const currentMin = start[0] !== -Infinity ? (start[0] ?? min) : min;
  const currentMax = start[1] !== Infinity ? (start[1] ?? max) : max;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1 block">Min ($)</label>
          <input
            type="number"
            value={currentMin}
            min={min}
            max={max}
            onChange={(e) => refine([Number(e.target.value), currentMax])}
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:border-purple-500 focus:outline-none"
          />
        </div>
        <span className="text-gray-400 mt-5">-</span>
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1 block">Max ($)</label>
          <input
            type="number"
            value={currentMax}
            min={min}
            max={max}
            onChange={(e) => refine([currentMin, Number(e.target.value)])}
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:border-purple-500 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => refine([undefined, undefined])}
          className="text-xs text-purple-600 hover:underline"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

const DomainFilter = () => {
  const { items, refine } = useRefinementList({
    attribute: "domains",
    limit: 10,
    sortBy: ["count:desc"],
  });

  return (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {items.map((item) => (
        <label
          key={item.value}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <input
            type="checkbox"
            checked={item.isRefined}
            onChange={() => refine(item.value)}
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1 capitalize">
            {item.label.toLowerCase().replace(/_/g, " ")}
          </span>
          <span className="text-xs text-gray-400">({item.count})</span>
        </label>
      ))}
      {items.length === 0 && (
        <p className="text-xs text-gray-400">No domains found</p>
      )}
    </div>
  );
};

const ActiveFilters = () => {
  const { items } = useCurrentRefinements();
  const { refine: clearAll } = useClearRefinements();

  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {items.map((item) =>
        item.refinements.map((refinement) => (
          <button
            key={`${item.attribute}-${refinement.label}`}
            type="button"
            onClick={() => item.refine(refinement)}
            className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium hover:bg-purple-200 transition-colors"
          >
            {refinement.label}
            <X size={12} />
          </button>
        )),
      )}
      <button
        type="button"
        onClick={clearAll}
        className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-700 underline"
      >
        Clear all
      </button>
    </div>
  );
};

const SortBySelect = () => {
  const { currentRefinement, options, refine } = useSortBy({
    items: [
      { label: "Most Relevant", value: MEILI_INDEX },
      { label: "Price: Low to High", value: `${MEILI_INDEX}:price:asc` },
      { label: "Price: High to Low", value: `${MEILI_INDEX}:price:desc` },
      { label: "Newest", value: `${MEILI_INDEX}:inserted_at:desc` },
    ],
  });

  return (
    <select
      value={currentRefinement}
      onChange={(e) => refine(e.target.value)}
      className="px-4 py-2 border border-gray-300 text-sm font-medium bg-white hover:border-gray-400 transition-colors cursor-pointer rounded"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export const FilterBar = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    instructor: true,
    level: true,
    price: true,
    domain: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-700" />
          <span className="font-semibold text-gray-900">Filters</span>
        </div>
      </div>

      <ActiveFilters />

      <div className="mb-4">
        <SortBySelect />
      </div>

      <FilterSection
        title="Instructor"
        isOpen={openSections.instructor}
        onToggle={() => toggleSection("instructor")}
      >
        <InstructorFilter />
      </FilterSection>

      <FilterSection
        title="Level"
        isOpen={openSections.level}
        onToggle={() => toggleSection("level")}
      >
        <LevelFilter />
      </FilterSection>

      <FilterSection
        title="Price Range"
        isOpen={openSections.price}
        onToggle={() => toggleSection("price")}
      >
        <PriceRangeFilter />
      </FilterSection>

      <FilterSection
        title="Domain"
        isOpen={openSections.domain}
        onToggle={() => toggleSection("domain")}
      >
        <DomainFilter />
      </FilterSection>
    </div>
  );
};
