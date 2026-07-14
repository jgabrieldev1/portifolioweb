const revealItems = document.querySelectorAll(".reveal-item");

if("IntersectionObserver" in window){
    document.documentElement.classList.add("reveal-ready");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle("active", entry.isIntersecting);
        });
    },{
        threshold:0.10,
        rootMargin:"0px 0px -5% 0px"
    });

    revealItems.forEach((item) => {
        revealObserver.observe(item);
    });
}
