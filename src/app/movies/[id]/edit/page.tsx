"use client";

import {useMovie, useUpdateMovie} from '@/hooks/use-movies';
import {MovieForm} from '@/components/movie-form';
import {Button} from '@/components/ui/button';
import {ArrowLeft} from 'lucide-react';
import Link from 'next/link';
import {MovieFormValues} from '@/types/movies';
import {useToast} from '@/hooks/use-toast';
import {useParams, useRouter} from 'next/navigation';

export default function EditMoviePage() {
  const params = useParams();
  const id = params.id as string;
  const { data: movie, isLoading, error } = useMovie(id);
  const { toast } = useToast();
  const router = useRouter();
  const updateMovie = useUpdateMovie();

  const onSubmit = (data: MovieFormValues) => {
    updateMovie.mutate(
      { id, movieData: data },
      {
        onSuccess: () => {
          toast({
            title: "Movie updated",
            description: "Your movie has been updated successfully.",
          });
          router.push(`/movies/${id}`);
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Failed to update movie",
            description: "There was an error updating your movie. Please try again.",
          });
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container py-10">
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          Failed to load movie details. The movie may not exist or there was an error.
        </div>
        <Button asChild className="mt-4">
          <Link href="/movies">Back to Movies</Link>
        </Button>
      </div>
    );
  }

  // Convert movie data to form values
  const defaultValues: MovieFormValues = {
    title: movie.title,
    directorName: movie.directorName,
    producerName: movie.producerName,
    releasedYear: movie.releasedYear,
  };

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Button asChild variant="outline" size="sm">
          <Link href={`/movies/${id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Movie Details
          </Link>
        </Button>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Edit Movie</h1>
          <p className="text-muted-foreground">
            Update the movie information using the form below.
          </p>
        </div>

        <MovieForm
          defaultValues={defaultValues}
          onSubmitAction={onSubmit}
          isSubmitting={updateMovie.isPending}
        />
      </div>
    </div>
  );
}