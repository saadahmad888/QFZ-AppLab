$(document).ready(function () {

    // Renumber dependents in order
    function updateDependentNumbers() {
        $('#dependentWrapper .dependent-block').each(function (index) {
            $(this).find('h3').text(`Dependent ${index + 1} - Information`);
        });
    }

    // ADD NEW DEPENDENT
    $('#addDependent').on('click', function () {

        let $first = $('#dependentWrapper .dependent-block').first();
        let $clone = $first.clone(true, true);

        // Reset values inside clone
        $clone.find('input').val('');
        $clone.find('textarea').val('');
        $clone.find('select').val('').trigger('change');

        // Close all existing blocks
        $('.dependent-block').removeClass('open');
        $('.dependent-body').slideUp();

        // ⭐ Add clone to the TOP
        $clone.css('height', 'auto'); // Prevent jump
        $clone.prependTo('#dependentWrapper');

        // Open the newly added block
        $clone.addClass('open');
        $clone.find('.dependent-body').slideDown();

        updateDependentNumbers();
    });

    // ACCORDION TOGGLE
    $(document).on('click', '.dependent-header', function () {
        let $block = $(this).closest('.dependent-block');

        if ($block.hasClass('open')) {
            $block.removeClass('open');
            $block.find('.dependent-body').slideUp();
        } else {
            $('.dependent-block').removeClass('open');
            $('.dependent-body').slideUp();

            $block.addClass('open');
            $block.find('.dependent-body').slideDown();
        }
    });

    // REMOVE DEPENDENT BLOCK
    $(document).on('click', '.close-dependent', function (e) {
        e.stopPropagation(); // Prevent accordion toggle

        let $block = $(this).closest('.dependent-block');

        $block.slideUp(300, function () {
            $block.remove();
            updateDependentNumbers();
        });
    });

});
