// API service for the Next.js demo using JSONPlaceholder
// https://jsonplaceholder.typicode.com/

// Types
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

// Utility function to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Base JSONPlaceholder API URL
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Fetch todos
export async function fetchTodos(): Promise<Todo[]> {
  await delay(800); // Simulate network delay
  const response = await fetch(`${API_BASE_URL}/todos?_limit=5`);
  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
}

// Fetch a single todo
export async function fetchTodo(id: number): Promise<Todo> {
  await delay(600);
  const response = await fetch(`${API_BASE_URL}/todos/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch todo ${id}`);
  return response.json();
}

// Fetch posts
export async function fetchPosts(): Promise<Post[]> {
  await delay(1000);
  const response = await fetch(`${API_BASE_URL}/posts?_limit=5`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
}

// Fetch a single post
export async function fetchPost(id: number): Promise<Post> {
  await delay(500);
  const response = await fetch(`${API_BASE_URL}/posts/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch post ${id}`);
  return response.json();
}

// Fetch user data
export async function fetchUser(id: number): Promise<User> {
  await delay(700);
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch user ${id}`);
  return response.json();
}

// Fetch comments for a post
export async function fetchComments(postId: number): Promise<Comment[]> {
  await delay(900);
  const response = await fetch(`${API_BASE_URL}/comments?postId=${postId}`);
  if (!response.ok) throw new Error(`Failed to fetch comments for post ${postId}`);
  return response.json();
}

// For SWR demos - intentionally can fail to demonstrate error handling
export async function fetchWithErrorDemo(): Promise<{ message: string }> {
  await delay(500);
  // 50% chance of failure for demo purposes
  if (Math.random() < 0.5) {
    throw new Error('Demo API error (50% chance of failure)');
  }
  return { message: 'Request succeeded!' };
} 