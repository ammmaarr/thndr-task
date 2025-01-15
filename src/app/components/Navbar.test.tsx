import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders the navbar", () => {
    render(<Navbar searchTerm="" setSearchTerm={jest.fn()} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument(); // Assuming there's an input for search
  });
});
