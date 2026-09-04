document.addEventListener("DOMContentLoaded", function () {

    // Localize weekdays
    flatpickr.localize({
        weekdays: {
            shorthand: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            longhand: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        }
    });

    // Initialize Start Date picker
    const startPicker = flatpickr(".StartDate", {
        dateFormat: "Y-m-d",
        disableMobile: true,
        clickOpens: false
    });

    // Initialize End Date picker
    const endPicker = flatpickr(".EndDate", {
        dateFormat: "Y-m-d",
        disableMobile: true,
        clickOpens: false
    });

    console.log("StartPicker created:", startPicker);
    console.log("EndPicker created:", endPicker);

    // Get buttons
    const startBtn = document.querySelector(".calendar-btn-startdate");
    const endBtn = document.querySelector(".calendar-btn-enddate");

    // Open Start Date picker when button clicked
  if (startBtn) {

     startBtn.addEventListener("click", function () {

         const input = this.previousElementSibling; // ← gets the adjacent StartDate inputif (input && input._flatpickr) {

             input._flatpickr.open();  // ← access flatpickr instance via _flatpickr property         }

     });

 }

    // Open End Date picker when button clicked
  if (endBtn) {

     endBtn.addEventListener("click", function () {

         const input = this.previousElementSibling; // ← gets the adjacent EndDate inputif (input && input._flatpickr) {

             input._flatpickr.open();  // ← access flatpickr instance via _flatpickr property         }

     });

 }
});


document.addEventListener("DOMContentLoaded", function () {

    const startInput = document.querySelector(".StartTime");
    const endInput = document.querySelector(".EndTime");

    if (startInput) {
        const startTimePicker = flatpickr(startInput, {
            enableTime: true,
            noCalendar: true,
            dateFormat: "h:i K",
           time_24hr: false, 
            disableMobile: true,
            clickOpens: false
        });

        // Optional: attach open button
        const startBtn = document.querySelector(".calendar-btn-starttime");
        if (startBtn) startBtn.addEventListener("click", () => startTimePicker.open());
    }

    if (endInput) {
        const endTimePicker = flatpickr(endInput, {
            enableTime: true,
            noCalendar: true,
            dateFormat: "h:i K",
            time_24hr: false,
            disableMobile: true,
            clickOpens: false
        });

        // Optional: attach open button
        const endBtn = document.querySelector(".calendar-btn-endtime");
        if (endBtn) endBtn.addEventListener("click", () => endTimePicker.open());
    }

});

