const bookImageCache = new Map<string, string>();
const movieImageCache = new Map<string, string>();

interface OpenLibraryResponse {
  docs: Array<{
    cover_i?: number;
    title: string;
    author_name?: string[];
  }>;
}

interface TMDBSearchResponse {
  results: Array<{
    poster_path: string | null;
    title: string;
    id: number;
  }>;
}

export const getBookCoverImage = async (title: string, author?: string): Promise<string | null> => {
  const cacheKey = `${title}-${author || ''}`;

  // Check cache first
  if (bookImageCache.has(cacheKey)) {
    return bookImageCache.get(cacheKey) || null;
  }

  try {
    // Use Open Library API to search for the book
    const query = `${title} ${author || ''}`.trim();
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=1`);
    const data = await response.json() as OpenLibraryResponse;

    if (data.docs.length > 0 && data.docs[0].cover_i) {
      const coverUrl = `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg`;
      bookImageCache.set(cacheKey, coverUrl);
      return coverUrl;
    }

    return null;
  } catch (error) {
    console.error("Error fetching book cover:", error);
    return null;
  }
};

// You'll need to get a free TMDB API key from https://www.themoviedb.org/settings/api
const TMDB_API_KEY = "4089e3a6e524ef63794d9677ff7ef837";

export const getMoviePosterImage = async (title: string, year?: number): Promise<string | null> => {
  const cacheKey = `${title}-${year || ''}`;

  // Check cache first
  if (movieImageCache.has(cacheKey)) {
    return movieImageCache.get(cacheKey) || null;
  }

  try {
    const searchParams = new URLSearchParams({
      api_key: TMDB_API_KEY,
      query: encodeURIComponent(title)
    });

    if (year) {
      searchParams.append('primary_release_year', year.toString());
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?${searchParams.toString()}`,
      { headers: { "Content-Type": "application/json" } }
    );

    const data = await response.json() as TMDBSearchResponse;

    if (data.results && data.results.length > 0 && data.results[0].poster_path) {
      const posterUrl = `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`;
      movieImageCache.set(cacheKey, posterUrl);
      return posterUrl;
    }

    return null;
  } catch (error) {
    console.error("Error fetching movie poster:", error);
    return null;
  }
};