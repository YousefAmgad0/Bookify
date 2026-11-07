import "../modules/ui.js";
import "../../css/library.css";
import { createNavbar } from "../components/navbar.js";
import { createFooter } from "../components/footer.js";
import { getLibraryBooks, removeBookFromLibrary } from "../modules/storage.js";
import { getBookDetails, getAuthorDetails } from "../modules/api.js";
import { getBookCover } from "../modules/books.js";
import { createBookCard } from "../components/bookCard.js";
import { createBookModal, createBookDetails } from "../components/bookModal.js";
import { Modal } from "bootstrap";
import { loadBookDetails } from "../modules/bookActions.js";
const libraryBooks = getLibraryBooks();

document.querySelector("#app").innerHTML = /* html */ `
  ${createNavbar("library")}
  <main class="container py-5">
    <header class="library-header">
      <h1 class="fw-bold mb-2">My Library</h1>
      <p class="text-muted mb-0">Your personal book collection.</p>
    </header>

    <section class="py-4" aria-label="Your saved books">
      <div
        class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4"
        id="library-books-container"
      >
        ${libraryBooks.length > 0
          ? libraryBooks.map((book) => createBookCard(book, true)).join("")
          : /* html */ `
              <div class="col-12 w-100 d-flex justify-content-center py-5">
                <div class="library-empty-state text-center p-4 p-md-5">
                  <div class="empty-state-icon mx-auto mb-4">
                    <i class="bi bi-book"></i>
                  </div>

                  <h3 class="fw-semibold mb-2">Your library is waiting</h3>

                  <p class="text-muted mb-4">
                    You haven't added any books yet. Discover your next favorite
                    read.
                  </p>

                  <a href="/explore.html" class="btn btn-primary px-4">
                    <i class="bi bi-compass me-2"></i>
                    Explore Books
                  </a>
                </div>
              </div>
            `}
      </div>
    </section>
  </main>
  ${createFooter()} ${createBookModal()}
`;

const libraryBooksContainer = document.querySelector(
  "#library-books-container",
);

const bookDetailsModalElement = document.querySelector("#book-details-modal");

const bookDetailsModal = new Modal(bookDetailsModalElement);

const bookDetailsContent = document.querySelector("#book-details-content");

libraryBooksContainer.addEventListener("click", async (event) => {
  const removeButton = event.target.closest(
    '[data-action="remove-from-library"]',
  );

  if (removeButton) {
    const bookId = removeButton.dataset.bookId;

    removeBookFromLibrary(bookId);
    removeButton.closest(".col").remove();

    if (libraryBooksContainer.children.length === 0) {
      libraryBooksContainer.innerHTML = /* html */ `
        <div class="col-12 w-100 d-flex justify-content-center py-5">
          <div class="library-empty-state text-center p-4 p-md-5">
            <div class="empty-state-icon mx-auto mb-4">
              <i class="bi bi-book"></i>
            </div>

            <h3 class="fw-semibold mb-2">Your library is waiting</h3>

            <p class="text-muted mb-4">
              You haven't added any books yet. Discover your next favorite read.
            </p>

            <a href="/explore.html" class="btn btn-primary px-4">
              <i class="bi bi-compass me-2"></i>
              Explore Books
            </a>
          </div>
        </div>
      `;
    }
  }

  const viewDetailsButton = event.target.closest(
    '[data-action="view-details"]',
  );

  if (viewDetailsButton) {
    const bookId = viewDetailsButton.dataset.bookId;

    await loadBookDetails(bookId, bookDetailsModal, bookDetailsContent);
  }
});
