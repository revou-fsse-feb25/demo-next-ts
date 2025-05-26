import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";

describe("LoginForm Component", () => {
  // Test case 1: Initial rendering
  test("should render login form with empty fields", () => {
    render(<LoginForm onSubmit={() => {}} />);

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitButton = screen.getByTestId("login-button");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
  });

  // Test case 2: Form validation - empty email
  test("should show error when submitting with empty email", () => {
    render(<LoginForm onSubmit={() => {}} />);

    // Fill only password field
    const passwordInput = screen.getByTestId("password-input");
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Submit the form
    const submitButton = screen.getByTestId("login-button");
    fireEvent.click(submitButton);

    // Check for error message
    const errorMessage = screen.getByText("Email is required");
    expect(errorMessage).toBeInTheDocument();
  });

  // Test case 3: Form validation - empty password
  test("should show error when submitting with empty password", () => {
    render(<LoginForm onSubmit={() => {}} />);

    // Fill only email field
    const emailInput = screen.getByTestId("email-input");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    // Submit the form
    const submitButton = screen.getByTestId("login-button");
    fireEvent.click(submitButton);

    // Check for error message
    const errorMessage = screen.getByText("Password is required");
    expect(errorMessage).toBeInTheDocument();
  });

  // Test case 4: Successful form submission
  test("should call onSubmit with email and password when form is valid", () => {
    // Create a mock function to track calls
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);

    // Fill in both fields
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Submit the form
    const submitButton = screen.getByTestId("login-button");
    fireEvent.click(submitButton);

    // Verify the onSubmit callback was called with correct values
    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith("test@example.com", "password123");
  });

  // Test case 5: Error message disappears after successful submission
  test("should clear error message after successful submission", () => {
    render(<LoginForm onSubmit={() => {}} />);

    // Submit with empty fields to trigger error
    const submitButton = screen.getByTestId("login-button");
    fireEvent.click(submitButton);

    // Verify error is shown
    expect(screen.getByText("Email is required")).toBeInTheDocument();

    // Fill in both fields
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Submit again
    fireEvent.click(submitButton);

    // Verify error is gone
    expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
  });

  // Test case 6: Input field updates
  test("should update input values when typing", () => {
    render(<LoginForm onSubmit={() => {}} />);

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");

    // Type in email field
    fireEvent.change(emailInput, { target: { value: "test@" } });
    expect(emailInput).toHaveValue("test@");

    // Continue typing
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput).toHaveValue("test@example.com");

    // Type in password field
    fireEvent.change(passwordInput, { target: { value: "pass" } });
    expect(passwordInput).toHaveValue("pass");

    // Continue typing
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput).toHaveValue("password123");
  });
});
