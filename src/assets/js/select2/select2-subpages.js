
document.addEventListener("DOMContentLoaded", function () {
    // Generic select2
   $('.js-select').select2({
                 width: 'auto',
                minimumResultsForSearch: Infinity,
                placeholder: $(this).data('placeholder'),
                allowClear: false, 
                });

    // Specific LeaveType select2
    $('.LeaveType').select2({
        width: '100%',
        placeholder: function() {
            return $(this).data('placeholder');
        },
        allowClear: false,
        minimumResultsForSearch: Infinity,
        dropdownCssClass: 'select-leave',
        containerCssClass: 'select-leave'
    });
// Specific LeaveType select2
     $('.select-leave').select2({
        width: '100%',
        allowClear: false,
        minimumResultsForSearch: Infinity,
        templateResult: function (data) {
            if (!data.element) return data.text;
            return $(data.element).data('html')
                ? $(data.element).data('html')
                : data.text;
        },
        templateSelection: function (data) {
            if (!data.element) return data.text;
            return $(data.element).data('html')
                ? $(data.element).data('html')
                : data.text;
        },
        escapeMarkup: function (markup) {
            return markup;
        }
    });
});
