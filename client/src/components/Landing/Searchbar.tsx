"use client";
import { API_BASE_URL } from '@/api/config';
import { SearchIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Searchbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Debounce the search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Fetch data when debounced term changes
    useEffect(() => {
        if (!debouncedTerm) return;

        const fetchResults = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(debouncedTerm)}`);
                const data = await res.json();
                setResults(data);
            } catch (err) {
                console.error("Error fetching search results:", err);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [debouncedTerm]);

    return (
        <div className="relative flex items-center justify-center gap-2">
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-full border border-[#C7BAAF] bg-white p-2 px-4 md:p-4 md:px-8 shadow-md md:w-auto w-1/2"
            />
            <button className="cursor-pointer rounded-full bg-primary p-2 md:p-3">
                <SearchIcon color="white" strokeWidth={3} />
            </button>

            {/* Display results */}
            {debouncedTerm && (
                <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                    {loading ? (
                        <div className="p-4 text-center">Loading...</div>
                    ) : (
                            results.length > 0 ? (
                                results.map((result, index) => (
                                    <a key={index}  href={`/feedback/response/${result.id}`}>
                                        <div className="p-2 cursor-pointer hover:bg-gray-200 text-left">
                                            <div className="font-semibold">{result.details.schoolName || 'Untitled'}</div>
                                            <div className="text-sm text-gray-600">{result.comments || 'No comments available'}</div>
                                            <div className="text-xs text-gray-400">Submitted on {new Date(result.submittedAt).toLocaleDateString()}</div>
                                        </div>
                                    </a>
                                ))
                            ) : (
                                    <div className="p-4 text-center">No results found</div>
                                )
                        )}
                </div>
            )}
        </div>
    );
};

export default Searchbar;
