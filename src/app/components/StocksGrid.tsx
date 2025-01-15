import React, { useCallback, useRef, useState } from "react";
import StockCard from "./StockCard";
import LoadingIndicator from "./LoadingIndicator";
import { StockItem } from "../interfaces";
import useStocks from "../useStocks";
import ErrorAlert from "./ErrorAlert";
import StockDetails from "./StockDetails";

const StocksGrid: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const {
    data,
    error,
    hasNextPage,
    isFetchingNextPage,
    retryingAfter,
    status,
    fetchNextPage,
  } = useStocks(searchTerm);

  const [showDetails, setShowDetails] = useState("");

  const updateShowDetails = (ticker: string) => {
    setShowDetails(ticker);
  };

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

  // Check if we have no results after the initial load
  if (status === "success" && data?.pages[0]?.results?.length === 0) {
    return <ErrorAlert message={`No stocks found for "${searchTerm}"`} />;
  }

  return status === "error" && !error?.message.includes("Too many requests") ? (
    <ErrorAlert message={error?.message} />
  ) : (
    <div className="flex flex-col gap-8 w-container justify-center items-center mx-auto">
      {showDetails !== "" && (
        <StockDetails
          key={showDetails}
          ticker={showDetails}
          updateShowDetails={updateShowDetails}
        />
      )}

      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8 px-2 py-10">
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.results?.map((item: StockItem, index: number) => (
              <StockCard
                onClick={updateShowDetails}
                item={item}
                index={index}
                i={i}
                key={index}
              />
            ))}
          </React.Fragment>
        ))}
      </div>

      <div
        ref={lastElementRef}
        className="flex gap-4 justify-center items-center"
        data-testid="loading-indicator"
      >
        <LoadingIndicator hasNextPage={hasNextPage} status={status} />
      </div>

      {retryingAfter >= 0 && (
        <label className="text-red-500 text-lg my-10 text-center">
          API Endpoint is too flooded with requests. Retrying automatically in{" "}
          {retryingAfter / 1000} seconds.
        </label>
      )}
    </div>
  );
};

export default StocksGrid;
