import axios from "axios";
import { filmService, Film } from "../../services/filmService";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("filmService", () => {
  const mockFilms: Film[] = [
    {
      id: "1",
      title: "Dark Knight",
      overview: "Seorang batman menjadi dark knight",
      poster: "https://example.com/poster1.jpg",
      releaseDate: "1984-10-16",
      rating: 9,
      director: "Nolan",
      genre: ["Action"],
      duration: 226,
    },
    {
      id: "2",
      title: "Superman",
      overview: "Man of Steel",
      poster: "https://example.com/poster2.jpg",
      releaseDate: "2001-06-19",
      rating: 7.8,
      director: "Zack Snyder",
      genre: ["Action"],
      duration: 143,
    },
  ];

  const mockFilm = mockFilms[0];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getFilms", () => {
    it("should fetch all films successfully", async () => {
      // Arrange
      mockedAxios.get.mockResolvedValueOnce({ data: mockFilms });

      // Act
      const result = await filmService.getFilms();

      // Assert
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://64ca45bd700d50e3c7049e2f.mockapi.io/film"
      );
      expect(result).toEqual(mockFilms);
    });

    /* COMMENTED FOR 50% COVERAGE
    it("should throw an error when fetching films fails", async () => {
      // Arrange
      mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

      // Act & Assert
      await expect(filmService.getFilms()).rejects.toThrow(
        "Failed to fetch films"
      );
    });
    */
  });

  describe("getFilmById", () => {
    it("should fetch a film by id successfully", async () => {
      // Arrange
      mockedAxios.get.mockResolvedValueOnce({ data: mockFilm });
      const filmId = "1";

      // Act
      const result = await filmService.getFilmById(filmId);

      // Assert
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://64ca45bd700d50e3c7049e2f.mockapi.io/film/${filmId}`
      );
      expect(result).toEqual(mockFilm);
    });

    /* COMMENTED FOR 50% COVERAGE
    it("should throw an error when fetching film by id fails", async () => {
      // Arrange
      const filmId = "999";
      mockedAxios.get.mockRejectedValueOnce(new Error("Not found"));

      // Act & Assert
      await expect(filmService.getFilmById(filmId)).rejects.toThrow(
        `Failed to fetch film with id ${filmId}`
      );
    });
    */
  });

  /* COMMENTED FOR 50% COVERAGE
  describe("createFilm", () => {
    it("should create a new film successfully", async () => {
      // Arrange
      const newFilm: Film = {
        title: "New Movie",
        overview: "A new movie",
        poster: "https://example.com/poster.jpg",
        releaseDate: "2023-01-01",
        rating: 8,
        director: "Director Name",
        genre: ["Action", "Drama"],
        duration: 120,
      };

      const createdFilm = { ...newFilm, id: "3" };
      mockedAxios.post.mockResolvedValueOnce({ data: createdFilm });

      // Act
      const result = await filmService.createFilm(newFilm);

      // Assert
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "https://64ca45bd700d50e3c7049e2f.mockapi.io/film",
        newFilm
      );
      expect(result).toEqual(createdFilm);
    });

    it("should throw an error when creating film fails", async () => {
      // Arrange
      const newFilm: Film = {
        title: "New Movie",
        overview: "A new movie",
        poster: "https://example.com/poster.jpg",
        releaseDate: "2023-01-01",
        rating: 8,
        director: "Director Name",
        genre: ["Action", "Drama"],
        duration: 120,
      };

      mockedAxios.post.mockRejectedValueOnce(new Error("Failed to create"));

      // Act & Assert
      await expect(filmService.createFilm(newFilm)).rejects.toThrow(
        "Failed to create film"
      );
    });
  });
  */

  describe("updateFilm", () => {
    it("should update a film successfully", async () => {
      // Arrange
      const filmId = "1";
      const updatedFilm = { ...mockFilm, title: "Updated Title" };
      mockedAxios.put.mockResolvedValueOnce({ data: updatedFilm });

      // Act
      const result = await filmService.updateFilm(filmId, updatedFilm);

      // Assert
      expect(mockedAxios.put).toHaveBeenCalledWith(
        `https://64ca45bd700d50e3c7049e2f.mockapi.io/film/${filmId}`,
        updatedFilm
      );
      expect(result).toEqual(updatedFilm);
    });

    /* COMMENTED FOR 50% COVERAGE
    it("should throw an error when updating film fails", async () => {
      // Arrange
      const filmId = "1";
      const updatedFilm = { ...mockFilm, title: "Updated Title" };
      mockedAxios.put.mockRejectedValueOnce(new Error("Failed to update"));

      // Act & Assert
      await expect(filmService.updateFilm(filmId, updatedFilm)).rejects.toThrow(
        `Failed to update film with id ${filmId}`
      );
    });
    */
  });

  /* COMMENTED FOR 50% COVERAGE
  describe("deleteFilm", () => {
    it("should delete a film successfully", async () => {
      // Arrange
      const filmId = "1";
      mockedAxios.delete.mockResolvedValueOnce({});

      // Act
      await filmService.deleteFilm(filmId);

      // Assert
      expect(mockedAxios.delete).toHaveBeenCalledWith(
        `https://64ca45bd700d50e3c7049e2f.mockapi.io/film/${filmId}`
      );
    });

    it("should throw an error when deleting film fails", async () => {
      // Arrange
      const filmId = "1";
      mockedAxios.delete.mockRejectedValueOnce(new Error("Failed to delete"));

      // Act & Assert
      await expect(filmService.deleteFilm(filmId)).rejects.toThrow(
        `Failed to delete film with id ${filmId}`
      );
    });
  });
  */
});
