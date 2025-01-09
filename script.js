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
const themeToggleButton = document.querySelector('.theme');
if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        // Save user preference in localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('dark-mode', isDarkMode ? 'enabled' : 'disabled');
    });

    // Load user preference from localStorage
    const darkModePreference = localStorage.getItem('dark-mode');
    if (darkModePreference === 'enabled') {
        document.body.classList.add('dark-mode');
    }
}
