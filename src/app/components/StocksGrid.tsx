import { useInfiniteQuery } from "@tanstack/react-query";
import { easeInOut } from "motion";
import { motion } from "motion/react";
import React, { useCallback, useRef, useState } from "react";

interface StockItem {
  ticker: string;
  name: string;
}

interface ApiResponse {
  results: StockItem[];
  next_url?: string;
}

const StocksGrid: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const [tooManyRequests, setTooManyRequests] = useState(false);

  const fetchStocks = async ({
    pageParam = null,
  }: {
    pageParam: string | null;
  }) => {
    setTooManyRequests(false);
    if (!pageParam) {
      const response = await fetch(
        "https://api.polygon.io/v3/reference/tickers?active=true&limit=10&apiKey=fIVeVEZJ8Lnc_YlVes0VZiEteb0iuVlb" +
          (searchTerm ? `&search=${searchTerm}` : "")
      );
      if (!response.ok) {
        if (response.status !== 429) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          setTooManyRequests(true);
        }
      }
      const data = await response.json();
      return data as ApiResponse;
    } else {
      const response = await fetch(
        pageParam +
          "&apiKey=fIVeVEZJ8Lnc_YlVes0VZiEteb0iuVlb" +
          (searchTerm ? `&search=${searchTerm}` : "")
      );
      if (!response.ok) {
        if (response.status !== 429) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          setTooManyRequests(true);
        }
      }
      const data = await response.json();
      return data as ApiResponse;
    }
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    // isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["stocks", searchTerm],
    queryFn: fetchStocks,
    initialPageParam: null,
    getNextPageParam: (lastPage: ApiResponse) => lastPage.next_url,
    staleTime: 1000 * 60 * 5, // Data becomes stale after 5 minutes
    refetchOnWindowFocus: false, // Prevent refetching when window regains focus
    refetchOnMount: false, // Prevent refetching on component mount if data exists
  });

  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  return status === "error" && !tooManyRequests ? (
    <div className="rounded-lg p-4 flex flex-col justify-center items-center gap-8 border border-red-500 bg-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-red-500 text-lg">{(error as Error).message}</h2>
    </div>
  ) : (
    <div className="flex flex-col gap-8 w-container justify-center items-center mx-auto">
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8 px-2 py-10">
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.results?.map((item: StockItem, index: number) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  ease: easeInOut,
                  delay: (i === 1 ? i : 0) + index * 0.1,
                }}
                key={index}
                className={
                  "rounded-lg p-4 flex flex-col justify-center items-center gap-8 bg-main"
                }
              >
                <h1 className="text-white text-3xl font-semibold">
                  {item.ticker}
                </h1>
                <h2 className="text-white text-lg tracking-tighter text-center text-pretty font-extralight">
                  {item.name}
                </h2>
              </motion.div>
            ))}
          </React.Fragment>
        ))}
      </div>
      {!tooManyRequests && (
        <div
          ref={lastElementRef}
          className="flex gap-4 justify-center items-center"
        >
          <div
            className={
              "size-2 rounded-full bg-main my-20" +
              (hasNextPage || status === "pending" ? " animate-ping" : "")
            }
          />
          <div
            className={
              "size-2 rounded-full bg-main my-20" +
              (hasNextPage || status === "pending" ? " animate-ping" : "")
            }
          />
          <div
            className={
              "size-2 rounded-full bg-main my-20" +
              (hasNextPage || status === "pending" ? " animate-ping" : "")
            }
          />
        </div>
      )}

      {tooManyRequests && (
        <label className="text-red-500 text-lg my-10 text-center">
          API Endpoint is too flooded with requests. Refresh to try again!
        </label>
      )}
    </div>
  );
};

export default StocksGrid;
