"use client";

import { useState, useEffect } from "react";
import { Film, filmService } from "@/services/filmService";
import FilmCard from "@/components/FilmCard";
import FilmForm from "@/components/FilmForm";

export default function FilmsPage() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingFilm, setEditingFilm] = useState<Film | undefined>(undefined);

  // Fetch films on component mount
  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await filmService.getFilms();
      setFilms(data);
    } catch (err) {
      setError("Failed to fetch films. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFilm = (film: Film) => {
    filmService
      .createFilm(film)
      .then((newFilm) => {
        setFilms([...films, newFilm]);
        setShowForm(false);
      })
      .catch((err) => {
        setError("Failed to create film. Please try again.");
        console.error(err);
      });
  };

  const handleUpdateFilm = (film: Film) => {
    if (!film.id) return;

    filmService
      .updateFilm(film.id, film)
      .then((updatedFilm) => {
        setFilms(films.map((f) => (f.id === updatedFilm.id ? updatedFilm : f)));
        setEditingFilm(undefined);
        setShowForm(false);
      })
      .catch((err) => {
        setError("Failed to update film. Please try again.");
        console.error(err);
      });
  };

  const handleDeleteFilm = (id: string) => {
    if (confirm("Are you sure you want to delete this film?")) {
      filmService
        .deleteFilm(id)
        .then(() => {
          setFilms(films.filter((f) => f.id !== id));
        })
        .catch((err) => {
          setError("Failed to delete film. Please try again.");
          console.error(err);
        });
    }
  };

  const handleEdit = (film: Film) => {
    setEditingFilm(film);
    setShowForm(true);
  };

  const handleFormSubmit = (film: Film) => {
    if (editingFilm) {
      handleUpdateFilm(film);
    } else {
      handleCreateFilm(film);
    }
  };

  const handleFormCancel = () => {
    setEditingFilm(undefined);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8" data-testid="films-page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Films</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setEditingFilm(undefined);
            setShowForm(true);
          }}
          data-testid="add-film-button"
        >
          Add Film
        </button>
      </div>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
          data-testid="error-message"
        >
          {error}
        </div>
      )}

      {showForm && (
        <div
          className="mb-8 p-6 border rounded-lg shadow-lg"
          data-testid="film-form-container"
        >
          <h2 className="text-xl font-bold mb-4">
            {editingFilm ? "Edit Film" : "Add New Film"}
          </h2>
          <FilmForm
            film={editingFilm}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </div>
      )}

      {loading ? (
        <div className="text-center py-8" data-testid="loading-indicator">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2">Loading films...</p>
        </div>
      ) : films.length === 0 ? (
        <div
          className="text-center py-8 text-gray-500"
          data-testid="no-films-message"
        >
          No films available. Add a new film to get started.
        </div>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-testid="films-grid"
        >
          {films.map((film) => (
            <FilmCard
              key={film.id}
              film={film}
              onEdit={handleEdit}
              onDelete={handleDeleteFilm}
            />
          ))}
        </div>
      )}
    </div>
  );
}
