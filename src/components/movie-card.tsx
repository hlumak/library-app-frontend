'use client';

import Link from 'next/link';
import {Movie} from '@/types/movies';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Edit, Trash2} from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  onDeleteAction: (id: string) => void;
}

export function MovieCard({ movie, onDeleteAction }: MovieCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <span className="text-muted-foreground">No poster image</span>
        </div>
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-1">{movie.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <p className="text-sm">Director: {movie.directorName}</p>
        <p className="text-sm">Producer: {movie.producerName}</p>
        <p className="text-sm">Year: {movie.releasedYear}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button asChild variant="outline" size="sm">
          <Link href={`/movies/${movie.id}`}>View Details</Link>
        </Button>
        <div className="flex space-x-2">
          <Button asChild variant="ghost" size="icon">
            <Link href={`/movies/${movie.id}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeleteAction(movie.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}