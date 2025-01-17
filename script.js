// Hamburger Menu Toggle
const hamburgerIcon = document.querySelector('.hamburger-icon');
const menuLinks = document.querySelector('.menu-links');

if (hamburgerIcon && menuLinks) {
    hamburgerIcon.addEventListener('click', () => {
        menuLinks.classList.toggle('open');
        hamburgerIcon.classList.toggle('open');
    });
}


// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
});

