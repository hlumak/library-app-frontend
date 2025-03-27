import {Button} from '@/components/ui/button';
import {Book, Film, LibraryBig} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-16 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <LibraryBig className="h-16 w-16" />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Library Management System
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          A modern digital library management system for books, movies, and more.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/books">Browse Library</Link>
          </Button>
        </div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
            <div className="rounded-full bg-primary/10 p-4">
              <Book className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Books Collection</h3>
            <p className="text-center text-muted-foreground">
              Browse through our extensive collection of books from various genres and authors.
            </p>
            <Button asChild variant="outline">
              <Link href="/books">Explore Books</Link>
            </Button>
          </div>

          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
            <div className="rounded-full bg-primary/10 p-4">
              <Film className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Movies Collection</h3>
            <p className="text-center text-muted-foreground">
              Discover our curated collection of movies across different genres and eras.
            </p>
            <Button asChild variant="outline">
              <Link href="/movies">Explore Movies</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}