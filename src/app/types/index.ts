export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export interface DynamicRouteParams {
  id: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: Author;
  publishedAt: string;
  tags: string[];
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Comment {
  id: string;
  content: string;
  author: Author;
  createdAt: string;
}

// Type for dynamic route parameters
export interface PostPageParams {
  params: {
    slug: string;
  };
}

// Type for search query parameters
export interface SearchParams {
  query?: string;
  category?: string;
  page?: string;
}
