import "../modules/ui.js";
import "../../css/explore.css";
import { createNavbar } from "../components/navbar.js";
import { createFooter } from "../components/footer.js";
import {
  getSearchBooks,
  getBookDetails,
  getAuthorDetails,
} from "../modules/api.js";
import { formatBooks, getBookCover } from "../modules/books.js";
import { createBookCard } from "../components/bookCard.js";
import { createBookModal, createBookDetails } from "../components/bookModal.js";
import { Modal } from "bootstrap";
import { loadBookDetails, handleAddToLibrary } from "../modules/bookActions.js";

document.querySelector("#app").innerHTML = /* html */ `
  ${createNavbar("explore")}
  <main class="container py-5">
    <header class="explore-header">
      <h1 class="fw-bold mb-2">Explore Books</h1>
      <p class="text-muted mb-0">Find your next favorite book.</p>
    </header>

    <section class="py-4" aria-label="Explore books">
      <div class="input-group">
        <input
          type="search"
          id="book-search"
          name="query"
          class="form-control"
          placeholder="Search by title, author, or keyword..."
          aria-label="Search books"
        />
        <button id="search-button" type="button" class="btn btn-primary">
          <span id="search-button-text"
            ><i class="bi bi-search me-2"></i>Search</span
          >
          <span
            id="search-button-spinner"
            class="spinner-border spinner-border-sm d-none"
            role="status"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </section>

    <section
      id="search-results"
      class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4"
      aria-label="Search results"
      aria-live="polite"
    >
      <!-- Initial discovery empty state -->
    </section>
  </main>
  ${createFooter()} ${createBookModal()}
`;

const searchButtonText = document.querySelector("#search-button-text");
const searchButtonSpinner = document.querySelector("#search-button-spinner");
const searchInput = document.querySelector("#book-search");
const searchButton = document.querySelector("#search-button");
const searchResultsContainer = document.querySelector("#search-results");

let controller;
let searchBooks = [];

searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim();

  if (query === "") return;

  if (controller) controller.abort();

  controller = new AbortController();
  const currentController = controller;

  searchButtonText.classList.add("d-none");
  searchButtonSpinner.classList.remove("d-none");

  searchResultsContainer.innerHTML = `
    <div class="d-flex justify-content-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;

  try {
    const searchItems = await getSearchBooks(
      query,
      10,
      currentController.signal,
    );

    const formattedItems = formatBooks(searchItems.docs);
    searchBooks = formattedItems;

    if (formattedItems.length === 0) {
      searchResultsContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <p class="text-muted mb-0">No books found.</p>
        </div>
      `;
      return;
    }

    searchResultsContainer.innerHTML = formattedItems
      .map((book) => createBookCard(book))
      .join("");
  } catch (error) {
    if (error.name === "AbortError") return;

    searchResultsContainer.innerHTML = `
      <div class="col-12 text-center py-5">
        <p class="text-danger mb-0">Something went wrong. Please try again.</p>
      </div>
    `;
  } finally {
    if (controller === currentController) {
      searchButtonText.classList.remove("d-none");
      searchButtonSpinner.classList.add("d-none");
    }
  }
});

const bookDetailsModalElement = document.querySelector("#book-details-modal");
const bookDetailsModal = new Modal(bookDetailsModalElement);
const bookDetailsContent = document.querySelector("#book-details-content");

searchResultsContainer.addEventListener("click", async (event) => {
  const addToLibraryButton = event.target.closest(
    '[data-action="add-to-library"]',
  );

  if (addToLibraryButton) {
    const bookId = addToLibraryButton.dataset.bookId;

    const book = searchBooks.find((book) => book.id === bookId);

    if (book) {
      handleAddToLibrary(book, addToLibraryButton);
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
