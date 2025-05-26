import React from "react";
import { render, screen } from "@testing-library/react";
import UserInteractionsPage from "./page";

// Mock the Counter component
jest.mock("@/components/Counter", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="counter-component">Counter Component</div>,
  };
});

// Mock the LoginForm component
jest.mock("@/components/LoginForm", () => {
  return {
    __esModule: true,
    default: ({
      onSubmit,
    }: {
      onSubmit: (email: string, password: string) => void;
    }) => (
      <div data-testid="login-form-component">
        Login Form Component
        <button onClick={() => onSubmit("test@example.com", "password123")}>
          Test Submit
        </button>
      </div>
    ),
  };
});

// Mock the window.alert
const mockAlert = jest.fn();
window.alert = mockAlert;

describe("User Interactions Page", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test("should render the page with correct title", () => {
    render(<UserInteractionsPage />);

    // Check for the main title
    expect(screen.getByText("Testing User Interactions")).toBeInTheDocument();
  });

  test("should render the Counter component", () => {
    render(<UserInteractionsPage />);

    // Check for the Counter component
    expect(screen.getByTestId("counter-component")).toBeInTheDocument();
    expect(screen.getByText("1. Testing Button Clicks")).toBeInTheDocument();
  });

  test("should render the LoginForm component", () => {
    render(<UserInteractionsPage />);

    // Check for the LoginForm component
    expect(screen.getByTestId("login-form-component")).toBeInTheDocument();
    expect(screen.getByText("2. Testing Form Submissions")).toBeInTheDocument();
  });

  test("should render the testing techniques section", () => {
    render(<UserInteractionsPage />);

    // Check for the testing techniques section
    expect(screen.getByText("Testing Techniques")).toBeInTheDocument();
    expect(screen.getByText("Testing Button Interactions")).toBeInTheDocument();
    expect(screen.getByText("Testing Form Inputs")).toBeInTheDocument();
    expect(screen.getByText("Testing Form Submissions")).toBeInTheDocument();
  });

  test("should call alert when login form is submitted", () => {
    render(<UserInteractionsPage />);

    // Find and click the test submit button in the mocked LoginForm
    const submitButton = screen.getByText("Test Submit");
    submitButton.click();

    // Check that alert was called with the expected message
    expect(mockAlert).toHaveBeenCalledWith(
      "Login attempt with email: test@example.com"
    );
  });
});
