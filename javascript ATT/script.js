// ===========================
// Hide Navbar on Scroll
// ===========================

let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    let currentScroll = window.pageYOffset;

    if(currentScroll > 100){

        if(currentScroll > lastScrollTop){

            navbar.classList.add("nav-hidden");

        }else{

            navbar.classList.remove("nav-hidden");

        }

    }else{

        navbar.classList.remove("nav-hidden");

    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

});

// ===========================
// Back To Top Button
// ===========================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});

/* =====================================
   GALLERY COUNTER
===================================== */

const counters = document.querySelectorAll('.counter');

const speed = 80;

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const counter = entry.target;

            const target = +counter.dataset.target;

            let count = 0;

            const updateCounter = () => {

                const increment = Math.ceil(target / speed);

                count += increment;

                if(count < target){

                    counter.innerText = count;

                    requestAnimationFrame(updateCounter);

                }else{

                    counter.innerText = target;

                }

            };

            updateCounter();

            observer.unobserve(counter);

        }

    });

});

counters.forEach(counter => observer.observe(counter));

/* =====================================
   GALLERY FILTER
===================================== */

const filterButtons = document.querySelectorAll(".filter-btn");

const galleryItems = Array.from(
    document.querySelectorAll(".gallery-item")
);

// Stores currently visible images
let activeItems = [...galleryItems];

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        // Active button
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // Reset active items
        activeItems = [];

        galleryItems.forEach(item => {

            if (
                filter === "all" ||
                item.classList.contains(filter)
            ) {

                item.style.display = "";

                activeItems.push(item);

            } else {

                item.style.display = "none";

            }

        });

    });

});


/* =====================================
   LIGHTBOX
===================================== */

const lightbox = document.getElementById("lightbox");

const lightboxImg =
    document.getElementById("lightbox-img");

const lightboxTitle =
    document.getElementById("lightbox-title");

const lightboxCategory =
    document.getElementById("lightbox-category");

const prevBtn =
    document.querySelector(".prev-btn");

const nextBtn =
    document.querySelector(".next-btn");

let currentIndex = 0;


/* =====================================
   OPEN IMAGE
===================================== */

function openImage(index) {

    currentIndex = index;

    const item = activeItems[currentIndex];

    lightboxImg.src =
        item.querySelector("img").src;

    lightboxImg.alt =
        item.querySelector("img").alt;

    lightboxTitle.textContent =
        item.dataset.title;

    lightboxCategory.textContent =
        item.dataset.category;

    lightbox.classList.add("active");

}


/* =====================================
   IMAGE CLICK
===================================== */

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        currentIndex =
            activeItems.indexOf(item);

        openImage(currentIndex);

    });

});


/* =====================================
   PREVIOUS BUTTON
===================================== */

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex =
            activeItems.length - 1;

    }

    openImage(currentIndex);

});


/* =====================================
   NEXT BUTTON
===================================== */

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= activeItems.length) {

        currentIndex = 0;

    }

    openImage(currentIndex);

});


/* =====================================
   CLOSE BUTTON
===================================== */

document
    .querySelector(".close-lightbox")
    .addEventListener("click", () => {

        lightbox.classList.remove("active");

    });


/* =====================================
   CLICK OUTSIDE TO CLOSE
===================================== */

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        lightbox.classList.remove("active");

    }

});


/* =====================================
   KEYBOARD SHORTCUTS
===================================== */

document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("active"))
        return;

    if (e.key === "Escape") {

        lightbox.classList.remove("active");

    }

    if (e.key === "ArrowLeft") {

        prevBtn.click();

    }

    if (e.key === "ArrowRight") {

        nextBtn.click();

    }

});


/* =====================================
   DEFAULT FILTER
===================================== */

// Ensures "All" is selected when page loads
activeItems = [...galleryItems];

/* =====================================
   FEATURED COLLECTION BUTTONS
===================================== */

const collectionButtons =
document.querySelectorAll(".collection-btn");

collectionButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const target = button.dataset.filter;

        document.querySelector("#photoGallery")

        .scrollIntoView({

            behavior:"smooth"

        });

        setTimeout(()=>{

            document.querySelector(
                `.filter-btn[data-filter="${target}"]`
            ).click();

            const gallery =
            document.querySelector(".gallery-grid");

            gallery.classList.add("highlight-gallery");

            setTimeout(()=>{

                gallery.classList.remove("highlight-gallery");

            },1200);

        },500);

    });

});