$(document).ready(function () {

    function initRowPlugins($row) {

        if (typeof flatpickr === 'function') {
            $row.find('.StartDate, .EndDate').each(function () {

                if (this._flatpickr) {
                    this._flatpickr.destroy();
                }

                flatpickr(this, {
                    dateFormat: "d/m/Y",
                    allowInput: true,
                    disableMobile: true
                });
            });
        }

        if ($.fn.select2) {
            $row.find('.select-leave').each(function () {

                if ($(this).data('select2')) {
                    $(this).select2('destroy');
                }

                $(this).select2({
                    placeholder: $(this).attr('data-placeholder') || "Select",
                    minimumResultsForSearch: Infinity,
                    width: '100%'
                });
            });
        }
    }

    initRowPlugins($('.regular-objective-row, .strategic-objective-row'));

    $(document).on('click', '#objective-review-tab .nav-link.disabled', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    $(document).on('click', '.calendar-btn-startdate, .calendar-btn-enddate', function (e) {
        e.preventDefault();
        const input = $(this).siblings('input')[0];
        if (input && input._flatpickr) {
            input._flatpickr.open();
        }
    });

    $(document).on('click', '.btn-add', function (e) {
        e.preventDefault();

        const $section = $(this).closest('.box-7');
        const $container = $section.find('.regular-objectives-container, .strategic-objectives-container');

        const rowClass = $section.hasClass('regular-objectives')
            ? 'regular-objective-row'
            : 'strategic-objective-row';

        const $template = $container.find('.' + rowClass).first();
        if (!$template.length) return;

        const $newRow = $template.clone();

        $newRow.find('.select2-container').remove();

        $newRow.find('select').each(function () {
            $(this)
                .removeClass('select2-hidden-accessible')
                .removeAttr('data-select2-id')
                .removeAttr('id')
                .val('');
            $(this).find('option').removeAttr('data-select2-id');
        });

        $newRow.find('.StartDate, .EndDate').each(function () {
            $(this)
                .removeClass('flatpickr-input active')
                .removeAttr('readonly')
                .val('');

            if (this._flatpickr) {
                this._flatpickr.destroy();
            }

            this._flatpickr = undefined;
        });

        $newRow.find('input, textarea').each(function () {
            $(this).val('');
            const newPlaceholder = $(this).attr('data-new-placeholder');
            if (newPlaceholder) {
                $(this).attr('placeholder', newPlaceholder);
            }
        });

        $newRow.find('select').each(function () {
            $(this).val('');
            const newPlaceholder = $(this).attr('data-new-placeholder');
            if (newPlaceholder) {
                $(this).attr('data-placeholder', newPlaceholder);
            }
        });

        $newRow.find('.error-msg').hide();
        $newRow.find('.is-invalid').removeClass('is-invalid');
        $newRow.find('.validation-issue').removeClass('validation-issue');

        $container.append($newRow);

        initRowPlugins($newRow);
    });

    $(document).on('click', '.btn-delete-small', function (e) {
        e.preventDefault();

        const $row = $(this).closest('.row');
        const $container = $row.closest('.regular-objectives-container, .strategic-objectives-container');

        const rowSelector = $row.hasClass('regular-objective-row')
            ? '.regular-objective-row'
            : '.strategic-objective-row';

        if ($container.find(rowSelector).length > 1) {
            $row.remove();
        } else {
            $row.find('input, textarea').val('');
            $row.find('select').val('').trigger('change');

            $row.find('input, textarea').each(function () {
                const newPlaceholder = $(this).attr('data-new-placeholder');
                if (newPlaceholder) {
                    $(this).attr('placeholder', newPlaceholder);
                }
            });

            $row.find('.error-msg').hide();
            $row.find('.is-invalid').removeClass('is-invalid');
        }
    });

});