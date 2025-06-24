// Main JavaScript file for shared functionality
import "./utils.js";

// Set active navigation link based on current page
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});

// Smooth scrolling for internal links
document.addEventListener("click", (e) => {
  if (
    e.target.tagName === "A" &&
    e.target.getAttribute("href").startsWith("#")
  ) {
    e.preventDefault();
    const targetId = e.target.getAttribute("href").slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
});

// Add loading states to buttons
document.addEventListener("submit", (e) => {
  const submitButton = e.target.querySelector('button[type="submit"]');
  if (submitButton) {
    const originalText = submitButton.textContent;
    submitButton.textContent = "Processing...";
    submitButton.disabled = true;

    // Reset button after a delay (for demo purposes)
    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2000);
  }
});
