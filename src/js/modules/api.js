/**
 * Uses AbortController to cancel the previous search request
 * when the user starts a new search.
 */

export async function getSearchBooks(query, limit, signal) {
  const encodedQuery = encodeURIComponent(query);

  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodedQuery}&limit=${limit}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return response.json();
}

export async function getBookDetails(bookId, signal) {
  const response = await fetch(`https://openlibrary.org/works/${bookId}.json`, {
    signal,
  });
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  return response.json();
}

export async function getAuthorDetails(authorKey, signal) {
  const response = await fetch(`https://openlibrary.org${authorKey}.json`, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch author details");
  }

  return response.json();
}
