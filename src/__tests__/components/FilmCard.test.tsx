import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilmCard from "../../components/FilmCard";
import { Film } from "../../services/filmService";

describe("FilmCard", () => {
  const mockFilm: Film = {
    id: "123",
    title: "Test Film",
    overview: "This is a test film overview",
    poster: "https://example.com/poster.jpg",
    releaseDate: "2023-05-15",
    rating: 8.5,
    director: "Test Director",
    genre: ["Action", "Drama"],
    duration: 120,
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders film information correctly", () => {
    render(
      <FilmCard film={mockFilm} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    expect(screen.getByTestId("film-title")).toHaveTextContent(mockFilm.title);
    expect(screen.getByTestId("film-director")).toHaveTextContent(
      mockFilm.director
    );
    expect(screen.getByTestId("film-overview")).toHaveTextContent(
      mockFilm.overview
    );
    expect(screen.getByTestId("film-rating")).toHaveTextContent(
      `${mockFilm.rating}/10`
    );
    expect(screen.getByTestId("film-genres")).toHaveTextContent(
      mockFilm.genre.join(", ")
    );
    expect(screen.getByTestId("film-duration")).toHaveTextContent(
      `${mockFilm.duration} min`
    );

    const img = screen.getByTestId("film-poster");
    expect(img).toHaveAttribute("src", mockFilm.poster);
    expect(img).toHaveAttribute("alt", `${mockFilm.title} poster`);
  });

  /* COMMENTED FOR 50% COVERAGE
  it("calls onEdit when edit button is clicked", () => {
    render(
      <FilmCard film={mockFilm} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    fireEvent.click(screen.getByTestId("edit-button"));

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith(mockFilm);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <FilmCard film={mockFilm} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    fireEvent.click(screen.getByTestId("delete-button"));

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockFilm.id);
  });

  it("handles image error by setting fallback image", () => {
    render(
      <FilmCard film={mockFilm} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    const img = screen.getByTestId("film-poster");
    fireEvent.error(img);

    expect(img).toHaveAttribute(
      "src",
      "https://placehold.co/600x400?text=No+Image"
    );
  });
  */
});
