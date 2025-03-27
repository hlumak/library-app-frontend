'use client';

import Link from 'next/link';
import Image from 'next/image';
import {Book} from '@/types/books';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Edit, Trash2} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useBookCover} from '@/hooks/use-images';

interface BookCardProps {
  book: Book;
  onDeleteAction: (id: string) => void;
}

export function BookCard({ book, onDeleteAction }: BookCardProps) {
  const [coverImage, setCoverImage] = useState<string | undefined>(book.coverImage);
  const { data: fetchedCover, isLoading } = useBookCover(book.title, book.authorName);

  useEffect(() => {
    if (!book.coverImage && fetchedCover) {
      setCoverImage(fetchedCover);
    }
  }, [book.coverImage, fetchedCover]);

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={book.title}
            fill
            className="object-contain"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            {isLoading ? (
              <span className="text-muted-foreground">Loading cover...</span>
            ) : (
              <span className="text-muted-foreground">No cover image</span>
            )}
          </div>
        )}
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-1">{book.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <p className="text-sm">Author: {book.authorName}</p>
        <p className="text-sm">Year: {book.publishedYear}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button asChild variant="outline" size="sm">
          <Link href={`/books/${book.id}`}>View Details</Link>
        </Button>
        <div className="flex space-x-2">
          <Button asChild variant="ghost" size="icon">
            <Link href={`/books/${book.id}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeleteAction(book.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}