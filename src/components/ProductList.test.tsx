import { render, screen } from "@testing-library/react";
import ProductList from "./ProductList";
import { Product } from "@/lib/api";

describe("ProductList", () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Test Product 1",
      slug: "test-product-1",
      price: 100,
      description: "Test description 1",
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
      title: "Test Product 2",
      slug: "test-product-2",
      price: 200,
      description: "Test description 2",
      category: {
        id: 2,
        name: "Category 2",
        image: "https://placehold.co/600x400",
        slug: "category-2",
      },
      images: ["https://placehold.co/600x400"],
    },
  ];

  test("renders loading state", () => {
    render(<ProductList products={[]} isLoading={true} error={null} />);

    // Loading spinner should be visible
    const loadingElement = screen.getByRole("status");
    expect(loadingElement).toBeInTheDocument();
  });

  test("renders error message when there is an error", () => {
    const errorMessage = "Failed to fetch products";
    render(
      <ProductList products={[]} isLoading={false} error={errorMessage} />
    );

    // Error message should be visible
    const errorElement = screen.getByText(/Failed to fetch products/i);
    expect(errorElement).toBeInTheDocument();
  });

  test("renders empty state when no products are available", () => {
    render(<ProductList products={[]} isLoading={false} error={null} />);

    // Empty state message should be visible
    const emptyElement = screen.getByText(/No products found/i);
    expect(emptyElement).toBeInTheDocument();
  });

  test("renders products when available", () => {
    render(
      <ProductList products={mockProducts} isLoading={false} error={null} />
    );

    // Product list should be visible
    const productList = screen.getByTestId("product-list");
    expect(productList).toBeInTheDocument();

    // Both product titles should be visible
    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();

    // Price should be formatted correctly
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("$200")).toBeInTheDocument();

    // Categories should be visible
    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText("Category 2")).toBeInTheDocument();
  });

  test("renders product with placeholder image when no image is provided", () => {
    const productsWithoutImages: Product[] = [
      {
        ...mockProducts[0],
        images: [],
      },
    ];

    render(
      <ProductList
        products={productsWithoutImages}
        isLoading={false}
        error={null}
      />
    );

    // Image should have fallback src
    const image = screen.getByAltText("Test Product 1") as HTMLImageElement;
    expect(image.src).toContain("placehold.co/600x400");
  });
});
