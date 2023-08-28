const sections = document.querySelectorAll('section');
gsap.registerPlugin(ScrollTrigger);
sections.forEach(section => {
    gsap.fromTo(section, {
        backgroundPositionY: `-${window.innerHeight / 2}px`
    }, {
        backgroundPositionY: `${window.innerHeight / 2}px`,
        ease: 'none',
        scrollTrigger: {
            trigger: section,
            scrub: true
        }
    })
});
