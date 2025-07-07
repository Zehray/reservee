import "./utils.js";

document.addEventListener("DOMContentLoaded", function () {
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  var navLinks = document.querySelectorAll(".nav-link");

  // Safari uyumlu forEach
  for (var i = 0; i < navLinks.length; i++) {
    var link = navLinks[i];
    link.classList.remove("active");
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  }
});

document.addEventListener("click", function (e) {
  var href = e.target.getAttribute("href");
  if (e.target.tagName === "A" && href && href.indexOf("#") === 0) {
    e.preventDefault();
    var targetId = href.slice(1);
    var targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Safari için smooth scroll polyfill
      if (targetElement.scrollIntoView) {
        try {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        } catch (error) {
          // Fallback for older Safari
          targetElement.scrollIntoView();
        }
      }
    }
  }
});

document.addEventListener("submit", function (e) {
  var submitButton = e.target.querySelector('button[type="submit"]');
  if (submitButton) {
    var originalText = submitButton.textContent || submitButton.innerText;
    submitButton.textContent = "Processing...";
    submitButton.disabled = true;

    setTimeout(function () {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2000);
  }
});
