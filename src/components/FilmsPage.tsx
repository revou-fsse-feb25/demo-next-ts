import React, { useState, useEffect } from "react";
import { filmService, Film } from "../services/filmService";
import FilmCard from "./FilmCard";
import FilmForm from "./FilmForm";

const FilmsPage = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [editingFilm, setEditingFilm] = useState<Film | null>(null);

  const fetchFilms = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await filmService.getFilms();
      setFilms(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  const handleAddFilm = () => {
    setEditingFilm(null);
    setIsFormVisible(true);
  };

  const handleEditFilm = (film: Film) => {
    setEditingFilm(film);
    setIsFormVisible(true);
  };

  const handleDeleteFilm = async (id: string) => {
    try {
      await filmService.deleteFilm(id);
      await fetchFilms();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete film");
    }
  };

  const handleFormSubmit = async (filmData: Omit<Film, "id">) => {
    try {
      if (editingFilm?.id) {
        await filmService.updateFilm(editingFilm.id, filmData);
      } else {
        await filmService.createFilm(filmData);
      }

      setIsFormVisible(false);
      setEditingFilm(null);
      await fetchFilms();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save film");
    }
  };

  const handleFormCancel = () => {
    setIsFormVisible(false);
    setEditingFilm(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Films</h1>
        <button
          onClick={handleAddFilm}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Add Film
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading films...</div>
      ) : (
        <>
          {isFormVisible && (
            <div className="mb-8">
              <FilmForm
                film={editingFilm || undefined}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
              />
            </div>
          )}

          {films.length === 0 && !isFormVisible ? (
            <div className="text-center py-8">
              No films found. Add your first film!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {films.map((film) => (
                <FilmCard
                  key={film.id}
                  film={film}
                  onEdit={handleEditFilm}
                  onDelete={handleDeleteFilm}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FilmsPage;
