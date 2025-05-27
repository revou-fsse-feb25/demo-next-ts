import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {
  fetchProducts,
  searchProductsByTitle,
  calculateProductStats,
  Product,
} from "./api";

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

// Define MSW handlers
const handlers = [
  // Handler for fetchProducts
  http.get("https://api.escuelajs.co/api/v1/products", () => {
    return HttpResponse.json(mockProducts);
  }),

  // Handler for searchProductsByTitle with "Generic"
  http.get("https://api.escuelajs.co/api/v1/products/", ({ request }) => {
    const url = new URL(request.url);
    const title = url.searchParams.get("title");

    if (title === "Generic") {
      return HttpResponse.json([mockProducts[1]]);
    }

    if (title === "NonExistentProduct") {
      return HttpResponse.json([]);
    }

    return HttpResponse.json(mockProducts);
  }),
];

// Set up MSW server
const server = setupServer(...handlers);

describe("API Service", () => {
  // Start MSW server before tests
  beforeAll(() => server.listen());

  // Reset handlers after each test
  afterEach(() => server.resetHandlers());

  // Close server after all tests
  afterAll(() => server.close());

  // Testing async functions - fetchProducts
  describe("fetchProducts", () => {
    it("should fetch products successfully", async () => {
      // Call the function
      const result = await fetchProducts();

      // Assertions
      expect(result).toEqual(mockProducts);
      expect(result.length).toBe(2);
    });

    it("should throw error when API returns non-ok response", async () => {
      // Override the handler for this test
      server.use(
        http.get("https://api.escuelajs.co/api/v1/products", () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      // Expect the function to throw an error
      await expect(fetchProducts()).rejects.toThrow("API error: 500");
    });

    it("should throw error when fetch fails", async () => {
      // Override the handler for this test
      server.use(
        http.get("https://api.escuelajs.co/api/v1/products", () => {
          return HttpResponse.error();
        })
      );

      // Expect the function to throw an error
      await expect(fetchProducts()).rejects.toThrow();
    });
  });

  // Testing async functions with parameters - searchProductsByTitle
  describe("searchProductsByTitle", () => {
    it("should search products by title successfully", async () => {
      // Call the function with a search term
      const result = await searchProductsByTitle("Generic");

      // Assertions
      expect(result).toEqual([mockProducts[1]]);
      expect(result[0].title).toBe("Generic Product");
    });

    it("should throw error when title parameter is empty", async () => {
      // Expect the function to throw an error for empty title
      await expect(searchProductsByTitle("")).rejects.toThrow(
        "Title parameter is required"
      );
    });

    it("should handle empty search results", async () => {
      // Call the function
      const result = await searchProductsByTitle("NonExistentProduct");

      // Assertions
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });
  });

  // Testing error handling in advanced functions
  describe("calculateProductStats", () => {
    it("should calculate product statistics correctly", () => {
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

    it("should throw error when products array is empty", () => {
      // Expect the function to throw an error for empty array
      expect(() => calculateProductStats([])).toThrow(
        "Valid products array is required"
      );
    });

    it("should throw error when products parameter is null", () => {
      // Expect the function to throw an error for null
      expect(() => calculateProductStats(null as unknown as Product[])).toThrow(
        "Valid products array is required"
      );
    });

    it("should throw error when products parameter is undefined", () => {
      // Expect the function to throw an error for undefined
      expect(() =>
        calculateProductStats(undefined as unknown as Product[])
      ).toThrow("Valid products array is required");
    });
  });

  // Advanced testing with MSW
  describe("Advanced testing techniques", () => {
    it("should handle network errors properly", async () => {
      // Override the handler to simulate a network error
      server.use(
        http.get("https://api.escuelajs.co/api/v1/products", () => {
          return HttpResponse.error();
        })
      );

      // Expect the function to throw an error
      await expect(fetchProducts()).rejects.toThrow();
    });

    it("should handle retry logic for network errors", async () => {
      // Setup a counter to track request attempts
      let attemptCount = 0;

      // Override the handler to fail once then succeed
      server.use(
        http.get("https://api.escuelajs.co/api/v1/products", () => {
          attemptCount++;
          if (attemptCount === 1) {
            return HttpResponse.error();
          }
          return HttpResponse.json(mockProducts);
        })
      );

      // Create a simple retry function
      const fetchWithRetry = async () => {
        try {
          return await fetchProducts();
        } catch (error) {
          // Retry once
          return await fetchProducts();
        }
      };

      // Call the function
      const result = await fetchWithRetry();

      // Assertions
      expect(attemptCount).toBe(2);
      expect(result).toEqual(mockProducts);
    });
  });
});
