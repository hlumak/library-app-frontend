export interface Book {
  id: string;
  title: string;
  authorName: string;
  publishedYear: number;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookFormValues {
  title: string;
  authorName: string;
  publishedYear: number;
}