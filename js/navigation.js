$(function(){

    $('.nav-close-button, .overlay').on('click', closeMenu);

    $('.nav-button').on('click', function () {
        // open sidebar
        $('#sidebar').addClass('active');
        // fade in the overlay
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('.main-content').addClass('show-menu');
    });


    $(window).resize(function() {
        var width = $(window).width();

        if (width > 768) {
            closeMenu();
        }
    });

    $('.nav-item-head').on('click', function (e) {
        var _this = $(this);

        // $('#sidebar ul.collapse').removeClass('show');
        // $('a[aria-expanded=true]').attr('aria-expanded', 'false');

        if(_this.parent('li').hasClass('active')) {
            _this.parent('li').removeClass('active');
        } else {
            // $('.nav-item-head').parent('li').removeClass('active');
            _this.parent('li').addClass('active');
        }

    });

});

function closeMenu(){
    // hide sidebar
    $('#sidebar').removeClass('active');
    // hide overlay
    $('.overlay').removeClass('active');
    $('.main-content').removeClass('show-menu');
}
