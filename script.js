// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.querySelector(".nav__toggle");
const links = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
});
links.addEventListener("click", (e) => {
  if (e.target.closest("a:not(.dropdown__label)")) {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", false);
  }
});

// Project filtering
const filterButtons = document.querySelectorAll(".filter");
const cards = document.querySelectorAll("#projects .card");
const emptyMsg = document.querySelector("#projects .empty");

function applyFilter(category) {
  let shown = 0;
  filterButtons.forEach((b) => b.classList.toggle("is-active", b.dataset.filter === category));
  cards.forEach((card) => {
    const match = category === "all" || card.dataset.category === category;
    card.hidden = !match;
    if (match) shown++;
  });
  emptyMsg.hidden = shown > 0;
}

filterButtons.forEach((btn) => btn.addEventListener("click", () => applyFilter(btn.dataset.filter)));

// Dropdown links in the nav jump to Projects with that filter applied
document.querySelectorAll(".dropdown__menu a").forEach((a) => {
  a.addEventListener("click", () => applyFilter(a.dataset.filter));
});

// Highlight current section in nav
const sectionLinks = [...document.querySelectorAll('.nav__links > a[href^="#"], .dropdown__label')];
const sections = sectionLinks
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sectionLinks.forEach((a) =>
          a.classList.toggle("is-current", a.getAttribute("href") === "#" + entry.target.id)
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => spy.observe(s));

// Scroll reveal
const reveal = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        reveal.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
