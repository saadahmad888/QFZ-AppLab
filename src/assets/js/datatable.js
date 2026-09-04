$(document).ready(function () {
    $('.requestTableData').DataTable({
        paging: true,
        searching: false,
        ordering: true,
        info: true,
        lengthChange: true,
        pageLength: 10,
        dom: 'ft<"bottom d-flex justify-content-between"lip>'
    });
});