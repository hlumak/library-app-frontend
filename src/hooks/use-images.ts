import {useQuery} from '@tanstack/react-query';
import {getBookCoverImage, getMoviePosterImage} from '@/lib/image-service';

export function useBookCover(title: string, author?: string) {
  return useQuery({
    queryKey: ["bookCover", title, author],
    queryFn: () => getBookCoverImage(title, author),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: !!title,
  });
}

export function useMoviePoster(title: string, year?: number) {
  return useQuery({
    queryKey: ["moviePoster", title, year],
    queryFn: () => getMoviePosterImage(title, year),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: !!title,
  });
}