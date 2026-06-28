const revealItems = document.querySelectorAll(".reveal-item");

const revealObserver = new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            entry.target.classList.add("active");

        }else{

            entry.target.classList.remove("active");

        }

    });

},{
    threshold:0.10,
    rootMargin:"0px 0px -5% 0px"
});

revealItems.forEach((item)=>{

    revealObserver.observe(item);

});