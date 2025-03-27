"use client";

import {useCreateBook} from '@/hooks/use-books';
import {BookForm} from '@/components/book-form';
import {Button} from '@/components/ui/button';
import {ArrowLeft} from 'lucide-react';
import Link from 'next/link';
import {BookFormValues} from '@/types/books';
import {useToast} from '@/hooks/use-toast';
import {useRouter} from 'next/navigation';

export default function AddBookPage() {
  const { toast } = useToast();
  const router = useRouter();
  const createBook = useCreateBook();

  const onSubmit = (data: BookFormValues) => {
    createBook.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Book created",
          description: "Your book has been created successfully.",
        });
        router.push("/books");
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to create book",
          description: "There was an error creating your book. Please try again.",
        });
      },
    });
  };

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

      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Add New Book</h1>
          <p className="text-muted-foreground">
            Fill in the form below to add a new book to the library.
          </p>
        </div>

        <BookForm onSubmitAction={onSubmit} isSubmitting={createBook.isPending} />
      </div>
    </div>
  );
}