import { render, screen, waitFor } from "@testing-library/react";
import ProductStats from "./ProductStats";
import { fetchProducts, calculateProductStats } from "@/lib/api";

// Mock the API functions
jest.mock("@/lib/api", () => ({
  fetchProducts: jest.fn(),
  calculateProductStats: jest.fn(),
}));

describe("ProductStats", () => {
  const mockProducts = [
    {
      id: 1,
      title: "Product 1",
      slug: "product-1",
      price: 100,
      description: "Description 1",
      category: {
        id: 1,
        name: "Category A",
        image: "https://placehold.co/600x400",
        slug: "category-a",
      },
      images: ["https://placehold.co/600x400"],
    },
    {
      id: 2,
      title: "Product 2",
      slug: "product-2",
      price: 200,
      description: "Description 2",
      category: {
        id: 1,
        name: "Category A",
        image: "https://placehold.co/600x400",
        slug: "category-a",
      },
      images: ["https://placehold.co/600x400"],
    },
    {
      id: 3,
      title: "Product 3",
      slug: "product-3",
      price: 50,
      description: "Description 3",
      category: {
        id: 2,
        name: "Category B",
        image: "https://placehold.co/600x400",
        slug: "category-b",
      },
      images: ["https://placehold.co/600x400"],
    },
  ];

  const mockStats = {
    totalProducts: 3,
    totalPrice: 350,
    averagePrice: 116.67,
    minPrice: 50,
    maxPrice: 200,
    categoryCounts: {
      "Category A": 2,
      "Category B": 1,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", () => {
    // Mock loading state
    (fetchProducts as jest.Mock).mockImplementationOnce(
      () => new Promise(() => {})
    );

    render(<ProductStats />);

    // Loading spinner should be visible
    const loadingElement = screen.getByRole("status");
    expect(loadingElement).toBeInTheDocument();
  });

  test("renders statistics when data is loaded", async () => {
    // Mock successful API response and stats calculation
    (fetchProducts as jest.Mock).mockResolvedValueOnce(mockProducts);
    (calculateProductStats as jest.Mock).mockReturnValueOnce(mockStats);

    render(<ProductStats />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    // Statistics should be displayed
    expect(screen.getByTestId("total-products")).toHaveTextContent("3");
    expect(screen.getByTestId("average-price")).toHaveTextContent("$116.67");
    expect(screen.getByTestId("total-price")).toHaveTextContent("$350");
    expect(screen.getByTestId("min-price")).toHaveTextContent("$50");
    expect(screen.getByTestId("max-price")).toHaveTextContent("$200");

    // Category counts should be displayed
    const categoryCounts = screen.getByTestId("category-counts");
    expect(categoryCounts).toHaveTextContent("Category A");
    expect(categoryCounts).toHaveTextContent("2");
    expect(categoryCounts).toHaveTextContent("Category B");
    expect(categoryCounts).toHaveTextContent("1");
  });

  test("renders error message when API call fails", async () => {
    // Mock API error
    const errorMessage = "Failed to fetch products";
    (fetchProducts as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    render(<ProductStats />);

    // Wait for error to be displayed
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    // Statistics should not be displayed
    expect(screen.queryByTestId("total-products")).not.toBeInTheDocument();
  });

  test("calls fetchProducts and calculateProductStats with correct parameters", async () => {
    // Mock successful API response and stats calculation
    (fetchProducts as jest.Mock).mockResolvedValueOnce(mockProducts);
    (calculateProductStats as jest.Mock).mockReturnValueOnce(mockStats);

    render(<ProductStats />);

    // Wait for component to finish rendering
    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    // Check that API functions were called correctly
    expect(fetchProducts).toHaveBeenCalledTimes(1);
    expect(calculateProductStats).toHaveBeenCalledWith(mockProducts);
  });
});
