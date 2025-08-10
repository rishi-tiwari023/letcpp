// Shared JavaScript for solution pages
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
