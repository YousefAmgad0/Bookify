export function createNavbar(currentPage) {
  return `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">

        <a class="navbar-brand fw-bold" href="index.html">
          Bookify
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#bookifyNavbar"
          aria-controls="bookifyNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="bookifyNavbar">
          <ul class="navbar-nav ms-auto">

            <li class="nav-item">
              <a class="nav-link ${currentPage === "home" ? "active" : ""}" href="index.html" ${currentPage === "home" ? 'aria-current="page"' : ""}>Home</a>
            </li>

            <li class="nav-item">
              <a class="nav-link ${currentPage === "explore" ? "active" : ""}" href="explore.html" ${currentPage === "explore" ? 'aria-current="page"' : ""}>Explore</a>
            </li>

            <li class="nav-item">
              <a class="nav-link ${currentPage === "library" ? "active" : ""}" href="library.html" ${currentPage === "library" ? 'aria-current="page"' : ""}>My Library</a>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  `;
}
