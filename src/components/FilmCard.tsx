import React, { useState } from "react";
import { Film } from "../services/filmService";

interface FilmCardProps {
  film: Film;
  onEdit: (film: Film) => void;
  onDelete: (id: string) => void;
}

const FilmCard = ({ film, onEdit, onDelete }: FilmCardProps) => {
  const [imgSrc, setImgSrc] = useState<string>(film.poster);

  const handleImageError = () => {
    setImgSrc("https://placehold.co/600x400?text=No+Image");
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img
        data-testid="film-poster"
        src={imgSrc}
        alt={`${film.title} poster`}
        className="w-full h-64 object-cover"
        onError={handleImageError}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2" data-testid="film-title">
          {film.title}
        </div>
        <p className="text-gray-700 text-base mb-2" data-testid="film-director">
          <span className="font-medium">Director:</span> {film.director}
        </p>
        <p className="text-gray-700 text-base mb-2" data-testid="film-rating">
          <span className="font-medium">Rating:</span> {film.rating}/10
        </p>
        <p className="text-gray-700 text-base mb-2" data-testid="film-duration">
          <span className="font-medium">Duration:</span> {film.duration} min
        </p>
        <p className="text-gray-700 text-base mb-2" data-testid="film-genres">
          <span className="font-medium">Genres:</span> {film.genre.join(", ")}
        </p>
        <p className="text-gray-700 text-base" data-testid="film-overview">
          {film.overview}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between">
        <button
          data-testid="edit-button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => onEdit(film)}
        >
          Edit
        </button>
        <button
          data-testid="delete-button"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => onDelete(film.id!)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FilmCard;
