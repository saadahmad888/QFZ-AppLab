// document.addEventListener("DOMContentLoaded", () => {
//     const lottie = document.getElementById("successAnim");
//     const modal = document.getElementById("leaveModal"); // must match modal ID

//     if (!modal || !lottie) return;

//     modal.addEventListener("shown.bs.modal", () => {
//         lottie.stop();       // reset animation to start
//         lottie.loop = false; // play only once
//         lottie.play();       // play animation
//     });
// });
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("leaveModal"); // modal ID stays same
  const lottie = document.getElementById("successAnim"); // still ID
  const loader = document.querySelector(".modalLoader"); // ✅ class now
  const successWrapper = document.querySelector(".successWrapper"); // ✅ class now

  if (!modal || !lottie || !loader || !successWrapper) return;

  modal.addEventListener("shown.bs.modal", () => {
    // ✅ Show loader first
    loader.classList.remove("d-none");
    successWrapper.classList.add("d-none");

    // ✅ Reset Lottie
    lottie.stop();
    lottie.loop = false;

    // ✅ Delay then show success
    setTimeout(() => {
      loader.classList.add("d-none");
      successWrapper.classList.remove("d-none");
      lottie.play();
    }, 2000); // change delay if needed
  });
});
