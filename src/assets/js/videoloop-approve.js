document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("approveModal");

  if (!modal) return;

  // Scope selectors to this specific modal to prevent selecting elements from other modals
  const lottie = modal.querySelector("#successAnim");
  const loader = modal.querySelector(".modalLoader");
  const successWrapper = modal.querySelector(".successWrapper");

  if (!lottie || !loader || !successWrapper) return;

  modal.addEventListener("shown.bs.modal", () => {
    // Show loader first
    loader.classList.remove("d-none");
    successWrapper.classList.add("d-none");

    // Reset Lottie safely
    if (typeof lottie.stop === "function") lottie.stop();
    lottie.loop = false;

    // Delay then show success
    setTimeout(() => {
      loader.classList.add("d-none");
      successWrapper.classList.remove("d-none");
      if (typeof lottie.play === "function") lottie.play();
    }, 2000); // change delay if needed
  });
});