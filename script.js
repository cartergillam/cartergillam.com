// Hamburger Menu Toggle
const hamburgerIcon = document.querySelector('.hamburger-icon');
const menuLinks = document.querySelector('.menu-links');

if (hamburgerIcon && menuLinks) {
    hamburgerIcon.addEventListener('click', () => {
        menuLinks.classList.toggle('open');
        hamburgerIcon.classList.toggle('open');
    });
}

// Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        document.querySelectorAll('a, .btn, .icon').forEach(el => {
            el.classList.toggle('dark-mode');
        });
    });
}

// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
});

