"use client";

import {useCreateMovie} from '@/hooks/use-movies';
import {MovieForm} from '@/components/movie-form';
import {Button} from '@/components/ui/button';
import {ArrowLeft} from 'lucide-react';
import Link from 'next/link';
import {MovieFormValues} from '@/types/movies';
import {useToast} from '@/hooks/use-toast';
import {useRouter} from 'next/navigation';

export default function AddMoviePage() {
  const { toast } = useToast();
  const router = useRouter();
  const createMovie = useCreateMovie();

  const onSubmit = (data: MovieFormValues) => {
    createMovie.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Movie created",
          description: "Your movie has been created successfully.",
        });
        router.push("/movies");
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to create movie",
          description: "There was an error creating your movie. Please try again.",
        });
      },
    });
  };

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Button asChild variant="outline" size="sm">
          <Link href="/movies">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Movies
          </Link>
        </Button>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Add New Movie</h1>
          <p className="text-muted-foreground">
            Fill in the form below to add a new movie to the library.
          </p>
        </div>

        <MovieForm onSubmitAction={onSubmit} isSubmitting={createMovie.isPending} />
      </div>
    </div>
  );
}