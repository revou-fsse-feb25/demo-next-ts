import {
  fetchProducts,
  searchProductsByTitle,
  calculateProductStats,
  Product,
} from "./api";

// Mock the global fetch function
global.fetch = jest.fn();

describe("API Service", () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // Sample product data for testing
  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Test Product",
      slug: "test-product",
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
    {
      id: 2,
      title: "Generic Product",
      slug: "generic-product",
      price: 200,
      description: "Generic description",
      category: {
        id: 1,
        name: "Category 1",
        image: "https://placehold.co/600x400",
        slug: "category-1",
      },
      images: ["https://placehold.co/600x400"],
    },
  ];

  // Testing async functions - fetchProducts
  describe("fetchProducts", () => {
    test("should fetch products successfully", async () => {
      // Mock successful response
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      });

      // Call the function
      const result = await fetchProducts();

      // Assertions
      expect(fetch).toHaveBeenCalledWith(
        "https://api.escuelajs.co/api/v1/products"
      );
      expect(result).toEqual(mockProducts);
      expect(result.length).toBe(2);
    });

    test("should throw error when API returns non-ok response", async () => {
      // Mock failed response
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      // Expect the function to throw an error
      await expect(fetchProducts()).rejects.toThrow("API error: 500");
    });

    test("should throw error when fetch fails", async () => {
      // Mock network error
      const networkError = new Error("Network error");
      (fetch as jest.Mock).mockRejectedValueOnce(networkError);

      // Expect the function to throw an error
      await expect(fetchProducts()).rejects.toThrow("Network error");
    });
  });

  // Testing async functions with parameters - searchProductsByTitle
  describe("searchProductsByTitle", () => {
    test("should search products by title successfully", async () => {
      // Mock successful response
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [mockProducts[1]], // Return only the Generic product
      });

      // Call the function with a search term
      const result = await searchProductsByTitle("Generic");

      // Assertions
      expect(fetch).toHaveBeenCalledWith(
        "https://api.escuelajs.co/api/v1/products/?title=Generic"
      );
      expect(result).toEqual([mockProducts[1]]);
      expect(result[0].title).toBe("Generic Product");
    });

    test("should throw error when title parameter is empty", async () => {
      // Expect the function to throw an error for empty title
      await expect(searchProductsByTitle("")).rejects.toThrow(
        "Title parameter is required"
      );
    });

    test("should handle empty search results", async () => {
      // Mock empty response
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      // Call the function
      const result = await searchProductsByTitle("NonExistentProduct");

      // Assertions
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });
  });

  // Testing error handling in advanced functions
  describe("calculateProductStats", () => {
    test("should calculate product statistics correctly", () => {
      // Call the function
      const stats = calculateProductStats(mockProducts);

      // Assertions
      expect(stats.totalProducts).toBe(2);
      expect(stats.totalPrice).toBe(300);
      expect(stats.averagePrice).toBe(150);
      expect(stats.minPrice).toBe(100);
      expect(stats.maxPrice).toBe(200);
      expect(stats.categoryCounts).toEqual({ "Category 1": 2 });
    });

    test("should throw error when products array is empty", () => {
      // Expect the function to throw an error for empty array
      expect(() => calculateProductStats([])).toThrow(
        "Valid products array is required"
      );
    });

    test("should throw error when products parameter is null", () => {
      // Expect the function to throw an error for null
      expect(() => calculateProductStats(null as unknown as Product[])).toThrow(
        "Valid products array is required"
      );
    });

    test("should throw error when products parameter is undefined", () => {
      // Expect the function to throw an error for undefined
      expect(() =>
        calculateProductStats(undefined as unknown as Product[])
      ).toThrow("Valid products array is required");
    });
  });

  // Advanced testing with spies and mocks
  describe("Advanced testing techniques", () => {
    test("should handle errors properly when fetch fails", async () => {
      // Mock network error
      const networkError = new Error("Network error");
      (fetch as jest.Mock).mockRejectedValueOnce(networkError);

      // Call the function and expect it to throw
      await expect(fetchProducts()).rejects.toThrow("Network error");
    });

    test("should retry fetch on network error (example of advanced test)", async () => {
      // This is just a demonstration of how you might test retry logic
      // In a real implementation, you would have retry logic in your API service

      // Mock fetch to fail once then succeed
      (fetch as jest.Mock)
        .mockRejectedValueOnce(new Error("Network error"))
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockProducts,
        });

      // Create a simple retry function
      const fetchWithRetry = async () => {
        try {
          await fetchProducts();
        } catch (error) {
          // Retry once
          return await fetchProducts();
        }
      };

      // Call the function
      const result = await fetchWithRetry();

      // Assertions
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(result).toEqual(mockProducts);
    });
  });
});
