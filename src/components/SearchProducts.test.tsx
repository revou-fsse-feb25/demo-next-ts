import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchProducts from "./SearchProducts";
import { searchProductsByTitle } from "@/lib/api";

// Mock the API function
jest.mock("@/lib/api", () => ({
  searchProductsByTitle: jest.fn(),
}));

describe("SearchProducts", () => {
  const mockProducts = [
    {
      id: 1,
      title: "Generic Product",
      slug: "generic-product",
      price: 100,
      description: "Test description",
      category: {
        id: 1,
        name: "Category 1",
        image: "https://placehold.co/600x400",
        slug: "category-1",
      },
      images: ["https://placehold.co/600x400"],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders search form", () => {
    render(<SearchProducts />);

    // Search form should be visible
    const searchForm = screen.getByTestId("search-form");
    expect(searchForm).toBeInTheDocument();

    // Input and button should be visible
    const searchInput = screen.getByTestId("search-input");
    const searchButton = screen.getByTestId("search-button");

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toHaveTextContent("Search");
  });

  test("handles empty search term", async () => {
    render(<SearchProducts />);

    // Submit form with empty input
    const searchForm = screen.getByTestId("search-form");
    fireEvent.submit(searchForm);

    // Error message should be visible
    await waitFor(() => {
      expect(
        screen.getByText(/Please enter a search term/i)
      ).toBeInTheDocument();
    });

    // API should not be called
    expect(searchProductsByTitle).not.toHaveBeenCalled();
  });

  test("searches products when form is submitted", async () => {
    // Mock the API response
    (searchProductsByTitle as jest.Mock).mockResolvedValueOnce(mockProducts);

    render(<SearchProducts />);

    // Fill in search term and submit form
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "Generic" } });

    const searchButton = screen.getByTestId("search-button");
    fireEvent.click(searchButton);

    // Button should show loading state
    expect(searchButton).toHaveTextContent("Searching...");

    // API should be called with correct search term
    expect(searchProductsByTitle).toHaveBeenCalledWith("Generic");

    // Results should be displayed
    await waitFor(() => {
      expect(screen.getByText("Generic Product")).toBeInTheDocument();
    });
  });

  test("handles API error", async () => {
    // Mock the API error
    (searchProductsByTitle as jest.Mock).mockRejectedValueOnce(
      new Error("API error")
    );

    render(<SearchProducts />);

    // Fill in search term and submit form
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "Generic" } });

    const searchForm = screen.getByTestId("search-form");
    fireEvent.submit(searchForm);

    // Error message should be displayed
    await waitFor(() => {
      expect(screen.getByText(/API error/i)).toBeInTheDocument();
    });
  });

  test("handles empty search results", async () => {
    // Mock empty API response
    (searchProductsByTitle as jest.Mock).mockResolvedValueOnce([]);

    render(<SearchProducts />);

    // Fill in search term and submit form
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "NonExistent" } });

    const searchForm = screen.getByTestId("search-form");
    fireEvent.submit(searchForm);

    // Empty state message should be displayed
    await waitFor(() => {
      expect(screen.getByText(/No products found/i)).toBeInTheDocument();
    });
  });
});
