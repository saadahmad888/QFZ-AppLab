document.addEventListener("DOMContentLoaded", function () {

    const fileInput = document.getElementById("Attachment");
    const uploadBtn = document.querySelector(".upload-btn");
    const fileName = document.querySelector(".file-name");

    if (uploadBtn && fileInput) {

        uploadBtn.addEventListener("click", function () {
            fileInput.click(); // open file dialog
        });

        fileInput.addEventListener("change", function () {
            if (fileInput.files.length > 0) {
                fileName.textContent = fileInput.files[0].name;
            } else {
                fileName.textContent = "No file chosen";
            }
        });
    }
});
