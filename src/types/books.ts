export interface Book {
  id: string;
  title: string;
  authorName: string;
  publishedYear: number;
  isbn: string;
  genre: string;
  coverImage?: string;
  description: string;
  available: boolean;
  totalCopies: number;
  availableCopies: number;
  createdAt: string;
  updatedAt: string;
}

export interface BookFormValues {
  title: string;
  authorName: string;
  publishedYear: number;
  isbn: string;
  genre: string;
  coverImage?: string;
  description: string;
  totalCopies: number;
}