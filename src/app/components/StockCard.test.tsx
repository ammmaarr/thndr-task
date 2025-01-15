import React from "react";
import { render, screen } from "@testing-library/react";
import StockCard from "./StockCard";

const mockItem = {
  ticker: "AAPL",
  name: "Apple Inc.",
};

describe("StockCard", () => {
  it("renders stock information", () => {
    render(<StockCard item={mockItem} index={0} i={0} onClick={jest.fn()} />);
    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("Apple Inc.")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<StockCard item={mockItem} index={0} i={0} onClick={handleClick} />);
    screen.getByText("AAPL").click();
    expect(handleClick).toHaveBeenCalledWith("AAPL");
  });
});
