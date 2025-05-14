'use client'

import { CountryDropdown } from '@/components/Review/FeedbackForm';
import { FilterIcon, AppleIcon, FilterXIcon } from "lucide-react";
import React, { useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import SchoolSearch from './schoolSearch';
import { Button } from '@/components/ui/button';


export const ClearFilters = ({ clearFilters }: { clearFilters: () => void }) => {
  return (
    <Button
      className="!flex gap-2"
      variant={"secondary"}
      onClick={() => {
        clearFilters();
      }}
    >
      ClearFilters <FilterXIcon />
    </Button>
  );
};

const FilterBar = ({
  setFilter,
  schools,
  clearFilters,
}: {
  setFilter: (key: string, value: string) => void;
  schools: Set<string>;
  clearFilters: () => void;
}) => {
  const [country, setCountry] = useState("");
  const [_school, setSchool] = useState("");

  return (
    <div className="w-full h-max bg-background border rounded-md flex flex-col gap-4 p-4 shadow-md">
      <div className="font-semibold flex gap-2">
        <FilterIcon />
        Filters
        <ClearFilters
          clearFilters={() => {
            clearFilters();
            setSchool("");
            setCountry("");
          }}
        />
      </div>

      <div className="font-semibold flex flex-col gap-2">
        Filter by Country
        <CountryDropdown
          value={country}
          onChange={(country) => {
            setFilter("schoolCountry", country);
            setCountry(country);
          }}
        />
      </div>

      <div className="font-semibold flex flex-col gap-2">
        Filter by Rating
        <ToggleGroup
          type="single"
          onValueChange={(value) => {
            if (value) setFilter("rating", value);
          }}
          className="h-auto flex flex-wrap gap-2"
        >
          <ToggleGroupItem value="10">
            10 <AppleIcon fill="red" stroke="red" />
          </ToggleGroupItem>
          <ToggleGroupItem value="9">
            9 <AppleIcon fill="red" stroke="red" />
          </ToggleGroupItem>
          <ToggleGroupItem value="8">
            8 <AppleIcon fill="red" stroke="red" />
          </ToggleGroupItem>
          <ToggleGroupItem value="7">
            7 <AppleIcon fill="red" stroke="red" />
          </ToggleGroupItem>
          <ToggleGroupItem value="6">
            6 <AppleIcon fill="red" stroke="red" />
          </ToggleGroupItem>
          <ToggleGroupItem value="5">
            5 <AppleIcon fill="red" stroke="red" />
          </ToggleGroupItem>
          <ToggleGroupItem value="4">
            4 <AppleIcon fill="red" stroke="red" />
          </ToggleGroupItem>
          <ToggleGroupItem value="3">
            3 <AppleIcon fill="red" stroke="red" />
          </ToggleGroupItem>
          <ToggleGroupItem value="2">
            2 <AppleIcon fill="red" stroke="red" />
          </ToggleGroupItem>
          <ToggleGroupItem value="1">
            1 <AppleIcon fill="red" stroke="red" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="font-semibold flex flex-col gap-2">
        Filter by School
        <SchoolSearch schools={schools} setFilter={setFilter} />
      </div>
    </div>
  );
};
export default FilterBar