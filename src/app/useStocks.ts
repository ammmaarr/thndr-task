import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ApiResponse } from "./interfaces";

const useStocks = (searchTerm: string) => {
  const [retryingAfter, setRetryingAfter] = useState(-1);

  const fetchStocks = async ({
    pageParam = null,
  }: {
    pageParam: string | null;
  }) => {
    let response;
    if (!pageParam) {
      response = await fetch(
        "https://api.polygon.io/v3/reference/tickers?limit=10&apiKey=fIVeVEZJ8Lnc_YlVes0VZiEteb0iuVlb" +
          (searchTerm ? `&search=${searchTerm}` : "")
      );
    } else {
      response = await fetch(
        pageParam +
          "&apiKey=fIVeVEZJ8Lnc_YlVes0VZiEteb0iuVlb" +
          (searchTerm ? `&search=${searchTerm}` : "")
      );
    }

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Too many requests");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setRetryingAfter(-1);
    return data as ApiResponse;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRetryingAfter((prev) => {
        if (prev > 0) {
          return prev - 1000;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [retryingAfter]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["stocks", searchTerm],
    queryFn: fetchStocks,
    initialPageParam: null,
    getNextPageParam: (lastPage: ApiResponse) => lastPage.next_url,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: (_, error) => {
      return error.message.includes("Too many requests");
    },
    retryDelay: (failureCount) => {
      const retryAfter = Math.min(1000 * Math.pow(2, failureCount), 30000);
      setRetryingAfter(retryAfter);
      return retryAfter;
    },
  });

  return {
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    data,
    retryingAfter,
  };
};

export default useStocks;
