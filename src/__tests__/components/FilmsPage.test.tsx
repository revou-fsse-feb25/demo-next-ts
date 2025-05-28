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
});
