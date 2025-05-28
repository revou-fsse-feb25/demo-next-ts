# Film CRUD Application

A simple application for managing film information with Create, Read, Update, and Delete functionality, built with Next.js and TypeScript.

## Features

- View a list of films
- Add new films
- Edit existing films
- Delete films
- Complete test coverage

## Technologies Used

- Next.js
- TypeScript
- React
- Axios
- Jest & React Testing Library
- Tailwind CSS

## Project Structure

The project follows a structured approach:

- `src/services/filmService.ts` - API service layer for interacting with the backend
- `src/components/` - React components
  - `FilmCard.tsx` - Component for displaying individual film information
  - `FilmForm.tsx` - Form component for creating and editing films
  - `FilmsPage.tsx` - Main page component with CRUD functionality
- `src/__tests__/` - Test files organized by type
  - `services/` - Tests for service layer
  - `components/` - Tests for React components

## Testing

The project aims for high test coverage, with comprehensive unit tests for:

- Service layer API functions
- React components
- Error handling scenarios

Run tests with:

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage
```

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## API Endpoint

The application interacts with a mock API endpoint:
`https://64ca45bd700d50e3c7049e2f.mockapi.io/film`
