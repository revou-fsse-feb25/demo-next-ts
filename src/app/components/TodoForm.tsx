'use client';

/**
 * TodoForm Component
 * 
 * This component handles creating and editing todos with form validation.
 * See the TODO IMPLEMENTATION GUIDE in src/app/page.tsx for the full implementation sequence.
 * This file covers steps 4.1 to 4.4 in the guide.
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TodoFormInput } from '@/types';

interface TodoFormProps {
  onSubmit: (data: TodoFormInput) => Promise<void>;
  initialData?: { id: string; title: string };
}

export default function TodoForm({ onSubmit, initialData }: TodoFormProps) {
  // Set up React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TodoFormInput>({
    defaultValues: {
      title: initialData?.title || ''
    }
  });
  
  // Set up state for submission errors
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Implement form submission handler
  const handleFormSubmit = async (data: TodoFormInput) => {
    try {
      setSubmitError(null);
      await onSubmit(data);
      
      // Reset form after successful submission
      if (!initialData) {
        reset();
      }
    } catch (error) {
      // Handle any errors
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    }
  };
  
  // Render form with dark mode styles
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="mb-6">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : initialData ? 'Update' : 'Add'}
          </button>
        </div>
        
        {/* Display validation errors */}
        {errors.title && (
          <p className="text-red-400 text-sm">{errors.title.message}</p>
        )}
        
        {/* Display submission errors */}
        {submitError && (
          <p className="text-red-400 text-sm">{submitError}</p>
        )}
      </div>
    </form>
  );
} 