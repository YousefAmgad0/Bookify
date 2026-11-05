export function getLibraryBooks() {
  return JSON.parse(localStorage.getItem("libraryBooks")) || [];
}
export function addBookToLibrary(book) {
  const books = getLibraryBooks();
  if (books.some((b) => b.id === book.id)) {
    console.log("الكتاب موجود بالفعل في المكتبة");
    return;
  }
  books.push(book);
  localStorage.setItem("libraryBooks", JSON.stringify(books));
}
export function removeBookFromLibrary(bookId) {
  const filtered = getLibraryBooks().filter((book) => {
    return book.id !== bookId;
  });

  localStorage.setItem("libraryBooks", JSON.stringify(filtered));
}

export function isBookInLibrary(bookId) {
  const books = getLibraryBooks();
  return books.some((book) => book.id === bookId);
}
