'use client';

import api from '@/lib/apit';
import {Person} from '@/types/people';
import {useQuery} from '@tanstack/react-query';

export function usePeople() {
  return useQuery({
    queryKey: ["people"],
    queryFn: async () => {
      const { data } = await api.get<Person[]>("/people/?totalCount=false");
      return data;
    },
  });
}