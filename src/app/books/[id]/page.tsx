"use client";

import {useBook} from '@/hooks/use-books';
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
import Image from 'next/image';
import Link from 'next/link';
import {formatDate} from '@/lib/utils';
import {Separator} from '@/components/ui/separator';
import {useParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useBookCover} from '@/hooks/use-images';

export default function BookDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: book, isLoading, error } = useBook(id);
  const [coverImage, setCoverImage] = useState<string | undefined>(book?.coverImage);
  const { data: fetchedCover, isLoading: isCoverLoading } = useBookCover(book?.title || '', book?.authorName);

  useEffect(() => {
    if (!book?.coverImage && fetchedCover) {
      setCoverImage(fetchedCover);
    }
  }, [book?.coverImage, fetchedCover]);

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container py-10">
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          Failed to load book details. The book may not exist or there was an error.
        </div>
        <Button asChild className="mt-4">
          <Link href="/books">Back to Books</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Button asChild variant="outline" size="sm">
          <Link href="/books">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Books
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-t-lg">
                {coverImage ? (
                  <Image
                    src={coverImage}
                    alt={book.title}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    {isCoverLoading ? (
                      <span className="text-muted-foreground">Loading cover...</span>
                    ) : (
                      <span className="text-muted-foreground">No cover image</span>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4">
              <Button asChild variant="outline" size="sm">
                <Link href={`/books/${book.id}/edit`}>
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
              <CardTitle className="text-2xl">{book.title}</CardTitle>
              <CardDescription>By {book.authorName}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Publication Year</h3>
                  <p>{book.publishedYear}</p>
                </div>
              </div>

              <Separator />

              <div className="text-xs text-muted-foreground">
                <p>Added on: {formatDate(new Date(book.createdAt))}</p>
                <p>Last updated: {formatDate(new Date(book.updatedAt))}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}