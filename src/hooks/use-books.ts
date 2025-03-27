'use client';

import api from '@/lib/apit';
import {Book, BookFormValues} from '@/types/books';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

export function useBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const {data} = await api.get<Book[]>('/books/');
      return data;
    }
  });
}

export function useBook(id: string) {
  return useQuery({
    queryKey: ['books', id],
    queryFn: async () => {
      const {data} = await api.get<Book>(`/books/${id}`);
      return data;
    },
    enabled: !!id
  });
}

export function useCreateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookData: BookFormValues) => {
      const {data} = await api.post<Book>('/books/', {...bookData, authorId: 0});
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['books']});
    }
  });
}

export function useUpdateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({id, bookData}: { id: string; bookData: Partial<BookFormValues> }) => {
      const {data} = await api.put<Book>(`/books/${id}`, {...bookData, authorId: 0});
      return data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({queryKey: ['books']});
      await queryClient.invalidateQueries({queryKey: ['books', data.id]});
    }
  });
}

export function useDeleteBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/books/${id}`);
      return id;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['books']});
    }
  });
}