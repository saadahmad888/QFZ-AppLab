$(document).ready(function() {
    $('#categorySelect').select2({
        placeholder: "Categories",
        allowClear: true,
        minimumResultsForSearch: 0 
    });

    $('#sourceSelect').select2({
        placeholder: "Source",
        allowClear: true,
        minimumResultsForSearch: 0
    });
});
