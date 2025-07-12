'use client'
import React, { useState } from 'react'
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";

const SchoolSearch = ({
  schools,
  setFilter,
}: {
  schools: Set<string>;
  setFilter: (key: string, value: string) => void;
}) => {
  const [query, setQuery] = useState("");

  return (
    <Command className="rounded-md border border-solid shadow-md">
      <CommandInput placeholder="Search school..." onValueChange={setQuery} />
      {query.trim() !== "" && (
        <CommandList>
          <CommandEmpty>No schools found.</CommandEmpty>
          <CommandGroup>
            {Array.from(schools).map((school) => (
              <CommandItem
                key={school}
                value={school}
                onSelect={(value) => {
                  setFilter("schoolName", value);
                }}
              >
                {school}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
};

export default SchoolSearch