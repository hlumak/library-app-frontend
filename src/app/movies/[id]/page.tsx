"use client";

import {useMovie} from '@/hooks/use-movies';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {ArrowLeft, Edit} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {formatDate} from '@/lib/utils';
import {Separator} from '@/components/ui/separator';
import {useParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useMoviePoster} from '@/hooks/use-images';

export default function MovieDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: movie, isLoading, error } = useMovie(id);
  const [posterImage, setPosterImage] = useState<string | undefined>(movie?.posterImage);
  const { data: fetchedPoster, isLoading: isPosterLoading } = useMoviePoster(movie?.title || '', movie?.releasedYear);

  useEffect(() => {
    if (!movie?.posterImage && fetchedPoster) {
      setPosterImage(fetchedPoster);
    }
  }, [movie?.posterImage, fetchedPoster]);

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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-t-lg">
                {posterImage ? (
                  <Image
                    src={posterImage}
                    alt={movie.title}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    {isPosterLoading ? (
                      <span className="text-muted-foreground">Loading poster...</span>
                    ) : (
                      <span className="text-muted-foreground">No poster image</span>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4">
              <Button asChild variant="outline" size="sm">
                <Link href={`/movies/${movie.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{movie.title}</CardTitle>
              <CardDescription>
                {`Directed by ${movie.directorName}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Release Year</h3>
                  <p>{movie.releasedYear}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Producer</h3>
                  <p>{movie.producerName}</p>
                </div>
              </div>
              <Separator />

              <div className="text-xs text-muted-foreground">
                <p>Added on: {formatDate(new Date(movie.createdAt))}</p>
                {movie.updatedAt && <p>Last updated: {formatDate(new Date(movie.updatedAt))}</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}