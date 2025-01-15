import React from "react";
import { render, screen } from "@testing-library/react";
import StocksGrid from "./StocksGrid";
import useStocks from "../useStocks";

// Mock the useStocks hook
jest.mock("../useStocks");

describe("StocksGrid", () => {
  const mockUseStocks = useStocks as jest.Mock;

  beforeEach(() => {
    mockUseStocks.mockReturnValue({
      data: { pages: [{ results: [] }] },
      error: null,
      hasNextPage: false,
      isFetchingNextPage: false,
      retryingAfter: -1,
      status: "success",
      fetchNextPage: jest.fn(),
    });
  });

  it("renders error alert when no stocks are found", () => {
    render(<StocksGrid searchTerm="AAPL" />);
    expect(screen.getByText(/No stocks found for "AAPL"/)).toBeInTheDocument();
  });

  it("renders loading indicator when fetching stocks", () => {
    mockUseStocks.mockReturnValueOnce({
      ...mockUseStocks(),
      isFetchingNextPage: true,
      status: "success",
      data: { pages: [{ result: [{ name: "Ammar" }] }] },
    });
    render(<StocksGrid searchTerm="Ammar" />);
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
  });
});
