$(document).ready(function () {
    /**
     * Helper to initialize plugins on a specific row.
     */
    function initRowPlugins($row) {
        // Initialize Flatpickr for date inputs
        if (typeof flatpickr === 'function') {
            $row.find('.StartDate, .EndDate').each(function() {
                // Destroy existing instance if it exists to prevent memory leaks
                if (this._flatpickr) {
                    this._flatpickr.destroy();
                }
                
                flatpickr(this, {
                    dateFormat: "d/m/Y",
                    allowInput: true,
                    disableMobile: "true"
                });
            });
        }

        // Initialize Select2 for dropdowns
        if ($.fn.select2) {
            $row.find('.select-leave').each(function() {
                if ($(this).data('select2')) {
                    $(this).select2('destroy');
                }
                $(this).select2({
                    minimumResultsForSearch: Infinity,
                    width: '100%'
                });
            });
        }
    }

    // Initial call to ensure existing rows work
    initRowPlugins($('.regular-objective-row, .strategic-objective-row'));

    /**
     * Prevent clicks on disabled tabs
     */
    $(document).on('click', '#objective-review-tab .nav-link.disabled', function (e) {
        e.preventDefault();
        // Stop propagation to prevent Bootstrap's tab.js from potentially activating
        // or other handlers from firing.
        e.stopPropagation(); 
    });

    /**
     * Handle Calendar Icon clicks to trigger Flatpickr
     */
    $(document).on('click', '.calendar-btn-startdate, .calendar-btn-enddate', function (e) {
        e.preventDefault();
        const input = $(this).siblings('input')[0];
        if (input && input._flatpickr) {
            input._flatpickr.open();
        }
    });

    /**
     * Handle Add Row button click using Event Delegation
     */
    $(document).on('click', '.btn-add', function (e) {
        e.preventDefault();

        const $section = $(this).closest('.box-7');
        const $container = $section.find('.regular-objectives-container, .strategic-objectives-container');
        const rowClass = $section.hasClass('regular-objectives') ? 'regular-objective-row' : 'strategic-objective-row';
        const $template = $container.find('.' + rowClass).first();

        if (!$template.length) return;

        const $newRow = $template.clone();

        // Clean up Select2 artifacts
        $newRow.find('.select2-container').remove();
        $newRow.find('select').each(function () {
            $(this).removeClass('select2-hidden-accessible')
                   .removeAttr('data-select2-id')
                   .removeAttr('id') // Remove duplicate ID to prevent Select2 conflicts
                   .val('');
            $(this).find('option').removeAttr('data-select2-id'); // Clear internal IDs from options
        });

        // Clean up Flatpickr artifacts
        $newRow.find('.StartDate, .EndDate').each(function() {
            $(this).removeClass('flatpickr-input active').removeAttr('readonly');
            if (this._flatpickr) delete this._flatpickr;
            this._flatpickr = undefined;
        });

        // Reset values
        $newRow.find('input, textarea').val('');
        $newRow.find('.error-msg').hide();
        $newRow.find('.is-invalid').removeClass('is-invalid');
        $newRow.find('.validation-issue').removeClass('validation-issue'); // Remove validation-issue class

        $container.append($newRow);
        initRowPlugins($newRow);
    });

    /**
     * Handle Delete Row button click - Keeps at least one row
     */
    $(document).on('click', '.btn-delete-small', function (e) {
        e.preventDefault();
        const $row = $(this).closest('.row');
        const $container = $row.closest('.regular-objectives-container, .strategic-objectives-container');
        const rowSelector = $row.hasClass('regular-objective-row') ? '.regular-objective-row' : '.strategic-objective-row';
        
        if ($container.find(rowSelector).length > 1) {
            $row.remove();
        } else {
            // If last row, clear content instead of removing
            $row.find('input, textarea').val('');
            $row.find('select').val('').trigger('change');
            $row.find('.error-msg').hide();
            $row.find('.is-invalid').removeClass('is-invalid');
        }
    });
});