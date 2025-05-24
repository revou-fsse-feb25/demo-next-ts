import React from "react";
import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";

// Test suite for the Greeting component
describe("Greeting Component", () => {
  // Test case 1: Rendering with a name prop
  test("should render a greeting with the provided name", () => {
    const testName = "Alice";

    // Arrange: Render the component with a name prop
    render(<Greeting name={testName} />); // render is from RTL

    // Act: (Implicit) The component renders.

    // Assert: Check if the greeting message with the name is in the document.
    // screen.getByText is an RTL query to find an element by its text content.
    // It throws an error if the element is not found.
    const greetingElement = screen.getByText(`Hello, ${testName}!`);
    expect(greetingElement).toBeInTheDocument(); // .toBeInTheDocument() is from jest-dom
  });

  // Test case 2: Rendering without a name prop (default behavior)
  test('should render a greeting with "Stranger" if no name is provided', () => {
    // Arrange: Render the component without a name prop
    render(<Greeting />);

    // Act: (Implicit)

    // Assert: Check if the default greeting message is in the document.
    const greetingElement = screen.getByText("Hello, Stranger!");
    expect(greetingElement).toBeInTheDocument();
  });

  // Test case 3: Snapshot test (Optional, but good for UI consistency)
  test("should match snapshot when a name is provided", () => {
    const { container } = render(<Greeting name="Bob" />);
    // .toMatchSnapshot() creates a snapshot file on the first run,
    // and compares against it on subsequent runs.
    // Useful for detecting unexpected UI changes.
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should match snapshot when no name is provided", () => {
    const { container } = render(<Greeting />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
