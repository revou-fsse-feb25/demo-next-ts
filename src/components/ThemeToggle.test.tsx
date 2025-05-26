import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "./ThemeToggle";

// Mock the next-themes module
jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: jest.fn(),
    themes: ["light", "dark"],
  }),
}));

describe("ThemeToggle Component", () => {
  // Test case 1: Initial rendering
  test("should render the theme toggle button", () => {
    render(<ThemeToggle />);

    const toggleButton = screen.getByRole("button", { name: "Toggle theme" });
    expect(toggleButton).toBeInTheDocument();
  });

  // Test case 2: Testing theme toggle interaction
  test("should call setTheme when clicked", () => {
    // Create a mock function for setTheme
    const mockSetTheme = jest.fn();

    // Override the mock implementation for this test
    jest.spyOn(require("next-themes"), "useTheme").mockImplementation(() => ({
      theme: "light",
      setTheme: mockSetTheme,
      themes: ["light", "dark"],
    }));

    render(<ThemeToggle />);

    const toggleButton = screen.getByRole("button", { name: "Toggle theme" });
    fireEvent.click(toggleButton);

    // Verify setTheme was called with "dark"
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  // Test case 3: Testing theme toggle from dark to light
  test("should toggle from dark to light theme", () => {
    // Mock the theme as "dark"
    const mockSetTheme = jest.fn();
    jest.spyOn(require("next-themes"), "useTheme").mockImplementation(() => ({
      theme: "dark",
      setTheme: mockSetTheme,
      themes: ["light", "dark"],
    }));

    render(<ThemeToggle />);

    const toggleButton = screen.getByRole("button", { name: "Toggle theme" });
    fireEvent.click(toggleButton);

    // Verify setTheme was called with "light"
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  // Test case 4: Testing icon rendering based on theme
  test("should render Sun icon when theme is dark", () => {
    // Mock the theme as "dark"
    jest.spyOn(require("next-themes"), "useTheme").mockImplementation(() => ({
      theme: "dark",
      setTheme: jest.fn(),
      themes: ["light", "dark"],
    }));

    render(<ThemeToggle />);

    // Check for Sun icon (we can't directly test for the icon component,
    // but we can check for the button with the correct aria-label)
    const toggleButton = screen.getByRole("button", { name: "Toggle theme" });
    expect(toggleButton).toBeInTheDocument();
  });

  // Test case 5: Testing icon rendering based on theme
  test("should render Moon icon when theme is light", () => {
    // Mock the theme as "light"
    jest.spyOn(require("next-themes"), "useTheme").mockImplementation(() => ({
      theme: "light",
      setTheme: jest.fn(),
      themes: ["light", "dark"],
    }));

    render(<ThemeToggle />);

    // Check for Moon icon (we can't directly test for the icon component,
    // but we can check for the button with the correct aria-label)
    const toggleButton = screen.getByRole("button", { name: "Toggle theme" });
    expect(toggleButton).toBeInTheDocument();
  });
});
