export interface Movie {
  id: string;
  title: string;
  directorName: string;
  producerName: string;
  releasedYear: number;
  createdAt: string;
  updatedAt: string;
}

export interface MovieFormValues {
  title: string;
  directorName: string;
  producerName: string;
  releasedYear: number;
}