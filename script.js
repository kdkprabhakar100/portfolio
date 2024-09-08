document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        const offset = Array.from(document.querySelectorAll('.slide')).indexOf(targetSection);
        document.querySelector('.slides').style.transform = `translateX(-${offset * 100}%)`;
    });
});
