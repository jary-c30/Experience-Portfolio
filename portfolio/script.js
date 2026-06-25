// ============================================================
// script.js — Frontend JavaScript
//
// WHAT IS THIS FILE?
//   Runs in the browser. Handles the dark/light mode toggle.
//
// HOW JAVASCRIPT WORKS IN THE BROWSER:
//   The browser loads index.html, then runs this file.
//   We use the "document" object to read and change the HTML page.
// ============================================================


// ============================================================
// DARK MODE TOGGLE
// ============================================================

// document.getElementById() finds an HTML element by its id attribute.
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = themeToggle.querySelector('.theme-icon');
// .querySelector() searches inside an element for a CSS selector match

// On page load, check if the user previously chose dark mode and apply it.
// localStorage is a browser key-value store that persists between sessions.
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
  // document.documentElement is the <html> element
  // .classList.add() adds a CSS class — our CSS has html.dark rules
  themeIcon.textContent = '☀️';
}

// addEventListener attaches a function to run when an event (click) happens.
themeToggle.addEventListener('click', () => {
  // .classList.toggle() adds the class if absent, removes it if present
  const isDark = document.documentElement.classList.toggle('dark');

  // Update the icon and save the preference
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  // The ? : is a ternary operator — shorthand for if/else
  // isDark ? '☀️' : '🌙'  means: if isDark is true use ☀️, else use 🌙

  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
