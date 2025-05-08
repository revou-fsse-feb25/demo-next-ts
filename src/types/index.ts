/**
 * Type Definitions for Todo Application
 * 
 * This file contains all the types used throughout the application.
 * See the TODO IMPLEMENTATION GUIDE in src/app/page.tsx for the full implementation sequence.
 * This file covers step 2.1 in the guide.
 */

// Define the structure of a Todo item
export interface Todo {
  title: string;
  completed: boolean;
  id: string;
}

// Define the form input for creating/editing a Todo
export interface TodoFormInput {
  title: string;
} 