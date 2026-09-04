

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("copy");
  const copyIcon = button.querySelector("i");    // your masked copy icon
  const tick = button.querySelector(".tick-icon"); 

  button.addEventListener("click", function () {
    // Copy text (example: fixed string or input value)
    
    const textToCopy = "Some text to copy"; // replace with dynamic text if needed
    navigator.clipboard.writeText(textToCopy).then(() => {
      // hide copy icon
      copyIcon.style.opacity = 0;

      // show tick
      tick.classList.add("show");

      // update tooltip text
      button.setAttribute("data-bs-original-title", "Copied!");
      tooltip.show();

      // reset after 1 seconds
      setTimeout(() => {
        tick.classList.remove("show");
        copyIcon.style.opacity = 1;
        button.setAttribute("data-bs-original-title", "Copy to clipboard");
      }, 1000);
    });
  });
});

