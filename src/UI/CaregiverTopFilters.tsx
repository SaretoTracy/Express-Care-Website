// components/CaregiverTopFilters.tsx
import Dropdown from "./Dropdown";
import { useState } from "react";
import { Search } from "lucide-react";

export default function CaregiverTopFilters({ filters, setFilters, locations }) {

  return (
    <div className="w-full bg-[#4F6B7A] text-white py-6 px-6 rounded-b-3xl shadow-md">

      {/* ROW 1: BIG FILTER BAR */}
      <div className="flex flex-wrap gap-4 items-center justify-between">

        <Dropdown
          label="All Caregiving"
          items={[
            "Elderly care",
            "Child care",
            "Disability care",
            "Medical care",
            "Companion care",
          ]}
          selected={filters.careType}
          onSelect={(v) => setFilters({ ...filters, careType: v })}
        />

        <Dropdown
          label="All Locations"
          items={locations}
          selected={filters.location}
          onSelect={(v) => setFilters({ ...filters, location: v })}
        />

        <Dropdown
          label="All Levels"
          items={[
            "Entry level (0–1 yrs)",
            "Intermediate (2–5 yrs)",
            "Experienced (5+ yrs)",
          ]}
          selected={filters.level}
          onSelect={(v) => setFilters({ ...filters, level: v })}
        />

        {/* Price Range */}
        <div className="flex flex-col text-sm">
          <span className="font-medium">Price Range (hr)</span>
          <input
            type="range"
            min="10"
            max="100"
            value={filters.price}
            onChange={(e) => setFilters({ ...filters, price: e.target.value })}
            className="w-40"
          />
          <span>${filters.price}/hr</span>
        </div>

        {/* Search Box */}
        <div className="flex items-center bg-white rounded-xl px-3 py-2 text-gray-800 w-64 shadow-sm">
          <Search size={18} className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search jobs…"
            className="w-full outline-none bg-transparent"
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}
