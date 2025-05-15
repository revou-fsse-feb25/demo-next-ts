import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Movies - MovieHub',
  description: 'Browse our collection of movies',
};

interface MoviesLayoutProps {
  children: ReactNode;
}

export default function MoviesLayout({ children }: MoviesLayoutProps) {
  return children;
} 