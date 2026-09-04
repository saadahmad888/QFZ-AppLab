document.addEventListener("DOMContentLoaded", function () {
    const arabicPattern = /[\u0600-\u06FF]/;
    Object.keys(markdownContent).forEach(key => {
        const el = document.getElementById(key);

        if (el && (!markdownContent[key] || markdownContent[key].trim() === "")) {
            el.remove();
            return;
        }

        if (!el) return;

        const withRealNewlines = markdownContent[key].replace(/\\n/g, "\n");
        const html = marked.parse(withRealNewlines);
        el.innerHTML = html;

        //  Detect Arabic or English content
        const textContent = el.innerText || el.textContent;

        if (arabicPattern.test(textContent)) {
            el.setAttribute("dir", "rtl");
            el.style.textAlign = "right";
        } else {
            el.setAttribute("dir", "ltr");
            el.style.textAlign = "left";
        }
    });
});

// document.addEventListener("DOMContentLoaded", function () {

//     const arabicPattern = /[\u0600-\u06FF]/;

//     Object.keys(markdownContent).forEach(key => {
//         const el = document.getElementById(key);

//         if (el && (!markdownContent[key] || markdownContent[key].trim() === "")) {
//             el.remove();
//             return;
//         }

//         if (!el) return;

//         const withRealNewlines = markdownContent[key].replace(/\\n/g, "\n");
//         const html = marked.parse(withRealNewlines);

//         el.innerHTML = html;

//         // Detect Arabic or English content
//         const textContent = el.innerText || el.textContent;

//         if (arabicPattern.test(textContent)) {
//             el.setAttribute("dir", "rtl");
//             el.style.textAlign = "right";
//         } else {
//             el.setAttribute("dir", "ltr");
//             el.style.textAlign = "left";
//         }
//     });

// });