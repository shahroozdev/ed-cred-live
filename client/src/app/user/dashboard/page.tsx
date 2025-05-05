"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Landing/Navbar";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/types/user";
import Image from "next/image";
import { FilterIcon, SearchIcon, TimerIcon, FilterXIcon, AppleIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CountryDropdown } from "@/components/Review/FeedbackForm";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandInput,
    CommandItem,
    CommandList,
    CommandEmpty,
    CommandGroup
} from "@/components/ui/command";
import { getRequest } from "@/api/config";
import { ReviewCard } from "@/components/Common/ReviewCard";

const UserDashboardPage = () => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [filteredReviews, setFilteredReviews] = useState<any[]>([]);

    useEffect(() => {
        const setup = async () => {
            const res = await getRequest("/feedback-form/groups");
            if (!res) return;
            const reviews = await res.json();

            const filteredReviews: any[] = [];
            reviews.forEach((review: any) => {
                let totalRating = 0;
                let totalResponses = 0;
                review.responses.forEach((response: any) => response.answers.forEach((answer: any) => {
                    if (Number.isInteger(answer.answer)) {
                        totalRating += answer.answer;
                        totalResponses += 1;
                    }
                }));
                const averageRating = totalRating/totalResponses;
                review.responses.length > 0 && filteredReviews.push({...review.responses[0], totalReviews: review.responses.length, rating: averageRating});
            });

            setReviews(filteredReviews);
            groupReviews(filteredReviews);
        }

        setup();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 6;

    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const currentReviews = filteredReviews.slice(startIndex, startIndex + reviewsPerPage);

    const groupReviews = (reviews: any[]) => {
        // const filteredReviews = [];
        // reviews.forEach(review => {
        //     filteredReviews.push(review);
        // });
        setFilteredReviews(reviews);
    }

    const [filters, setFilters] = useState<{ [key: string]: string }>({});
    const setFilter = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        applyFilters(newFilters);
    };

    const applyFilters = (activeFilters: { [key: string]: string }) => {
        let filteredResponses: any[] = [];

        reviews.forEach(response => {
                let matchesAll = true;

                for (const [key, value] of Object.entries(activeFilters)) {
                if (key === 'rating') {
                    if (Number.isNaN(response.rating) || response.rating.toFixed(0) < parseFloat(value)) {
                        matchesAll = false;
                        break;
                    }
                }
                else if (key == 'category') {
                    const match = response.feedbackForm.category.id == value;
                    if (!match) {
                        matchesAll = false;
                        break;
                    }
                } else {
                    const match = Object.entries(response.details).some(
                        ([detailKey, detailValue]) =>
                            // @ts-ignore
                            detailKey === key && detailValue.toLowerCase().includes(value.toLowerCase())
                    );
                    if (!match) {
                        matchesAll = false;
                        break;
                    }
                }
                }

                if (matchesAll) {
                    filteredResponses.push(response);
                }
        });

        groupReviews(filteredResponses);
    };

    const search = (term: string) => {
        let filteredReviews: any[] = [];
        reviews.forEach(response => {
            Object.values(response.details).forEach(detail => {
                if (typeof detail === 'string' && detail.toLowerCase().includes(term.toLowerCase())) {
                    if (!filteredReviews.includes(response)) filteredReviews.push(response);
                }
            })
        });
        groupReviews(filteredReviews);
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-cetner justify-between py-10">
            <Navbar/>
            <div className="grid grid-cols-4 px-40 gap-10 mt-20">
                <div className="flex flex-col col-span-1">
                    <FilterBar setFilter={setFilter}
                        clearFilters={() => {
                            setFilters({});
                            applyFilters(filters);
                        }}
                        schools={(() => {
                            let schools = new Set<string>();
                            reviews.forEach((response: any) => schools.add(response.details.schoolName))
                            return schools;
                        })()
                        } />
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center gap-10 col-span-3">
                    <CategoryBar setFilterCategory={(value) => setFilter('category', value)} />

                    <SearchBar search={search} />

                    <div className="flex flex-col gap-4 w-full">
                        <div className="font-semibold text-lg text-muted-foreground flex gap-2 w-full items-start">
                            <TimerIcon />
                            Recent Reviews
                            <ClearFilters clearFilters={() => {
                                setFilters({});
                                applyFilters(filters);
                            }}/>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {currentReviews.length === 0 ? (
                                <div className="w-full h-full text-center col-span-3">No reviews found</div>
                            ) : (
                                    currentReviews.map((review) => (
                                        <ReviewCard response={review} key={review.id} />
                                    ))
                                )}
                        </div>
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-2 gap-2">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 border rounded disabled:opacity-50"
                                >
                                    Prev
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-3 py-1 border rounded ${
currentPage === i + 1 ? 'bg-gray-200' : ''
}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 border rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

const ClearFilters = ({ clearFilters }: {clearFilters: () => void}) => {
    return (
        <Button className="ml-auto" variant={'secondary'} onClick={() => {clearFilters()}}>
            ClearFilters <FilterXIcon />
        </Button>
    )
}

const FilterBar = ({ setFilter, schools, clearFilters }: { setFilter: (key: string, value: string) => void, schools: Set<string>, clearFilters: () => void}) => {
    const [country, setCountry] = useState("");
    const [_school, setSchool] = useState("");

    return (
        <div className="w-full h-max bg-white outline-foreground/20 outline rounded-md flex flex-col gap-4 p-4 shadow-md">

            <div className="font-semibold flex gap-2">
                <FilterIcon />
                Filters
                <ClearFilters clearFilters={() => {
                    clearFilters(); setSchool(""); setCountry("");}} />
            </div>

            <div className="font-semibold flex flex-col gap-2">
                Filter by Country
                <CountryDropdown value={country} onChange={(country) => {
                    setFilter('schoolCountry', country);
                    setCountry(country);
                }} />
            </div>

            <div className="font-semibold flex flex-col gap-2">
                Filter by Rating
                <ToggleGroup
                    type="single"
                    onValueChange={(value) => {
                        if (value) setFilter('rating', value);
                    }}
                    className="h-auto flex flex-wrap gap-2"
                >
                    <ToggleGroupItem value="10">10 <AppleIcon fill="red" stroke="red" /></ToggleGroupItem>
                    <ToggleGroupItem value="9">9 <AppleIcon fill="red" stroke="red" /></ToggleGroupItem>
                    <ToggleGroupItem value="8">8 <AppleIcon fill="red" stroke="red" /></ToggleGroupItem>
                    <ToggleGroupItem value="7">7 <AppleIcon fill="red" stroke="red" /></ToggleGroupItem>
                    <ToggleGroupItem value="6">6 <AppleIcon fill="red" stroke="red" /></ToggleGroupItem>
                    <ToggleGroupItem value="5">5 <AppleIcon fill="red" stroke="red" /></ToggleGroupItem>
                    <ToggleGroupItem value="4">4 <AppleIcon fill="red" stroke="red" /></ToggleGroupItem>
                    <ToggleGroupItem value="3">3 <AppleIcon fill="red" stroke="red" /></ToggleGroupItem>
                    <ToggleGroupItem value="2">2 <AppleIcon fill="red" stroke="red" /></ToggleGroupItem>
                    <ToggleGroupItem value="1">1 <AppleIcon fill="red" stroke="red" /></ToggleGroupItem>
                </ToggleGroup>
            </div>

            <div className="font-semibold flex flex-col gap-2">
                Filter by School
                <SchoolSearch schools={schools} setFilter={setFilter} />
            </div>
        </div>
    )
}


const SchoolSearch = ({ schools, setFilter }: {
    schools: Set<string>,
    setFilter: (key: string, value: string) => void
}) => {
    const [query, setQuery] = useState("");

    return (
        <Command className="rounded-md border shadow-md">
            <CommandInput
                placeholder="Search school..."
                onValueChange={setQuery}
            />
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

const SearchBar = ({ search }: { search: (term: string) => void }) => {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <form  className="w-full flex gap-2" onSubmit={(e) => {
            e.preventDefault();
            search(searchTerm);
        }}
        >
            <Input type="text" placeholder="Search for reviews"
                className="rounded-full py-3 text-base h-12 px-4" onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
                className="bg-primary rounded-full p-2 w-12 h-12 flex items-center justify-center"
                type="submit"
            >
                <SearchIcon stroke="white" /></button>
        </form>
    )
}

const CategoryBar = ({ setFilterCategory }: { setFilterCategory: (categoryId: string) => void}) => {
    const { categories } = useCategories();
    return (
        <div className="flex flex-col gap-0 w-full cursor-pointer">
            <div className="font-semibold text-lg text-muted-foreground flex gap-2 items-center justify-start">
                <FilterIcon />
                Filter by category
            </div>
            <div className="flex overflow-x-scroll gap-4 py-4 px-1">
                {
                    categories?.map((category) => <CategoryCard category={category} key={category.id} setFilterCategory={setFilterCategory} />)
                }
            </div>
        </div>
    )
}

const CategoryCard = ({ category, setFilterCategory }: { category: Category, setFilterCategory: (categoryId: string) => void }) => {
    return (
        <div className="flex items-start">
            <div 
                className={cn("outline-foreground/20 bg-foreground/2 rounded-2xl px-3 py-2 outline",
                    "w-max flex _flex-col items-center justify-center gap-4",
                    "hover:bg-foreground/5 shadow-sm transition-colors")}
                onClick={() => setFilterCategory(category.id ? category.id?.toString() : "")}
            >
                <Image
                    src={`/uploads/categoryIcons/${category.name.toLowerCase()}.png`}
                    width={200} height={200} alt={category.name} className="w-12 h-auto object-cover" />
                <div className="text-center text-lg font-semibold capitalize">{category.name}</div>
            </div>
        </div>
    );
};




export default UserDashboardPage;
