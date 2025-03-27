export interface Movie {
  id: string;
  title: string;
  director: string;
  releaseYear: number;
  genre: string;
  runtime: number;
  posterImage?: string;
  description: string;
  available: boolean;
  totalCopies: number;
  availableCopies: number;
  createdAt: string;
  updatedAt: string;
}

export interface MovieFormValues {
  title: string;
  director: string;
  releaseYear: number;
  genre: string;
  runtime: number;
  posterImage?: string;
  description: string;
  totalCopies: number;
}