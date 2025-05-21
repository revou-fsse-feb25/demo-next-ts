import axios from "axios";
import { Product } from "@/types/product";

const API_URL = "https://fakeapi.platzi.com/en/rest";

export async function getProducts(
  limit: number = 10,
  offset: number = 0,
  title: string = ""
): Promise<{ products: Product[]; total: number }> {
  try {
    // If there's a title search, use the filter endpoint
    let url = `${API_URL}/products`;

    if (title) {
      url = `${API_URL}/products/?title=${encodeURIComponent(title)}`;
    } else {
      url = `${API_URL}/products/?offset=${offset}&limit=${limit}`;
    }

    const response = await axios.get(url);

    return {
      products: response.data,
      total: response.headers["x-total-count"] || response.data.length,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], total: 0 };
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
}

export async function createProduct(
  product: Omit<Product, "id">
): Promise<Product | null> {
  try {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    return null;
  }
}

export async function updateProduct(
  id: number,
  product: Partial<Product>
): Promise<Product | null> {
  try {
    const response = await axios.put(`${API_URL}/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    return null;
  }
}

export async function deleteProduct(id: number): Promise<boolean> {
  try {
    await axios.delete(`${API_URL}/products/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    return false;
  }
}
