import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilmForm from "../../components/FilmForm";
import { Film } from "../../services/filmService";

describe("FilmForm", () => {
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

  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form correctly in create mode", () => {
    render(<FilmForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByText("Add New Film")).toBeInTheDocument();
    expect(screen.getByTestId("film-form-submit")).toHaveTextContent("Create");

    // All fields should be empty
    expect(screen.getByLabelText("Title")).toHaveValue("");
    expect(screen.getByLabelText("Director")).toHaveValue("");
    expect(screen.getByLabelText("Overview")).toHaveValue("");
  });

  /* COMMENTED FOR 50% COVERAGE
  it("renders form correctly in edit mode", () => {
    render(
      <FilmForm
        film={mockFilm}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByText("Edit Film")).toBeInTheDocument();
    expect(screen.getByTestId("film-form-submit")).toHaveTextContent("Update");

    // Fields should be filled with film data
    expect(screen.getByLabelText("Title")).toHaveValue(mockFilm.title);
    expect(screen.getByLabelText("Director")).toHaveValue(mockFilm.director);
    expect(screen.getByLabelText("Overview")).toHaveValue(mockFilm.overview);
    expect(screen.getByLabelText("Poster URL")).toHaveValue(mockFilm.poster);
    expect(screen.getByLabelText("Release Date")).toHaveValue(
      mockFilm.releaseDate
    );
    expect(screen.getByLabelText("Rating")).toHaveValue(mockFilm.rating);
    expect(screen.getByLabelText("Duration (minutes)")).toHaveValue(
      mockFilm.duration
    );
    expect(screen.getByLabelText("Genres")).toHaveValue(
      mockFilm.genre.join(", ")
    );
  });
  */

  it("calls onSubmit with form data when submitted", () => {
    render(<FilmForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "New Film" },
    });
    fireEvent.change(screen.getByLabelText("Director"), {
      target: { value: "New Director" },
    });
    fireEvent.change(screen.getByLabelText("Overview"), {
      target: { value: "New overview" },
    });
    fireEvent.change(screen.getByLabelText("Poster URL"), {
      target: { value: "https://example.com/new.jpg" },
    });
    fireEvent.change(screen.getByLabelText("Release Date"), {
      target: { value: "2024-01-01" },
    });
    fireEvent.change(screen.getByLabelText("Rating"), {
      target: { value: "7.5" },
    });
    fireEvent.change(screen.getByLabelText("Duration (minutes)"), {
      target: { value: "150" },
    });
    fireEvent.change(screen.getByLabelText("Genres"), {
      target: { value: "Action, Comedy" },
    });

    // Submit the form
    fireEvent.click(screen.getByTestId("film-form-submit"));

    // Check if onSubmit was called with the right data
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: "New Film",
      director: "New Director",
      overview: "New overview",
      poster: "https://example.com/new.jpg",
      releaseDate: "2024-01-01",
      rating: 7.5,
      duration: 150,
      genre: ["Action", "Comedy"],
    });
  });

  /* COMMENTED FOR 50% COVERAGE
  it("calls onCancel when cancel button is clicked", () => {
    render(<FilmForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    fireEvent.click(screen.getByTestId("film-form-cancel"));

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
  */
});
