
document.addEventListener('DOMContentLoaded', function() {

    const continueMsg = document.querySelector('.welcome-msg .continue-msg');
    const acceptBtn = document.querySelector('.welcome-msg .accept-continue-btn');
    const offcanvasEl = document.getElementById('offcanvasChatbot');
    const getStartedBtn = document.querySelector('.welcome-msg .get-started-btn');
    const welcomeMsg = document.querySelector('.welcome-msg');
    const helloDiv = document.querySelector('.hello');
    const closeHelloBtn = document.querySelector('.hello .close-hello');
    const offcanvasTitle = document.getElementById('offcanvasChatbotLabel');
    const minimizeBtn = document.querySelector('.btn-mimimise');
    const chatbot = document.querySelector('.chatbot-offcanvas');
    const closeBtn = document.querySelector('#offcanvasChatbot .btn-close');

    let continueTimeout;
    let isMinimized = false;

    /* ---------------------------
       SHOW CONTINUE-MSG AFTER 100ms
    ----------------------------*/
    offcanvasEl.addEventListener('shown.bs.offcanvas', function () {
        clearTimeout(continueTimeout);

        if (isMinimized) {
            // Reopen after minimize — show chat directly, skip welcome
            welcomeMsg.style.display = 'none';
            helloDiv.style.display = 'flex';
            offcanvasEl.classList.add('hello-active');
            isMinimized = false;
        } else {
            continueTimeout = setTimeout(function() {
                continueMsg.classList.add('active');
            }, 100);
        }
    });

    acceptBtn.addEventListener('click', function () {
        continueMsg.classList.remove('active');
        clearTimeout(continueTimeout);
    });

    /* ---------------------------
       RESET STATE ON CLOSE BUTTON ONLY
    ----------------------------*/
    offcanvasEl.addEventListener('hidden.bs.offcanvas', function () {
        continueMsg.classList.remove('active');
        clearTimeout(continueTimeout);

        if (!isMinimized) {
            // Real close — reset to welcome screen
            welcomeMsg.style.display = 'block';
            helloDiv.style.display = 'none';
            offcanvasTitle.textContent = '';
            offcanvasEl.classList.remove('hello-active');
        }
    });

    /* ---------------------------
       SHOW HELLO WINDOW
       TOGGLE BACKGROUND
    ----------------------------*/
    function updateBackground() {
        const isVisible = window.getComputedStyle(helloDiv).display !== 'none';
        if (isVisible) {
            offcanvasEl.classList.add('hello-active');
        } else {
            offcanvasEl.classList.remove('hello-active');
        }
    }

    getStartedBtn.addEventListener('click', function() {
        welcomeMsg.style.display = 'none';
        helloDiv.style.display = 'flex';

        offcanvasTitle.innerHTML = `
            <div class="d-flex align-items-center gap-3">
                <img src="assets/images/chatbot-icon.svg" class="img-fluid" width="64" height="64"/>
                <div class="d-flex flex-column gap-2">
                    <h2 class="fs-24 fw-500 mb-0 text-black">QFZ Bot</h2>
                    <p class="opc-60 mb-0 text-black fs-16">Let's get your request sorted in seconds</p>
                </div>
            </div>
        `;

        updateBackground();
    });

    if (closeHelloBtn) {
        closeHelloBtn.addEventListener('click', function() {
            helloDiv.style.display = 'none';
            welcomeMsg.style.display = 'block';
            offcanvasTitle.textContent = '';
            updateBackground();
        });
    }

    /* ---------------------------
       MINIMISE BUTTON
       (close but preserve + restore chat state)
    ----------------------------*/
    if (minimizeBtn && chatbot) {
        minimizeBtn.addEventListener('click', function() {
            isMinimized = true;
            if (closeBtn) {
                closeBtn.click();
            }
        });
    }



const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("filePreview");

let allFiles = [];

fileInput.addEventListener("change", function () {
  Array.from(this.files).forEach(file => {
    if (!allFiles.some(f => f.name === file.name && f.size === file.size)) {
      allFiles.push(file);
    }
  });
  renderFiles();
});


function renderFiles() {
  preview.innerHTML = "";

  allFiles.forEach((file, index) => {
    const div = document.createElement("div");
    div.className = "file-item";

    // Thumbnail image
    const img = document.createElement("img");
    img.className = "file-thumb";
    if (file.type.startsWith("image/")) {
      img.src = URL.createObjectURL(file);
    } else {
      img.src = "assets/images/file-image.svg"; // replace with your generic file icon
    }
    div.appendChild(img);

    // File name (always hidden until hover)
    const name = document.createElement("span");
    name.className = "file-name";
    name.textContent = file.name;
    div.appendChild(name);

    // Close icon (hidden by default)
    const closeIcon = document.createElement("img");
    closeIcon.src = "assets/images/file-close.svg"; // your close icon
    closeIcon.className = "file-close";
    closeIcon.dataset.index = index;
    div.appendChild(closeIcon);

    preview.appendChild(div);
  });


  // Update input.files
  const dt = new DataTransfer();
  allFiles.forEach(file => dt.items.add(file));
  fileInput.files = dt.files;
}

// Remove file
preview.addEventListener("click", function (e) {
  if (e.target.classList.contains("file-close")) {  
    const index = parseInt(e.target.dataset.index);
    allFiles.splice(index, 1);
    renderFiles();
  }
});

});

/* ---------------------------
   BOT ATTACHMENT DOWNLOAD HANDLER
----------------------------*/
const downloadTasks = new Map();

document.addEventListener('click', function(e) {
    // Restrict logic to .chat-attachment-wrapper-bot
    const botWrapper = e.target.closest('.chat-attachment-wrapper-bot');
    if (!botWrapper) return;

    const downloadBtn = e.target.closest('button img[src*="download-icon.svg"]')?.parentElement;
    const closeBtn = e.target.closest('button img[src*="close-btn-attachment.svg"]')?.parentElement;

    if (downloadBtn) {
        const attachment = downloadBtn.closest('.chat-attachment');
        const actionArea = attachment.lastElementChild;
        const originalContent = actionArea.innerHTML;

        // Switch UI to Loading/Stop state
        actionArea.innerHTML = `
            <div class="d-flex gap-2 align-items-center">
                <button class="btn p-0" type="button">
                    <img src="assets/images/close-btn-attachment.svg" class="img-fluid"/>
                </button>
                <div class="spinner-border text-white" role="status" style="width: 1.2rem; height: 1.2rem; border-width: 0.2em;">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;

        // Simulate a delay for the download process
        const taskId = setTimeout(() => {
            const fileName = attachment.querySelector('p')?.textContent || 'document.pdf';
            
            // Trigger static download
            const downloadLink = document.createElement('a');
            downloadLink.href = "assets/images/pdf-image.svg"; // Static asset path
            downloadLink.download = fileName;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            // Reset UI back to original download button
            actionArea.innerHTML = originalContent;
            downloadTasks.delete(attachment);
        }, 2500); // 2.5 second simulated delay

        downloadTasks.set(attachment, { taskId, originalContent });
    }

    if (closeBtn) {
        const attachment = closeBtn.closest('.chat-attachment');
        const task = downloadTasks.get(attachment);
        if (task) {
            // Stop the download by clearing the timeout
            clearTimeout(task.taskId);
            attachment.lastElementChild.innerHTML = task.originalContent;
            downloadTasks.delete(attachment);
        }
    }
});



//   const allowedExtensions = ["pdf", "doc", "docx", "xlsx", "txt"];

//   // Function to add download UI for a single bot message
//   function addDownloadButtons(botMessage) {
//     const links = botMessage.querySelectorAll("a");

//     links.forEach(link => {
//       const url = link.href;
//       const filename = url.split("/").pop();
//       const extension = filename.split(".").pop().toLowerCase();

//       if (!allowedExtensions.includes(extension)) return;

//       // Avoid duplicate UI
//       if (link.parentNode.querySelector(".download-container")) return;

//       // Container for download UI
//       const container = document.createElement("span");
//       container.className = "download-container";
//       container.style.marginLeft = "8px";
//       container.style.border = "1px solid red"; // red border
//       container.style.padding = "4px 6px";
//       container.style.borderRadius = "6px";
//       container.style.display = "inline-flex";
//       container.style.alignItems = "center";
//       container.style.gap = "4px";

//       // Download button
//       const downloadBtn = document.createElement("button");
//       downloadBtn.className = "download-btn";
//       downloadBtn.textContent = "Download";
//       downloadBtn.style.backgroundColor = "#4caf50";
//       downloadBtn.style.color = "#fff";
//       downloadBtn.style.border = "none";
//       downloadBtn.style.padding = "4px 8px";
//       downloadBtn.style.cursor = "pointer";
//       downloadBtn.style.borderRadius = "4px";

//       // Delete button
//       const deleteBtn = document.createElement("button");
//       deleteBtn.className = "delete-btn";
//       deleteBtn.textContent = "Delete";
//       deleteBtn.style.display = "none";
//       deleteBtn.style.backgroundColor = "#f44336";
//       deleteBtn.style.color = "#fff";
//       deleteBtn.style.border = "none";
//       deleteBtn.style.padding = "4px 8px";
//       deleteBtn.style.cursor = "pointer";
//       deleteBtn.style.borderRadius = "4px";

//       // Progress bar
//       const progressBar = document.createElement("div");
//       progressBar.className = "progress-bar";
//       progressBar.style.display = "none";
//       progressBar.style.width = "80px";
//       progressBar.style.height = "6px";
//       progressBar.style.backgroundColor = "rgba(255,255,255,0.2)";
//       progressBar.style.borderRadius = "4px";
//       progressBar.style.overflow = "hidden";

//       const progressFill = document.createElement("div");
//       progressFill.className = "progress-fill";
//       progressFill.style.width = "0%";
//       progressFill.style.height = "100%";
//       progressFill.style.backgroundColor = "#4caf50";
//       progressFill.style.transition = "width 0.1s linear";

//       progressBar.appendChild(progressFill);

//       container.appendChild(downloadBtn);
//       container.appendChild(deleteBtn);
//       container.appendChild(progressBar);

//       // Insert container next to link
//       link.parentNode.appendChild(container);

//       // Download click
//       downloadBtn.addEventListener("click", () => {
//         downloadBtn.style.display = "none";
//         deleteBtn.style.display = "inline-block";
//         progressBar.style.display = "block";

//         let progress = 0;
//         const interval = setInterval(() => {
//           progress += 5;
//           progressFill.style.width = progress + "%";

//           if (progress >= 100) {
//             clearInterval(interval);

//             // Trigger actual download
//             const a = document.createElement("a");
//             a.href = url;
//             a.download = filename;
//             document.body.appendChild(a);
//             a.click();
//             a.remove();

//             deleteBtn.style.display = "none";
//             progressBar.style.display = "none";
//             progressFill.style.width = "0%";
//             downloadBtn.style.display = "inline-block";
//           }
//         }, 100);
//       });

//       // Delete click
//       deleteBtn.addEventListener("click", () => {
//         deleteBtn.style.display = "none";
//         progressBar.style.display = "none";
//         progressFill.style.width = "0%";
//         downloadBtn.style.display = "inline-block";
//       });
//     });
//   }

//   // 1️⃣ Apply to existing messages
//   document.querySelectorAll(".chat-message.bot").forEach(msg => addDownloadButtons(msg));

//   // 2️⃣ Observe for new bot messages dynamically
//   const chatContainer = document.querySelector(".chat-container"); // replace with your chat wrapper
//   if (chatContainer) {
//     const observer = new MutationObserver(mutations => {
//       mutations.forEach(mutation => {
//         mutation.addedNodes.forEach(node => {
//           if (
//             node.nodeType === 1 &&
//             node.classList.contains("chat-message") &&
//             node.classList.contains("bot")
//           ) {
//             addDownloadButtons(node);
//           }
//         });
//       });
//     });
//     observer.observe(chatContainer, { childList: true, subtree: true });
//   }
// });