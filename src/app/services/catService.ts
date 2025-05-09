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
  // TODO: Implement fetching all cats
  try{
    const response = await axios.get(API_URL)
    return response.data
  } catch (error){
    console.log(error)
    throw new Error('failed to fetch data')
  }
  // return [];
};

/**
 * Fetch a specific cat by ID
 * @param id - The cat's unique identifier
 * @returns Promise with cat data
 */
export const fetchCatById = async (id: string): Promise<Cat> => {
  // TODO: Implement fetching a cat by ID
  throw new Error('Not implemented');
};

/**
 * Create a new cat
 * @param catData - The cat data to create
 * @returns Promise with the newly created cat
 */
export const createCat = async (catData: CatFormData): Promise<Cat> => {
  // TODO: Implement creating a new cat
  throw new Error('Not implemented');
};

/**
 * Update an existing cat
 * @param id - The cat's unique identifier
 * @param catData - The partial cat data to update
 * @returns Promise with the updated cat
 */
export const updateCat = async (id: string, catData: Partial<CatFormData>): Promise<Cat> => {
  // TODO: Implement updating a cat
  throw new Error('Not implemented');
};

/**
 * Delete a cat
 * @param id - The cat's unique identifier
 */
export const deleteCat = async (id: string): Promise<void> => {
  // TODO: Implement deleting a cat
}; 