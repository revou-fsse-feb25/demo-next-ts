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

## Step-by-Step Implementation Guide

### 1. Setup Project

```bash
# Create a new Next.js app with TypeScript and App Router
npx create-next-app@latest cat-rental-app --typescript --eslint --app --tailwind --no-src-dir --import-alias "@/*"

# Navigate to the project directory
cd cat-rental-app

# Install additional dependencies
pnpm add axios
```

### 2. Configure Tailwind CSS

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          // Add your primary color palette
        },
        accent: {
          DEFAULT: '#8b5cf6',
          hover: '#7c3aed',
        },
      }
    },
  },
  plugins: [],
}
```

### 3. Setup Global CSS

```css
/* app/globals.css */
@import "tailwindcss/preflight";
@tailwind utilities;

:root {
  --foreground: #ededed;
  --background: #0a0a0a;
}

body {
  @apply bg-gray-900 text-white;
}

html {
  @apply dark;
}

/* Add custom utilities */
```

### 4. Create Type Definitions

```typescript
// app/types.ts
export interface Cat {
  id: string;
  name: string;
  breed: string;
  age: number;
  description: string;
  price: string;
  imageUrl: string;
  availability: boolean;
  createdAt: string;
}

export type CatFormData = Omit<Cat, "id" | "createdAt">;
```

### 5. Setup API Service

```typescript
// app/services/catService.ts
import axios from 'axios';
import { Cat, CatFormData } from '../types';

// Create API instance
const api = axios.create({
  baseURL: 'https://64ca45bd700d50e3c7049e2f.mockapi.io/cats',
  headers: { 'Content-Type': 'application/json' },
});

// Implement CRUD functions
export const fetchCats = async (): Promise<Cat[]> => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    console.error('Error fetching cats:', error);
    throw new Error('Failed to fetch cats');
  }
};

// Add more CRUD functions...
```

### 6. Create Reusable Components

Create the following components:
- Modal component for dialogs
- CatCard component for card view
- CatRow component for list view
- CatForm component for adding/editing cats

### 7. Implement Main Page

Create the main page with state management and CRUD operations.

## Mini-Exercises

### Exercise: Implement Modal for Adding and Editing Cats

In this exercise, you'll implement a reusable modal component and integrate it with the cat form for adding and editing cats. You'll also improve the styling of the action buttons.

**Steps:**

1. **Create a Modal Component:**
   ```jsx
   // app/components/Modal.tsx
   import { ReactNode, useEffect } from 'react';

   interface ModalProps {
     isOpen: boolean;
     onClose: () => void;
     title: string;
     children: ReactNode;
   }

   export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
     // Close on escape key press
     useEffect(() => {
       const handleEsc = (e: KeyboardEvent) => {
         if (e.key === 'Escape' && isOpen) onClose();
       };
       window.addEventListener('keydown', handleEsc);
       return () => window.removeEventListener('keydown', handleEsc);
     }, [isOpen, onClose]);

     if (!isOpen) return null;

     return (
       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60">
         <div 
           className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full"
           onClick={e => e.stopPropagation()}
         >
           <div className="flex items-center justify-between p-4 border-b border-gray-700">
             <h2 className="text-xl font-semibold">{title}</h2>
             <button
               onClick={onClose}
               className="text-gray-400 hover:text-white"
             >
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
           </div>
           <div className="p-6">{children}</div>
         </div>
       </div>
     );
   }
   ```

2. **Update Button Styling:**
   ```jsx
   // Style for primary button (Add Cat)
   <button
     onClick={handleAddCat}
     className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg transform transition-transform hover:scale-105"
   >
     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
     </svg>
     <span>Add New Cat</span>
   </button>

   // Style for action buttons (Edit, Delete)
   <div className="flex space-x-2 mt-4">
     <button
       onClick={() => onEdit(cat)}
       className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center gap-1 transition-colors"
     >
       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
       </svg>
       Edit
     </button>
   </div>
   ```

3. **Implement State for Modal:**
   ```jsx
   // In your page component
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedCat, setSelectedCat] = useState<Cat | undefined>(undefined);

   const handleAddCat = () => {
     setSelectedCat(undefined);
     setIsModalOpen(true);
   };

   const handleEditCat = (cat: Cat) => {
     setSelectedCat(cat);
     setIsModalOpen(true);
   };

   const handleCloseModal = () => {
     setIsModalOpen(false);
   };
   ```

4. **Render the Modal with Form:**
   ```jsx
   <Modal
     isOpen={isModalOpen}
     onClose={handleCloseModal}
     title={selectedCat ? 'Edit Cat' : 'Add New Cat'}
   >
     <CatForm
       cat={selectedCat}
       onSubmit={handleFormSubmit}
       onCancel={handleCloseModal}
     />
   </Modal>
   ```

5. **Add Animation to Modal:**
   ```css
   /* In your CSS file */
   @keyframes fadeIn {
     from { opacity: 0; transform: translateY(-10px); }
     to { opacity: 1; transform: translateY(0); }
   }
   
   .modal-content {
     animation: fadeIn 0.2s ease-out;
   }
   ```

**Bonus:**
- Add a backdrop blur effect to the modal background
- Implement focus trapping within the modal for accessibility
- Add a confirmation dialog when deleting cats

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
