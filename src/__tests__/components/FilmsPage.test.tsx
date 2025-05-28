import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import FilmsPage from "../../components/FilmsPage";
import { filmService, Film } from "../../services/filmService";

// Mock the film service
jest.mock("../../services/filmService");
const mockedFilmService = filmService as jest.Mocked<typeof filmService>;

describe("FilmsPage", () => {
  const mockFilms: Film[] = [
    {
      id: "1",
      title: "Test Film 1",
      overview: "Overview 1",
      poster: "https://example.com/poster1.jpg",
      releaseDate: "2023-01-01",
      rating: 8.5,
      director: "Director 1",
      genre: ["Action"],
      duration: 120,
    },
    {
      id: "2",
      title: "Test Film 2",
      overview: "Overview 2",
      poster: "https://example.com/poster2.jpg",
      releaseDate: "2023-02-01",
      rating: 7.5,
      director: "Director 2",
      genre: ["Drama"],
      duration: 110,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockedFilmService.getFilms.mockResolvedValue(mockFilms);
    mockedFilmService.createFilm.mockImplementation(async (film) => ({
      ...film,
      id: "3",
    }));
    mockedFilmService.updateFilm.mockImplementation(async (id, film) => ({
      ...film,
      id,
    }));
    mockedFilmService.deleteFilm.mockResolvedValue();
  });

  it("renders loading state initially", async () => {
    // Block the promise resolution to keep component in loading state
    let resolvePromise: Function;
    mockedFilmService.getFilms.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolvePromise = () => resolve(mockFilms);
        })
    );

    render(<FilmsPage />);

    // Check loading state is shown
    expect(screen.getByText("Loading films...")).toBeInTheDocument();
  });

  it("renders films after loading", async () => {
    await act(async () => {
      render(<FilmsPage />);
    });

    await waitFor(() =>
      expect(mockedFilmService.getFilms).toHaveBeenCalledTimes(1)
    );

    expect(screen.queryByText("Loading films...")).not.toBeInTheDocument();
    expect(screen.getByText("Test Film 1")).toBeInTheDocument();
    expect(screen.getByText("Test Film 2")).toBeInTheDocument();
  });

  it("shows no films message when film list is empty", async () => {
    mockedFilmService.getFilms.mockResolvedValueOnce([]);

    await act(async () => {
      render(<FilmsPage />);
    });

    await waitFor(() =>
      expect(mockedFilmService.getFilms).toHaveBeenCalledTimes(1)
    );

    expect(
      screen.getByText("No films found. Add your first film!")
    ).toBeInTheDocument();
  });

  it("handles unknown error type when fetching films", async () => {
    mockedFilmService.getFilms.mockRejectedValueOnce("Not an Error object");

    await act(async () => {
      render(<FilmsPage />);
    });

    await waitFor(() =>
      expect(mockedFilmService.getFilms).toHaveBeenCalledTimes(1)
    );

    expect(
      screen.getByText("Error: An unknown error occurred")
    ).toBeInTheDocument();
  });

  it("shows form when Add Film button is clicked", async () => {
    await act(async () => {
      render(<FilmsPage />);
    });

    await waitFor(() =>
      expect(screen.queryByText("Loading films...")).not.toBeInTheDocument()
    );

    await act(async () => {
      fireEvent.click(screen.getByText("Add Film"));
    });

    expect(screen.getByText("Add New Film")).toBeInTheDocument();
  });

  it("creates a new film when form is submitted", async () => {
    await act(async () => {
      render(<FilmsPage />);
    });

    await waitFor(() =>
      expect(screen.queryByText("Loading films...")).not.toBeInTheDocument()
    );

    // Open form
    await act(async () => {
      fireEvent.click(screen.getByText("Add Film"));
    });

    // Fill and submit form
    await act(async () => {
      fireEvent.change(screen.getByLabelText("Title"), {
        target: { value: "New Film" },
      });
      fireEvent.change(screen.getByLabelText("Director"), {
        target: { value: "New Director" },
      });
      fireEvent.change(screen.getByLabelText("Overview"), {
        target: { value: "New Overview" },
      });
      fireEvent.change(screen.getByLabelText("Poster URL"), {
        target: { value: "https://example.com/new.jpg" },
      });
      fireEvent.change(screen.getByLabelText("Release Date"), {
        target: { value: "2024-01-01" },
      });
      fireEvent.change(screen.getByLabelText("Rating"), {
        target: { value: "9" },
      });
      fireEvent.change(screen.getByLabelText("Duration (minutes)"), {
        target: { value: "130" },
      });
      fireEvent.change(screen.getByLabelText("Genres"), {
        target: { value: "Action, Adventure" },
      });
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId("film-form-submit"));
    });

    await waitFor(() =>
      expect(mockedFilmService.createFilm).toHaveBeenCalledTimes(1)
    );

    const expectedFilm = {
      title: "New Film",
      director: "New Director",
      overview: "New Overview",
      poster: "https://example.com/new.jpg",
      releaseDate: "2024-01-01",
      rating: 9,
      duration: 130,
      genre: ["Action", "Adventure"],
    };

    expect(mockedFilmService.createFilm).toHaveBeenCalledWith(expectedFilm);
    expect(mockedFilmService.getFilms).toHaveBeenCalledTimes(2); // Initial + after create
  });

  it("shows error when creating a film fails", async () => {
    mockedFilmService.createFilm.mockRejectedValueOnce(
      new Error("Failed to create film")
    );

    await act(async () => {
      render(<FilmsPage />);
    });

    await waitFor(() =>
      expect(screen.queryByText("Loading films...")).not.toBeInTheDocument()
    );

    // Open form
    await act(async () => {
      fireEvent.click(screen.getByText("Add Film"));
    });

    // Fill form
    await act(async () => {
      fireEvent.change(screen.getByLabelText("Title"), {
        target: { value: "New Film" },
      });
      fireEvent.change(screen.getByLabelText("Director"), {
        target: { value: "New Director" },
      });
      fireEvent.change(screen.getByLabelText("Overview"), {
        target: { value: "New Overview" },
      });
      fireEvent.change(screen.getByLabelText("Poster URL"), {
        target: { value: "https://example.com/new.jpg" },
      });
      fireEvent.change(screen.getByLabelText("Release Date"), {
        target: { value: "2024-01-01" },
      });
      fireEvent.change(screen.getByLabelText("Rating"), {
        target: { value: "9" },
      });
      fireEvent.change(screen.getByLabelText("Duration (minutes)"), {
        target: { value: "130" },
      });
      fireEvent.change(screen.getByLabelText("Genres"), {
        target: { value: "Action, Adventure" },
      });
    });

    // Submit form
    await act(async () => {
      fireEvent.click(screen.getByTestId("film-form-submit"));
    });

    await waitFor(() =>
      expect(mockedFilmService.createFilm).toHaveBeenCalledTimes(1)
    );

    // Check for error message
    expect(
      screen.getByText("Error: Failed to create film")
    ).toBeInTheDocument();
  });

  it("handles unknown error type when creating a film", async () => {
    mockedFilmService.createFilm.mockRejectedValueOnce("Not an Error object");

    await act(async () => {
      render(<FilmsPage />);
    });

    await waitFor(() =>
      expect(screen.queryByText("Loading films...")).not.toBeInTheDocument()
    );

    // Open form
    await act(async () => {
      fireEvent.click(screen.getByText("Add Film"));
    });

    // Fill form
    await act(async () => {
      fireEvent.change(screen.getByLabelText("Title"), {
        target: { value: "New Film" },
      });
      fireEvent.change(screen.getByLabelText("Director"), {
        target: { value: "New Director" },
      });
      fireEvent.change(screen.getByLabelText("Overview"), {
        target: { value: "New Overview" },
      });
      fireEvent.change(screen.getByLabelText("Poster URL"), {
        target: { value: "https://example.com/new.jpg" },
      });
      fireEvent.change(screen.getByLabelText("Release Date"), {
        target: { value: "2024-01-01" },
      });
      fireEvent.change(screen.getByLabelText("Rating"), {
        target: { value: "9" },
      });
      fireEvent.change(screen.getByLabelText("Duration (minutes)"), {
        target: { value: "130" },
      });
      fireEvent.change(screen.getByLabelText("Genres"), {
        target: { value: "Action, Adventure" },
      });
    });

    // Submit form
    await act(async () => {
      fireEvent.click(screen.getByTestId("film-form-submit"));
    });

    await waitFor(() =>
      expect(mockedFilmService.createFilm).toHaveBeenCalledTimes(1)
    );

    // Check for error message
    expect(screen.getByText("Error: Failed to save film")).toBeInTheDocument();
  });

  it("edits a film when edit button is clicked", async () => {
    await act(async () => {
      render(<FilmsPage />);
    });

    await waitFor(() =>
      expect(screen.queryByText("Loading films...")).not.toBeInTheDocument()
    );

    // Find and click the first film's edit button
    await act(async () => {
      const editButtons = screen.getAllByTestId("edit-button");
      fireEvent.click(editButtons[0]);
    });

    // Form should be populated with film data
    expect(screen.getByLabelText("Title")).toHaveValue("Test Film 1");

    // Change title and submit
    await act(async () => {
      fireEvent.change(screen.getByLabelText("Title"), {
        target: { value: "Updated Film 1" },
      });
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId("film-form-submit"));
    });

    await waitFor(() =>
      expect(mockedFilmService.updateFilm).toHaveBeenCalledTimes(1)
    );

    expect(mockedFilmService.updateFilm).toHaveBeenCalledWith(
      "1",
      expect.objectContaining({
        title: "Updated Film 1",
      })
    );
    expect(mockedFilmService.getFilms).toHaveBeenCalledTimes(2); // Initial + after update
  });

  it("shows error when updating a film fails", async () => {
    mockedFilmService.updateFilm.mockRejectedValueOnce(
      new Error("Failed to update film")
    );

    await act(async () => {
      render(<FilmsPage />);
    });

    await waitFor(() =>
      expect(screen.queryByText("Loading films...")).not.toBeInTheDocument()
    );

    // Find and click the first film's edit button
    await act(async () => {
      const editButtons = screen.getAllByTestId("edit-button");
      fireEvent.click(editButtons[0]);
    });

    // Change title and submit
    await act(async () => {
      fireEvent.change(screen.getByLabelText("Title"), {
        target: { value: "Updated Film 1" },
      });
      fireEvent.click(screen.getByTestId("film-form-submit"));
    });

    await waitFor(() =>
      expect(mockedFilmService.updateFilm).toHaveBeenCalledTimes(1)
    );

    // Check for error message
    expect(
      screen.getByText("Error: Failed to update film")
    ).toBeInTheDocument();
  });

  it("deletes a film when delete button is clicked", async () => {
    await act(async () => {
      render(<FilmsPage />);
    });

    await waitFor(() =>
      expect(screen.queryByText("Loading films...")).not.toBeInTheDocument()
    );

    // Find and click the first film's delete button
    await act(async () => {
      const deleteButtons = screen.getAllByTestId("delete-button");
      fireEvent.click(deleteButtons[0]);
    });

    await waitFor(() =>
      expect(mockedFilmService.deleteFilm).toHaveBeenCalledTimes(1)
    );

    expect(mockedFilmService.deleteFilm).toHaveBeenCalledWith("1");
    expect(mockedFilmService.getFilms).toHaveBeenCalledTimes(2); // Initial + after delete
  });

  it("shows error when deleting a film fails", async () => {
    mockedFilmService.deleteFilm.mockRejectedValueOnce(
      new Error("Failed to delete film")
    );

    await act(async () => {
      render(<FilmsPage />);
    });

    await waitFor(() =>
      expect(screen.queryByText("Loading films...")).not.toBeInTheDocument()
    );

    // Find and click the first film's delete button
    await act(async () => {
      const deleteButtons = screen.getAllByTestId("delete-button");
      fireEvent.click(deleteButtons[0]);
    });

    await waitFor(() =>
      expect(mockedFilmService.deleteFilm).toHaveBeenCalledTimes(1)
    );

    // Check for error message
    expect(
      screen.getByText("Error: Failed to delete film")
    ).toBeInTheDocument();
  });

  it("handles unknown error type when deleting a film", async () => {
    mockedFilmService.deleteFilm.mockRejectedValueOnce("Not an Error object");

    await act(async () => {
      render(<FilmsPage />);
    });

    await waitFor(() =>
      expect(screen.queryByText("Loading films...")).not.toBeInTheDocument()
    );

    // Find and click the first film's delete button
    await act(async () => {
      const deleteButtons = screen.getAllByTestId("delete-button");
      fireEvent.click(deleteButtons[0]);
    });

    await waitFor(() =>
      expect(mockedFilmService.deleteFilm).toHaveBeenCalledTimes(1)
    );

    // Check for error message
    expect(
      screen.getByText("Error: Failed to delete film")
    ).toBeInTheDocument();
  });

  it("hides form when cancel button is clicked", async () => {
    await act(async () => {
      render(<FilmsPage />);
    });

    await waitFor(() =>
      expect(screen.queryByText("Loading films...")).not.toBeInTheDocument()
    );

    // Open form
    await act(async () => {
      fireEvent.click(screen.getByText("Add Film"));
    });

    expect(screen.getByText("Add New Film")).toBeInTheDocument();

    // Click cancel
    await act(async () => {
      fireEvent.click(screen.getByTestId("film-form-cancel"));
    });

    // Form should be hidden
    expect(screen.queryByText("Add New Film")).not.toBeInTheDocument();
  });

  it("shows error message when fetching films fails", async () => {
    mockedFilmService.getFilms.mockRejectedValueOnce(
      new Error("Failed to fetch films")
    );

    await act(async () => {
      render(<FilmsPage />);
    });

    await waitFor(() =>
      expect(screen.queryByText("Loading films...")).not.toBeInTheDocument()
    );

    expect(
      screen.getByText("Error: Failed to fetch films")
    ).toBeInTheDocument();
  });
});
