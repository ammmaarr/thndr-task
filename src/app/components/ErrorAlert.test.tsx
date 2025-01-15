import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorAlert from "./ErrorAlert";
import "@testing-library/jest-dom";

describe("ErrorAlert", () => {
  it("renders the error message", () => {
    render(<ErrorAlert message="An error occurred" />);
    expect(screen.getByText("An error occurred")).toBeInTheDocument();
  });
});
