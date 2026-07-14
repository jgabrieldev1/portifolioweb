const progressBar = document.querySelector(".scroll-progress");
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;

    if(progressBar){
        progressBar.style.width = `${progress}%`;
    }

    if(header){
        header.classList.toggle("scrolled", scrollTop > 40);
    }
});
const cursorGlow = document.querySelector(".cursor-glow");

if(cursorGlow){
    document.addEventListener("mousemove", (event) => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    });
}
const interactiveCards = document.querySelectorAll(".card, .project-card");

interactiveCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();

        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        card.style.setProperty("--x", `${x}%`);
        card.style.setProperty("--y", `${y}%`);
    });
});
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;

        if(window.scrollY >= sectionTop){
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");

        if(link.getAttribute("href") === `#${currentSection}`){
            link.classList.add("active");
        }
    });
});
