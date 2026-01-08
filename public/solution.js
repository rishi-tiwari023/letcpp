// Shared JavaScript for solution pages
(function () {
  // Inject theme script
  const script = document.createElement('script');
  script.src = '/theme.js';
  document.head.appendChild(script);

  // Inject toggle button on load
  window.addEventListener('DOMContentLoaded', () => {
    const btn = document.createElement('button');
    btn.id = 'theme-toggle-btn';
    btn.onclick = () => window.toggleTheme && window.toggleTheme();
    btn.ariaLabel = "Toggle Dark Mode";
    btn.innerHTML = `
            <svg class="theme-toggle-sun" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            <svg class="theme-toggle-moon" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>
        `;
    document.body.appendChild(btn);
  });
})();


function copyCode(button) {
  const codeBlock = button.nextElementSibling.querySelector("code");
  const textToCopy = codeBlock.textContent;

  navigator.clipboard
    .writeText(textToCopy)
    .then(function () {
      // Change button text and style
      button.textContent = "Copied!";
      button.classList.add("copied");

      // Reset button after 2 seconds
      setTimeout(function () {
        button.textContent = "Copy Code";
        button.classList.remove("copied");
      }, 2000);
    })
    .catch(function (err) {
      console.error("Failed to copy: ", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      button.textContent = "Copied!";
      button.classList.add("copied");
      setTimeout(function () {
        button.textContent = "Copy Code";
        button.classList.remove("copied");
      }, 2000);
    });
}
