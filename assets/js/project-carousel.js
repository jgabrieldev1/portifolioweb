const projectCarousel = document.querySelector(".project-carousel");

if(projectCarousel){
    const slides = Array.from(projectCarousel.querySelectorAll(".project-slide"));
    const indicators = Array.from(projectCarousel.querySelectorAll(".project-carousel__indicators span"));
    const previousButton = projectCarousel.querySelector(".project-carousel__button--previous");
    const nextButton = projectCarousel.querySelector(".project-carousel__button--next");
    const status = projectCarousel.querySelector("[data-carousel-status]");
    let activeIndex = 0;

    const showSlide = (nextIndex, direction) => {
        activeIndex = (nextIndex + slides.length) % slides.length;
        projectCarousel.dataset.direction = direction;

        slides.forEach((slide, index) => {
            const isActive = index === activeIndex;
            slide.classList.toggle("is-active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));
        });

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle("is-active", index === activeIndex);
        });

        const title = slides[activeIndex].querySelector("figcaption strong").textContent;
        status.textContent = `Slide ${activeIndex + 1} de ${slides.length}: ${title}`;
    };

    previousButton.addEventListener("click", () => showSlide(activeIndex - 1, "previous"));
    nextButton.addEventListener("click", () => showSlide(activeIndex + 1, "next"));

    projectCarousel.addEventListener("keydown", (event) => {
        if(event.key === "ArrowLeft") showSlide(activeIndex - 1, "previous");
        if(event.key === "ArrowRight") showSlide(activeIndex + 1, "next");
    });
}
