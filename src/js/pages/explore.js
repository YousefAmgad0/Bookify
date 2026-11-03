import "../modules/ui.js";
import "../../css/explore.css";
import { createNavbar } from "../components/navbar.js";
import { createFooter } from "../components/footer.js";
document.querySelector("#app").innerHTML = `
 ${createNavbar("explore")}
 <main>
  <h1>Explore Books</h1>
  <p>Find your next favorite book.</p>
  </main>
  ${createFooter()}
`;
