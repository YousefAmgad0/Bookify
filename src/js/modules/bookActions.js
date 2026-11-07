import { getBookDetails, getAuthorDetails } from "./api.js";
import { getBookCover } from "./books.js";
import { createBookDetails } from "../components/bookModal.js";
import { addBookToLibrary, isBookInLibrary } from "./storage.js";

let bookDetailsController = null;

export async function loadBookDetails(
  bookId,
  bookDetailsModal,
  bookDetailsContent,
) {
  // Cancel the previous book details request
  bookDetailsController?.abort();

  const controller = new AbortController();
  bookDetailsController = controller;

  bookDetailsModal.show();

  bookDetailsContent.innerHTML = `
    <div class="d-flex justify-content-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;

  try {
    const bookDetails = await getBookDetails(bookId, controller.signal);

    let authorName = "Unknown Author";

    const authorKey = bookDetails.authors?.[0]?.author?.key;

    if (authorKey) {
      const authorDetails = await getAuthorDetails(
        authorKey,
        controller.signal,
      );

      authorName = authorDetails.name ?? "Unknown Author";
    }

    // Ignore outdated requests
    if (controller.signal.aborted) return;

    const coverUrl = getBookCover(bookDetails.covers?.[0]);

    bookDetailsContent.innerHTML = createBookDetails(
      bookDetails,
      coverUrl,
      authorName,
    );
  } catch (error) {
    // Ignore requests cancelled by opening another book
    if (controller.signal.aborted) return;

    console.error("Failed to load book details:", error);

    bookDetailsContent.innerHTML = `
      <div class="text-center py-5">
        <p class="text-danger mb-0">
          Failed to load book details. Please try again.
        </p>
      </div>
    `;
  }
}

export function handleAddToLibrary(book, button) {
  if (!isBookInLibrary(book.id)) {
    addBookToLibrary(book);

    button.textContent = "Added to Library";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
    button.disabled = true;
  }
}