"use client";

import {useState} from 'react';
import {useDeleteMovie, useMovies} from '@/hooks/use-movies';
import {MoviesTable} from '@/components/movies-table';
import {MovieCard} from '@/components/movie-card';
import {Button} from '@/components/ui/button';
import {Grid3X3, List} from 'lucide-react';
import {useToast} from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

export default function MoviesPage() {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [movieToDelete, setMovieToDelete] = useState<string | null>(null);

  const { data: movies, isLoading, error } = useMovies();
  const { toast } = useToast();
  const deleteMovie = useDeleteMovie();

  const handleDelete = (id: string) => {
    setMovieToDelete(id);
  };

  const confirmDelete = () => {
    if (movieToDelete) {
      deleteMovie.mutate(movieToDelete, {
        onSuccess: () => {
          toast({
            title: "Movie deleted",
            description: "The movie has been successfully deleted",
          });
          setMovieToDelete(null);
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Could not delete the movie. Please try again.",
            variant: "destructive",
          });
        },
      });
    }
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

  if (error) {
    return (
      <div className="container py-10">
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          Failed to load movies. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Movies Collection</h1>
        <div className="flex items-center gap-2">
          <Button
            variant={view === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setView("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant={view === "table" ? "default" : "outline"}
            size="icon"
            onClick={() => setView("table")}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">Table view</span>
          </Button>
        </div>
      </div>

      {view === "grid" ? (
        movies && movies.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onDeleteAction={handleDelete} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium">No movies found</h3>
            <p className="text-muted-foreground">
              Start by adding some movies to your collection.
            </p>
          </div>
        )
      ) : (
        <MoviesTable data={movies || []} onDeleteAction={handleDelete} />
      )}

      <AlertDialog open={!!movieToDelete} onOpenChange={() => setMovieToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the movie. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}