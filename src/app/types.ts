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