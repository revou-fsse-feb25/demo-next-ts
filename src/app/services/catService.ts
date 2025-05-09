import axios from 'axios';
import { Cat, CatFormData } from '../types';

// Base API URL for cat data
const API_URL = 'https://64ca45bd700d50e3c7049e2f.mockapi.io/cats';

// Create an axios instance with common configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch all cats from the API
 * @returns Promise with an array of cats
 */
export const fetchCats = async (): Promise<Cat[]> => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    console.error('Error fetching cats:', error);
    throw new Error('Failed to fetch cats');
  }
};

/**
 * Fetch a specific cat by ID
 * @param id - The cat's unique identifier
 * @returns Promise with cat data
 */
export const fetchCatById = async (id: string): Promise<Cat> => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cat ${id}:`, error);
    throw new Error('Failed to fetch cat');
  }
};

/**
 * Create a new cat
 * @param catData - The cat data to create
 * @returns Promise with the newly created cat
 */
export const createCat = async (catData: CatFormData): Promise<Cat> => {
  try {
    const response = await api.post('', catData);
    return response.data;
  } catch (error) {
    console.error('Error creating cat:', error);
    throw new Error('Failed to create cat');
  }
};

/**
 * Update an existing cat
 * @param id - The cat's unique identifier
 * @param catData - The partial cat data to update
 * @returns Promise with the updated cat
 */
export const updateCat = async (id: string, catData: Partial<CatFormData>): Promise<Cat> => {
  try {
    const response = await api.put(`/${id}`, catData);
    return response.data;
  } catch (error) {
    console.error(`Error updating cat ${id}:`, error);
    throw new Error('Failed to update cat');
  }
};

/**
 * Delete a cat
 * @param id - The cat's unique identifier
 */
export const deleteCat = async (id: string): Promise<void> => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error(`Error deleting cat ${id}:`, error);
    throw new Error('Failed to delete cat');
  }
}; 