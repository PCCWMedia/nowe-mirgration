$(document).ready(function() {
      
    function setBeforeHeight() {
        var boxTop = $('.box').offset().top; // Get the top offset of the .box element
        var messageTop = $('.message').offset().top; // Get the top offset of the .message element
        var heightDifference = messageTop - boxTop + 100; // Calculate the height difference

        // Dynamically set the height of the ::before pseudo-element
        var style = `
            .migration-overlay-wrapper .box::before {
                height: ${heightDifference}px;
            }
        `;
        // Remove any previous inline styles for the pseudo-element to avoid duplication
        $('style.dynamic-before-style').remove();

        // Append the new style to the document's head
        $('<style class="dynamic-before-style">').text(style).appendTo('head');
    }
    // Run the function on page load
    setBeforeHeight();
    
    // Run the function again on window resize
    $(window).on('resize', function() {
        setBeforeHeight();
    });


    // close popup
    $('.migration-overlay-wrapper,.close-popup').click(function () {
        $('body').removeClass('overflow');
        $('.migration-overlay-wrapper').removeClass('show');
    });

    $('.migration-overlay-wrapper .content').click(function(e) {
        e.stopPropagation();
    });    

    
});