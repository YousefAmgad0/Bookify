export function formatBooks(books) {
  return books.map((book) => ({
    title: book.title || "Untitled",
    authors: book.author_name?.join(", ") || "Unknown Author",
    coverUrl: getBookCover(book.cover_i),
    publishYear: book.first_publish_year,
    id: book.key?.split("/").pop(),
  }));
}

export function getBookCover(coverId) {
  if (coverId == null) {
    return "https://placehold.co/300x400?text=No+Cover";
  }

  return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
}

export function isBookInLibrary(bookId) {
  const books = getLibraryBooks();
  return books.some((book) => book.id === bookId);
}
