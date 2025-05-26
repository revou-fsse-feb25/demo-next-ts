import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter Component", () => {
  // Test case 1: Initial rendering
  test("should render with the default initial count", () => {
    render(<Counter />);

    const countValue = screen.getByText("0");
    expect(countValue).toBeInTheDocument();
  });

  // Test case 2: Rendering with custom initial count
  test("should render with the provided initial count", () => {
    render(<Counter initialCount={10} />);

    const countValue = screen.getByText("10");
    expect(countValue).toBeInTheDocument();
  });

  // Test case 3: Testing increment interaction
  test("should increment the count when the + button is clicked", () => {
    render(<Counter initialCount={5} />);

    const incrementButton = screen.getByRole("button", { name: "Increment" });
    fireEvent.click(incrementButton);

    const countValue = screen.getByText("6");
    expect(countValue).toBeInTheDocument();
  });

  // Test case 4: Testing decrement interaction
  test("should decrement the count when the - button is clicked", () => {
    render(<Counter initialCount={5} />);

    const decrementButton = screen.getByRole("button", { name: "Decrement" });
    fireEvent.click(decrementButton);

    const countValue = screen.getByText("4");
    expect(countValue).toBeInTheDocument();
  });

  // Test case 5: Testing reset interaction
  test("should reset the count when the Reset button is clicked", () => {
    render(<Counter initialCount={5} />);

    // First, increment to change the value
    const incrementButton = screen.getByRole("button", { name: "Increment" });
    fireEvent.click(incrementButton);

    // Then reset
    const resetButton = screen.getByRole("button", { name: "Reset" });
    fireEvent.click(resetButton);

    const countValue = screen.getByText("5");
    expect(countValue).toBeInTheDocument();
  });

  // Test case 6: Testing custom step
  test("should use the provided step value for incrementing and decrementing", () => {
    render(<Counter initialCount={10} step={5} />);

    const incrementButton = screen.getByRole("button", { name: "Increment" });
    fireEvent.click(incrementButton);

    expect(screen.getByText("15")).toBeInTheDocument();

    const decrementButton = screen.getByRole("button", { name: "Decrement" });
    fireEvent.click(decrementButton);

    expect(screen.getByText("10")).toBeInTheDocument();
  });

  // Test case 7: Testing multiple interactions
  test("should correctly handle multiple button clicks", () => {
    render(<Counter initialCount={0} />);

    const incrementButton = screen.getByRole("button", { name: "Increment" });
    const decrementButton = screen.getByRole("button", { name: "Decrement" });

    // Click increment three times
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);

    expect(screen.getByText("3")).toBeInTheDocument();

    // Click decrement once
    fireEvent.click(decrementButton);

    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
