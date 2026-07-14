document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if(menuToggle && menu){
    const setMenuOpen = (open) => {
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.querySelector(".sr-only").textContent = open ? "Fechar menu" : "Abrir menu";
      menu.classList.toggle("is-open", open);
    };

    menuToggle.addEventListener("click", () => setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true"));
    menu.addEventListener("click", (event) => {
      if(event.target.closest("a")) setMenuOpen(false);
    });
    document.addEventListener("keydown", (event) => {
      if(event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true"){
        setMenuOpen(false);
        menuToggle.focus();
      }
    });
    window.addEventListener("resize", () => {
      if(window.innerWidth > 950) setMenuOpen(false);
    });
  }

  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    return;
  }

  if(!("IntersectionObserver" in window)){
    return;
  }

  const revealItems = document.querySelectorAll(
    ".hero-label, .hero h1, .hero p, .buttons, .hero-stats, .hero-image, .label, .section h2, .section p, .card, .contact .btn"
  );

  const observer = new IntersectionObserver((entries) => {
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
    observer.observe(item);
  });
});
