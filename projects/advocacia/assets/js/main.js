document.addEventListener("DOMContentLoaded", () => {
  const textElements = document.querySelectorAll(
    ".hero-label, .hero h1, .hero p, .label, .section h2, .section p"
  );

  textElements.forEach((element) => {
    const words = element.textContent.trim().split(/\s+/);

    element.innerHTML = words
      .map((word, index) => {
        return `<span style="transition-delay:${index * 0.018}s">${word}&nbsp;</span>`;
      })
      .join("");

    element.classList.add("split-text");
  });

  const revealItems = document.querySelectorAll(
    ".split-text, .buttons, .hero-stats, .hero-image, .card, .contact .btn"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("active", entry.isIntersecting);
    });
  },{
    threshold:0.15,
    rootMargin:"0px 0px -5% 0px"
  });

  revealItems.forEach((item) => {
    observer.observe(item);
  });
});