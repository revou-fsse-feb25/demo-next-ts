import React from "react";
import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock the ThemeToggle component
jest.mock("./ThemeToggle", () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}));

describe("Navigation Component", () => {
  // Test case 1: Initial rendering
  test("should render navigation with all links", () => {
    // Mock the usePathname hook to return "/"
    jest.spyOn(require("next/navigation"), "usePathname").mockReturnValue("/");

    render(<Navigation />);

    // Check for the title
    expect(screen.getByText("Next.js Testing Workshop")).toBeInTheDocument();

    // Check for all navigation links
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("1. Testing Basics")).toBeInTheDocument();
    expect(screen.getByText("2. Jest Introduction")).toBeInTheDocument();
    expect(screen.getByText("3. Testing Functions")).toBeInTheDocument();
    expect(screen.getByText("4. Component Testing")).toBeInTheDocument();
    expect(screen.getByText("5. User Interactions")).toBeInTheDocument();

    // Check for the theme toggle
    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
  });

  // Test case 2: Active link highlighting
  test("should highlight the active link", () => {
    // Mock the usePathname hook to return "/01-basics"
    jest
      .spyOn(require("next/navigation"), "usePathname")
      .mockReturnValue("/01-basics");

    render(<Navigation />);

    // Get all the links
    const homeLink = screen.getByText("Home");
    const basicsLink = screen.getByText("1. Testing Basics");

    // Check that the active link has the active class (bg-indigo-600)
    expect(basicsLink.className).toContain("bg-indigo-600");
    expect(basicsLink.className).toContain("text-white");

    // Check that the inactive links don't have the active class
    expect(homeLink.className).not.toContain("bg-indigo-600");
    expect(homeLink.className).not.toContain("text-white");
  });

  // Test case 3: Different active link
  test("should highlight a different active link when pathname changes", () => {
    // Mock the usePathname hook to return "/02-jest-intro"
    jest
      .spyOn(require("next/navigation"), "usePathname")
      .mockReturnValue("/02-jest-intro");

    render(<Navigation />);

    // Get the Jest intro link
    const jestLink = screen.getByText("2. Jest Introduction");

    // Check that it has the active class
    expect(jestLink.className).toContain("bg-indigo-600");
    expect(jestLink.className).toContain("text-white");

    // Check that other links don't have the active class
    const homeLink = screen.getByText("Home");
    expect(homeLink.className).not.toContain("bg-indigo-600");
  });

  // Test case 4: No active link
  test("should not highlight any link when on an unknown path", () => {
    // Mock the usePathname hook to return an unknown path
    jest
      .spyOn(require("next/navigation"), "usePathname")
      .mockReturnValue("/unknown-path");

    render(<Navigation />);

    // Get all links
    const links = [
      screen.getByText("Home"),
      screen.getByText("1. Testing Basics"),
      screen.getByText("2. Jest Introduction"),
      screen.getByText("3. Testing Functions"),
      screen.getByText("4. Component Testing"),
      screen.getByText("5. User Interactions"),
    ];

    // Check that none of them have the active class
    links.forEach((link) => {
      expect(link.className).not.toContain("bg-indigo-600");
      expect(link.className).not.toContain("text-white");
    });
  });
});
