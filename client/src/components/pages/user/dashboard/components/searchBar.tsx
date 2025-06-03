'use client'
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import React, { useState } from 'react'

const SearchBar = ({ search }: { search?: (term: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <form
      className="w-full flex gap-2 p-4 border-[1px] rounded-md"
      onSubmit={(e) => {
        e.preventDefault();
        search&&search(searchTerm);
      }}
    >
      <Input
        type="text"
        placeholder="Search for reviews"
        className="rounded-full py-3 text-base h-12 px-4"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="bg-primary rounded-full p-2 w-12 h-12 flex items-center cursor-pointer justify-center"
        type="submit"
      >
        <SearchIcon stroke="white" />
      </button>
    </form>
  );
};

export default SearchBar;