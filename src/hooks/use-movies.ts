'use client';

import api from '@/lib/apit';
import {Movie, MovieFormValues} from '@/types/movies';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

export function useMovies() {
  return useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const {data} = await api.get<Movie[]>('/movies/');
      return data;
    }
  });
}

export function useMovie(id: string) {
  return useQuery({
    queryKey: ['movies', id],
    queryFn: async () => {
      const {data} = await api.get<Movie>(`/movies/${id}`);
      return data;
    },
    enabled: !!id
  });
}

export function useCreateMovie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movieData: MovieFormValues) => {
      const {data} = await api.post<Movie>('/movies/', {
        ...movieData,
        directorId: 0,
        producerId: 0
      });
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['movies']});
    }
  });
}

export function useUpdateMovie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({id, movieData}: { id: string; movieData: Partial<MovieFormValues> }) => {
      const {data} = await api.put<Movie>(`/movies/${id}`, {
        ...movieData,
        directorId: 0,
        producerId: 0
      });
      return data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({queryKey: ['movies']});
      await queryClient.invalidateQueries({queryKey: ['movies', data.id]});
    }
  });
}

export function useDeleteMovie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/movies/${id}`);
      return id;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['movies']});
    }
  });
}