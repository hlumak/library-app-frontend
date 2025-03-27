"use client";

import {useBook, useUpdateBook} from '@/hooks/use-books';
import {BookForm} from '@/components/book-form';
import {Button} from '@/components/ui/button';
import {ArrowLeft} from 'lucide-react';
import Link from 'next/link';
import {BookFormValues} from '@/types/books';
import {useToast} from '@/hooks/use-toast';
import {useParams, useRouter} from 'next/navigation';

export default function EditBookPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: book, isLoading, error } = useBook(id);
  const { toast } = useToast();
  const router = useRouter();
  const updateBook = useUpdateBook();

  const onSubmit = (data: BookFormValues) => {
    updateBook.mutate(
      { id, bookData: data },
      {
        onSuccess: () => {
          toast({
            title: "Book updated",
            description: "Your book has been updated successfully.",
          });
          router.push(`/books/${id}`);
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Failed to update book",
            description: "There was an error updating your book. Please try again.",
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
  
  const defaultValues: BookFormValues = {
    title: book.title,
    authorName: book.authorName,
    publishedYear: book.publishedYear
  };

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Button asChild variant="outline" size="sm">
          <Link href={`/books/${id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Book Details
          </Link>
        </Button>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Edit Book</h1>
          <p className="text-muted-foreground">
            Update the book information using the form below.
          </p>
        </div>

        <BookForm
          defaultValues={defaultValues}
          onSubmitAction={onSubmit}
          isSubmitting={updateBook.isPending}
        />
      </div>
    </div>
  );
}