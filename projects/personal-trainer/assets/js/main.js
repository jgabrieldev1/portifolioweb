document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(
    ".hero-label, .hero h1, .hero p, .buttons, .hero-stats, .hero-image, .benefits-bar, .section-label, .section h2, .section p, .card, .result-card, .price-card, .target-option, .cta-section"
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("active", entry.isIntersecting);
    });
  },{
    threshold:0.12,
    rootMargin:"0px 0px -5% 0px"
  });

  revealItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.transitionDelay = `${Math.min(index * 0.025, 0.14)}s`;
    revealObserver.observe(item);
  });
});