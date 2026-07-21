'use strict';
/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});


/**
 * Dynamic Active Class Link Highlighter (Multi-page Support)
 */
document.addEventListener("DOMContentLoaded", function () {
 const navLinks = document.querySelectorAll("[data-nav-link]");
  
  const currentPath = window.location.pathname.split("/").pop();
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href");
    
    // Highlight 'home' link if path is empty or explicitly index.html
    if ((currentPath === "" || currentPath === "index.html") && linkPath === "index.html") {
      link.classList.add("active");
    } else if (currentPath === linkPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
// Quick Intersection Observer to animate elements on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-up');
    }
  });
}, { threshold: 0.1 });

