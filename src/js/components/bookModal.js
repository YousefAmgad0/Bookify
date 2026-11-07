export function createBookModal() {
  return /* html */ `
    <div
      class="modal fade"
      id="book-details-modal"
      tabindex="-1"
      aria-labelledby="book-details-modal-label"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable"
      >
        <div class="modal-content border-0 rounded-4 overflow-hidden">
          <div class="modal-header border-0 px-4 pt-4 pb-2">
            <span class="fw-semibold text-primary">BOOKIFY</span>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body px-4 pb-4" id="book-details-content">
            <!-- Book details will be rendered here -->
          </div>
        </div>
      </div>
    </div>
  `;
}

export function createBookDetails(book, coverUrl, authorName) {
  return /* html */ `
    <div class="row g-4">
      <div class="col-12 col-md-4">
        <img
          src="${coverUrl}"
          alt="${book.title} book cover"
          class="img-fluid rounded-3 book-modal-cover"
        />
      </div>

      <div class="col-12 col-md-8">
        <span class="badge text-bg-primary mb-3"> Book Details </span>

        <h3 class="fw-bold mb-2" id="book-details-modal-label">
          ${book.title}
        </h3>

        <p class="text-muted mb-3">${authorName ?? "Unknown Author"}</p>

        <p class="text-secondary lh-lg mb-4">
          ${book.description?.value ??
          book.description ??
          "No description available."}
        </p>

        ${book.subjects?.length > 0 &&
        /* html */ `
          <div class="mt-4">
            <h6 class="fw-semibold mb-3">Subjects</h6>

            <div class="d-flex flex-wrap gap-2">
              ${book.subjects
                .slice(0, 5)
                .map(
                  (subject) => `
        <span class="badge text-bg-light border text-secondary fw-normal">
          ${subject}
        </span>
      `,
                )
                .join("")}
            </div>
          </div>
        `}
      </div>
    </div>
  `;
}
