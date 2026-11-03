export function createFooter() {
  return `
    <footer class="footer bg-light py-4">
      <div class="container">
        <div class="row align-items-center gy-4">

          <!-- Brand -->
          <div class="col-12 col-md-6">
            <h3 class="fw-bold mb-2">Bookify</h3>

            <p class="text-muted mb-0">
              Discover your next favorite book and build your personal reading library.
            </p>
          </div>

          <!-- Navigation -->
          <div class="col-12 col-md-6">
            <nav class="d-flex flex-wrap gap-3 justify-content-md-end">
              <a href="index.html" class="text-decoration-none text-secondary">
                Home
              </a>

              <a href="explore.html" class="text-decoration-none text-secondary">
                Explore
              </a>

              <a href="library.html" class="text-decoration-none text-secondary">
                My Library
              </a>
            </nav>
          </div>

        </div>

        <!-- Copyright -->
        <div class="border-top mt-4 pt-3 text-center">
          <p class="text-muted small mb-0">
            &copy; ${new Date().getFullYear()} Bookify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  `;
}
