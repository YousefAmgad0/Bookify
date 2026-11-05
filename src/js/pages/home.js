import "../modules/ui.js";
import "../../css/home.css";
import { createNavbar } from "../components/navbar.js";
import { createFooter } from "../components/footer.js";
import { getSearchBooks } from "../modules/api.js";
import { formatBooks } from "../modules/books.js";
import { createBookCard } from "../components/bookCard.js";
import { addBookToLibrary, isBookInLibrary } from "../modules/storage.js";

async function loadFeaturedBooks() {
  const data = await getSearchBooks("javascript", 10);
  const books = formatBooks(data.docs);
  return books;
}
const books = await loadFeaturedBooks();
console.log(books[0].coverUrl); // Log the cover URL of the first book
document.querySelector("#app").innerHTML = /* html */ `
  ${createNavbar("home")}

  <main>
    <!-- Hero Section -->
    <section class="hero-section py-5 d-flex align-items-center">
      <div class="container">
        <div class="hero-content">
          <h1 class="display-4 fw-bold mb-3">
            Discover Your Next Favorite Book
          </h1>

          <p class="lead text-muted">
            Explore thousands of books and find your next great read.
          </p>

          <div class="mt-4 d-flex flex-wrap gap-2">
            <a href="explore.html" class="btn btn-primary btn-lg">
              Explore Books
            </a>

            <a href="library.html" class="btn btn-outline-secondary btn-lg">
              My Library
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Bookify Section -->
    <section class="container text-center my-5">
      <h2 class="display-5 fw-bold mb-4">Why Choose Bookify?</h2>

      <p class="lead text-muted">
        Bookify is your one-stop platform for discovering, organizing, and
        enjoying books. Whether you're a casual reader or a book enthusiast, we
        have something for everyone.
      </p>
    </section>

    <!-- Featured Books Section -->
    <section class="featured-books py-5">
      <div class="container">
        <h2 class="display-5 fw-bold mb-4">Featured Books</h2>

        <p class="lead text-muted">Handpicked books we think you'll love.</p>

        <div
          id="featured-books-container"
          class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4"
        >
          <!-- Book Card 1 -->
          ${books.map((book) => createBookCard(book)).join("")}

          <!-- End Book Card 1 -->
        </div>
      </div>
    </section>

    <!-- Browse Categories Section -->
    <section class="browse-categories py-5">
      <div class="container text-center">
        <h2 class="display-5 fw-bold mb-4">Browse Categories</h2>

        <p class="lead text-muted">
          Explore books across different genres and find what interests you.
        </p>

        <!-- Category Cards -->
        <div class="row row-cols-2 row-cols-md-3 g-3 g-md-4">
          <!-- Fiction -->
          <div class="col">
            <div class="card category-card h-100 border-0">
              <div class="card-body d-flex align-items-center gap-2 p-3">
                <div
                  class="category-icon bg-light rounded-3 d-flex flex-shrink-0 align-items-center justify-content-center p-2 p-sm-3"
                >
                  <span>📖</span>
                </div>

                <div class="category-info flex-fill text-start">
                  <h5 class="card-title fw-semibold mb-1">Fiction</h5>
                  <p class="text-muted mb-0">Explore fictional stories</p>
                </div>

                <span
                  class="category-arrow flex-shrink-0 text-muted"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            </div>
          </div>

          <!-- Science -->
          <div class="col">
            <div class="card category-card h-100 border-0">
              <div class="card-body d-flex align-items-center gap-2 p-3">
                <div
                  class="category-icon bg-light rounded-3 d-flex flex-shrink-0 align-items-center justify-content-center p-2 p-sm-3"
                >
                  <span>🔬</span>
                </div>

                <div class="category-info flex-fill text-start">
                  <h5 class="card-title fw-semibold mb-1">Science</h5>
                  <p class="text-muted mb-0">Discover scientific knowledge</p>
                </div>

                <span
                  class="category-arrow flex-shrink-0 text-muted"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            </div>
          </div>

          <!-- History -->
          <div class="col">
            <div class="card category-card h-100 border-0">
              <div class="card-body d-flex align-items-center gap-2 p-3">
                <div
                  class="category-icon bg-light rounded-3 d-flex flex-shrink-0 align-items-center justify-content-center p-2 p-sm-3"
                >
                  <span>🏛️</span>
                </div>

                <div class="category-info flex-fill text-start">
                  <h5 class="card-title fw-semibold mb-1">History</h5>
                  <p class="text-muted mb-0">Explore the past</p>
                </div>

                <span
                  class="category-arrow flex-shrink-0 text-muted"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- End Category Cards -->
      </div>
    </section>
  </main>

  ${createFooter()}
`;

const featuredBooksContainer = document.querySelector(
  "#featured-books-container",
);

featuredBooksContainer.addEventListener("click", (event) => {
  const addToLibraryButton = event.target.closest(
    '[data-action="add-to-library"]',
  );

  if (addToLibraryButton) {
    const bookId = addToLibraryButton.dataset.bookId;

    const book = books.find((book) => book.id === bookId);

    if (book && !isBookInLibrary(bookId)) {
      addBookToLibrary(book);
      addToLibraryButton.textContent = "Added to Library";
      addToLibraryButton.classList.remove("btn-primary");
      addToLibraryButton.classList.add("btn-secondary");
      addToLibraryButton.disabled = true;
    }
  }
});
