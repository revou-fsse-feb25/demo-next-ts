# Cat Rental App

A modern Next.js application for managing cat rentals, featuring a responsive UI with dark mode and full CRUD operations.

## Features

- **Dark Mode UI**: Clean, modern interface with Tailwind CSS
- **CRUD Operations**: Full API integration for managing cat rentals
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Interactive UI**: Card and list view options with smooth transitions
- **Modal Dialogs**: User-friendly forms for adding and editing cats

## Tech Stack

- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Axios for API requests

## API Endpoints

The application uses the following API endpoints:

- `GET https://64ca45bd700d50e3c7049e2f.mockapi.io/cats` - Fetch all cats
- `GET https://64ca45bd700d50e3c7049e2f.mockapi.io/cats/:id` - Fetch a specific cat
- `POST https://64ca45bd700d50e3c7049e2f.mockapi.io/cats` - Add a new cat
- `PUT https://64ca45bd700d50e3c7049e2f.mockapi.io/cats/:id` - Update a cat
- `DELETE https://64ca45bd700d50e3c7049e2f.mockapi.io/cats/:id` - Delete a cat

## Implementation Guide

Follow these steps to implement the Cat Rental App:

### 1. Set Up Components

Create these essential components in your project:
- **Modal**: A reusable overlay component for forms and dialogs
- **CatForm**: Form component for adding/editing cats
- **CatCard**: Card component for displaying cats in grid view
- **CatRow**: Row component for displaying cats in table view

### 2. Implement API Service

Create a service layer using Axios to handle API calls:
- Set up a base API client
- Create functions for fetching, creating, updating, and deleting cats
- Add proper error handling for API requests

### 3. Build Main Page

Implement the main page with:
- State management for cats, loading states, errors, etc.
- Toggle functionality between card and list views
- Integration with the API service
- Modal handling for adding/editing cats

### 4. Style the Application

Apply consistent styling with Tailwind CSS:
- Design a responsive layout that works on all devices
- Create a cohesive dark mode color theme
- Add interactive elements like hover effects and animations
- Ensure consistent spacing and typography

## Mini-Exercise

### Implement Modal for Adding and Editing Cats

In this exercise, you'll build a modal system for cat management:

**Tasks:**

1. **Create a Modal Component**
   - Build a reusable modal that can be opened and closed
   - Include a header with title and close button
   - Support keyboard interactions (ESC key to close)
   - Style with proper positioning and background overlay

2. **Style Action Buttons**
   - Design visually appealing buttons for adding, editing, and deleting cats
   - Add gradient backgrounds and hover effects
   - Ensure consistent styling between card and list views
   - Make buttons responsive with appropriate spacing

3. **Implement Modal State Management**
   - Add state variables to track modal open/close status
   - Create handlers for opening the modal (add/edit modes)
   - Set up a system to pass the selected cat data when editing
   - Implement proper modal closing behavior

4. **Enhance User Experience**
   - Add animations for modal open/close
   - Prevent page scrolling when modal is open
   - Implement backdrop click to close
   - Add visual feedback for button interactions

**Bonus Challenges:**
- Add a backdrop blur effect
- Implement keyboard focus trapping for accessibility
- Create a confirmation dialog for delete actions

## Running the App

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Contribution

Feel free to contribute to this project by creating issues or pull requests. All contributions are welcome!

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
