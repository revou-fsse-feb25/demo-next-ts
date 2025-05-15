export interface Movie {
  id: string;
  title: string;
  overview: string;
  poster: string;
  backdrop: string;
  releaseDate: string;
  rating: number;
  director: string;
  genre: string[];
  duration: number;
  isExternalImage?: boolean;
}

// API endpoint
const API_URL = 'https://64ca45bd700d50e3c7049e2f.mockapi.io/film';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Clean and format movie data
const formatMovie = (movie: any): Movie => {
  // Normalize rating to a scale of 0-10
  let normalizedRating = movie.rating;
  
  // If rating is > 10, assume it's on a 0-100 scale and convert to 0-10
  if (typeof normalizedRating === 'number' && normalizedRating > 10) {
    normalizedRating = normalizedRating / 10;
  }
  
  // If rating is < 1, might be on a 0-1 scale, multiply by 10
  if (typeof normalizedRating === 'number' && normalizedRating > 0 && normalizedRating < 1) {
    normalizedRating = normalizedRating * 10;
  }
  
  return {
    ...movie,
    // Ensure rating is always a number and correctly normalized
    rating: typeof normalizedRating === 'number' ? parseFloat(normalizedRating.toFixed(1)) : 0,
    // Ensure genre is always an array
    genre: Array.isArray(movie.genre) ? movie.genre : [],
    // Mark all API images as external
    isExternalImage: true
  };
};

// Get all movies
export async function getMovies(): Promise<Movie[]> {
  try {
    const response = await fetch(API_URL, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    return data.map(formatMovie);
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

// Get movie by ID
export async function getMovie(id: string | number): Promise<Movie> {
  try {
    const response = await fetch(`${API_URL}/${id}`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to fetch movie with ID ${id}`);
    }
    const data = await response.json();
    return formatMovie(data);
  } catch (error) {
    console.error(`Error fetching movie ${id}:`, error);
    throw error;
  }
}

// Create a new movie
export async function createMovie(movieData: Omit<Movie, 'id'>): Promise<Movie> {
  try {
    // Normalize rating before sending to API
    const normalizedData = {
      ...movieData,
      rating: typeof movieData.rating === 'number' ? movieData.rating : 0
    };
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(normalizedData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create movie');
    }
    
    const data = await response.json();
    return formatMovie(data);
  } catch (error) {
    console.error('Error creating movie:', error);
    throw error;
  }
}

// Update an existing movie
export async function updateMovie(id: string | number, movieData: Partial<Movie>): Promise<Movie> {
  try {
    // Normalize rating before sending to API
    const normalizedData = {
      ...movieData,
      rating: typeof movieData.rating === 'number' ? movieData.rating : 0
    };
    
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(normalizedData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update movie with ID ${id}`);
    }
    
    const data = await response.json();
    return formatMovie(data);
  } catch (error) {
    console.error(`Error updating movie ${id}:`, error);
    throw error;
  }
}

// Delete a movie
export async function deleteMovie(id: string | number): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete movie with ID ${id}`);
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting movie ${id}:`, error);
    return false;
  }
}

// Get popular movies (for homepage)
export async function getPopularMovies(): Promise<Movie[]> {
  try {
    const movies = await getMovies();
    // Sort by rating (descending) and return top 4
    return [...movies]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
}

// Get movie recommendations
export async function getMovieRecommendations(id: string | number): Promise<Movie[]> {
  try {
    const movies = await getMovies();
    const movie = movies.find(m => m.id.toString() === id.toString());
    
    if (!movie) {
      return [];
    }
    
    // Simple recommendation logic: same director or other criteria
    return movies
      .filter(m => m.id.toString() !== id.toString() && 
        (m.director === movie.director))
      .slice(0, 3);
  } catch (error) {
    console.error(`Error fetching recommendations for movie ${id}:`, error);
    return [];
  }
}

// Get movie watch guides (static content)
export async function getMovieGuides(): Promise<{ id: number, title: string, content: string }[]> {
  await delay(300);
  return [
    {
      id: 1,
      title: "How to get the most out of classic movies",
      content: "Classic films often explore profound philosophical and existential questions. Pay attention to the cinematography techniques, historical context, and subtle nuances that have made these films stand the test of time."
    },
    {
      id: 2,
      title: "Understanding film genres",
      content: "Different film genres employ distinctive storytelling techniques and visual styles. Learn to identify these patterns to develop a deeper appreciation for the craft and artistry behind your favorite movies."
    },
    {
      id: 3,
      title: "Movie night essentials",
      content: "For the perfect movie night, ensure proper audio setup, adjust lighting for minimal screen glare, prepare snacks beforehand, and consider watching with subtitles to catch all the dialogue details."
    }
  ];
} 