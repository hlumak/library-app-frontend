export interface Movie {
  id: string;
  title: string;
  directorName: string;
  producerName: string;
  releasedYear: number;
  posterImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MovieFormValues {
  title: string;
  directorName: string;
  producerName: string;
  releasedYear: number;
}