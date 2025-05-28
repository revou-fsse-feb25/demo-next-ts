import React, { useState, useEffect } from "react";
import { Film } from "../services/filmService";

interface FilmFormProps {
  film?: Film;
  onSubmit: (film: Omit<Film, "id">) => void;
  onCancel: () => void;
}

const FilmForm = ({ film, onSubmit, onCancel }: FilmFormProps) => {
  const [formData, setFormData] = useState<Omit<Film, "id">>({
    title: "",
    director: "",
    overview: "",
    poster: "",
    releaseDate: new Date().toISOString().split("T")[0],
    rating: 0,
    duration: 0,
    genre: [],
  });

  useEffect(() => {
    if (film) {
      setFormData({
        title: film.title,
        director: film.director,
        overview: film.overview,
        poster: film.poster,
        releaseDate: film.releaseDate,
        rating: film.rating,
        duration: film.duration,
        genre: film.genre,
      });
    }
  }, [film]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "rating") {
      setFormData({
        ...formData,
        [name]: parseFloat(value),
      });
    } else if (name === "duration") {
      setFormData({
        ...formData,
        [name]: parseInt(value, 10),
      });
    } else if (name === "genre") {
      setFormData({
        ...formData,
        [name]: value
          .split(",")
          .map((g) => g.trim())
          .filter((g) => g !== ""),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {film ? "Edit Film" : "Add New Film"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="director"
            className="block text-gray-700 font-medium mb-2"
          >
            Director
          </label>
          <input
            type="text"
            id="director"
            name="director"
            required
            value={formData.director}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="overview"
            className="block text-gray-700 font-medium mb-2"
          >
            Overview
          </label>
          <textarea
            id="overview"
            name="overview"
            required
            value={formData.overview}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="poster"
            className="block text-gray-700 font-medium mb-2"
          >
            Poster URL
          </label>
          <input
            type="url"
            id="poster"
            name="poster"
            required
            value={formData.poster}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="releaseDate"
            className="block text-gray-700 font-medium mb-2"
          >
            Release Date
          </label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            required
            value={formData.releaseDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block text-gray-700 font-medium mb-2"
          >
            Rating
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            required
            min="0"
            max="10"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="duration"
            className="block text-gray-700 font-medium mb-2"
          >
            Duration (minutes)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            required
            min="1"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="genre"
            className="block text-gray-700 font-medium mb-2"
          >
            Genres
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            required
            placeholder="Action, Drama, Comedy"
            value={formData.genre.join(", ")}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
          <p className="text-sm text-gray-500 mt-1">
            Separate genres with commas
          </p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            data-testid="film-form-cancel"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            data-testid="film-form-submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            {film ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilmForm;
