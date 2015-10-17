Template.layout.hooks({
    rendered: function () {
        // Bootstrap enhancement : collapses the menu when link is clicked in menu on mobile version
        $(document).on('click', '.navbar-collapse.in', function (e) {
            if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
                $(this).collapse('hide');
            }
        });
    }
});