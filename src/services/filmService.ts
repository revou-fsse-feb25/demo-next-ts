import axios from "axios";

export interface Film {
  id?: string;
  title: string;
  overview: string;
  poster: string;
  backdrop?: string;
  releaseDate: string;
  rating: number;
  director: string;
  genre: string[];
  duration: number;
  isExternalImage?: boolean;
}

const API_URL = "https://64ca45bd700d50e3c7049e2f.mockapi.io/film";

export const filmService = {
  // Get all films
  async getFilms(): Promise<Film[]> {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch films");
    }
  },

  // Get film by ID
  async getFilmById(id: string): Promise<Film> {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch film with id ${id}`);
    }
  },

  // Create new film
  async createFilm(film: Film): Promise<Film> {
    try {
      const response = await axios.post(API_URL, film);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create film");
    }
  },

  // Update film
  async updateFilm(id: string, film: Film): Promise<Film> {
    try {
      const response = await axios.put(`${API_URL}/${id}`, film);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update film with id ${id}`);
    }
  },

  // Delete film
  async deleteFilm(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      throw new Error(`Failed to delete film with id ${id}`);
    }
  },
};
