"use client";
import { useState, useEffect } from "react";
import { TimerIcon } from "lucide-react";
import { CategoryBar, ClearFilters, FilterBar, SearchBar } from "@/components/pages/user/dashboard/components";
import { ReviewCard } from "./components/ReviewCard";

const UserDashboardPage = ({data}:{data:Record<string, any>}) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<any[]>([]);
  // const {data, isLoading} = useQuery({url:"/feedback-form/groups", key:"formGroups"})
// console.log(data, 'data')
useEffect(() => {
  const setup = async () => {
    if (!data) return;
    const reviews = data?.result;

      const filteredReviews: any[] = [];
      reviews.forEach((review: any) => {
        let totalRating = 0;
        let totalResponses = 0;
        review.responses.forEach((response: any) =>
          response.answers.forEach((answer: any) => {
            if (Number.isInteger(answer.answer)) {
              totalRating += answer.answer;
              totalResponses += 1;
            }
          })
        );
        const averageRating = totalRating / totalResponses;
        review.responses.length > 0 &&
          filteredReviews.push({
            ...review.responses[0],
            totalReviews: review.responses.length,
            rating: averageRating,
          });
      });

      setReviews(filteredReviews);
      groupReviews(filteredReviews);
    };

    setup();
  }, [data]);
console.log(data)
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    startIndex,
    startIndex + reviewsPerPage
  );

  const groupReviews = (reviews: any[]) => {
    // const filteredReviews = [];
    // reviews.forEach(review => {
    //     filteredReviews.push(review);
    // });
    setFilteredReviews(reviews);
  };

  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const setFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (activeFilters: { [key: string]: string }) => {
    let filteredResponses: any[] = [];

    reviews.forEach((response) => {
      let matchesAll = true;

      for (const [key, value] of Object.entries(activeFilters)) {
        if (key === "rating") {
          if (
            Number.isNaN(response.rating) ||
            response.rating.toFixed(0) < parseFloat(value)
          ) {
            matchesAll = false;
            break;
          }
        } else if (key == "category") {
          const match = response.feedbackForm.category.id == value;
          if (!match) {
            matchesAll = false;
            break;
          }
        } else {
          const match = Object.entries(response.details).some(
            ([detailKey, detailValue]: [any, any]) =>
              // @ts-ignore
              detailKey === key &&
              detailValue.toLowerCase().includes(value.toLowerCase())
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
    reviews.forEach((response) => {
      Object.values(response.details).forEach((detail) => {
        if (
          typeof detail === "string" &&
          detail.toLowerCase().includes(term.toLowerCase())
        ) {
          if (!filteredReviews.includes(response))
            filteredReviews.push(response);
        }
      });
    });
    groupReviews(filteredReviews);
  };

  return (
    <div className="w-full min-h-screen">
      <div className="flex gap-10 sm:flex-row flex-col flex-1 overflow-x-hidden">
        <div className="flex flex-col sm:min-w-[250px] sm:max-w-[250px] w-full">
          <FilterBar
            setFilter={setFilter}
            clearFilters={() => {
              setFilters({});
              applyFilters(filters);
            }}
            schools={(() => {
              let schools = new Set<string>();
              data?.result?.forEach((response: any) =>
                schools.add(response.details.schoolName)
              );
              return schools;
            })()}
          />
        </div>
        <div className="flex-1 overflow-x-auto">
          <CategoryBar
            setFilterCategory={(value) => setFilter("category", value)}
          />
          <SearchBar search={search} />
          <div className="flex flex-col gap-4 w-full">
            <div className="font-semibold text-lg text-muted-foreground justify-between flex gap-2 w-full">
              <div className="flex gap-2">
                <TimerIcon />
                Recent Reviews
              </div>
              <ClearFilters
                clearFilters={() => {
                  setFilters({});
                  applyFilters(filters);
                }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {currentReviews.length === 0 ? (
                <div className="w-full h-full text-center col-span-3">
                  No reviews found
                </div>
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
                      currentPage === i + 1 ? "bg-gray-200" : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
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
  );
};

export default UserDashboardPage;
