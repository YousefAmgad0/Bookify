import "../modules/ui.js";
import "../../css/library.css";
import { createNavbar } from "../components/navbar.js";
import { createFooter } from "../components/footer.js";
document.querySelector("#app").innerHTML = `
${createNavbar("library")}
<main>
  <h1>My Library</h1>
  <p>Your personal book collection.</p>
  </main>
  ${createFooter()}
`;
