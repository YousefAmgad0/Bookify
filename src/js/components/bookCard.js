import { isBookInLibrary } from "../modules/storage.js";

export function createBookCard(book, showRemoveButton = false) {
  const isAdded = isBookInLibrary(book.id);

  return /* html */ `
    <div class="col">
      <div class="card book-card h-100 overflow-hidden">
        <img
          src="${book.coverUrl}"
          class="card-img-top book-cover"
          alt="${book.title} book cover"
          loading="lazy"
        />

        <div class="card-body p-3">
          <h5 class="card-title fw-semibold fs-5 m-0">${book.title}</h5>

          <p class="card-text">${book.publishYear ?? "Year unavailable"}</p>

          <p class="book-author mb-0">by ${book.authors}</p>
        </div>

        <div class="card-footer d-flex gap-2 p-3">
          <button
            type="button"
            class="btn btn-sm flex-fill ${isAdded
              ? "btn-secondary"
              : "btn-primary"}"
            data-action="add-to-library"
            data-book-id="${book.id}"
            ${isAdded ? "disabled" : ""}
          >
            ${isAdded ? "Added to Library" : "Add to Library"}
          </button>

          ${isAdded && showRemoveButton
            ? `<button
                        type="button"
                        class="btn btn-sm btn-outline-secondary flex-fill"
                        data-action="remove-from-library"
                        data-book-id="${book.id}"
                      >
                        Remove from Library
                      </button>`
            : ""}
          <button
            type="button"
            class="btn btn-sm btn-outline-primary flex-fill"
            data-action="view-details"
            data-book-id="${book.id}"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  `;
}

/**

featuredBooksContainer.addEventListener("click", (event) => {
  const addToLibraryButton = event.target.closest(
    "[data-action='add-to-library']",
  );
  const viewDetailsButton = event.target.closest(
    "[data-action='view-details']",
  );

  if (addToLibraryButton) {
    const bookId = addToLibraryButton.getAttribute("data-book-id");
    addBookToLibrary(bookId);
  }

  if (viewDetailsButton) {
    // Handle view details action
  }
}); 

 */
