import React from "react";
import { render, screen } from "@testing-library/react";
import StockDetails from "./StockDetails";

const mockItem = {
  ticker: "AAPL",
  name: "Apple Inc.",
  locale: "US",
  cik: "0000320193",
  market: "NASDAQ",
  primary_exchange: "NASDAQ",
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ results: mockItem }),
  })
) as jest.Mock;

describe("StockDetails", () => {
  it("renders stock details", async () => {
    render(<StockDetails ticker="AAPL" updateShowDetails={jest.fn()} />);

    // Wait for the async fetch to complete
    expect(await screen.findByText("ticker: AAPL")).toBeInTheDocument();
    expect(await screen.findByText("name: Apple Inc.")).toBeInTheDocument();
  });
});
