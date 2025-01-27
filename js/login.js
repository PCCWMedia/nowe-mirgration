$(document).ready(function() {
    // login
    $('.form-floating-label input').focusin(function(){
        $(this).parent().addClass('has-value');
    });
    
    $('.form-floating-label input').blur(function(){
        if(!$(this).val().length > 0) {
        $(this).parent().removeClass('has-value');
        }
    });
    function removeHasValueClass() {
        $('.form-floating-label input').blur(function() {
            if (!$(this).val().length > 0) {
                $(this).parent().removeClass('has-value');
            }
        });
    }
    removeHasValueClass();

    // Function to check if the email input is valid
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Function to show error message for invalid email
    function showError() {
        $('.error').show();
    }

    // Function to redirect to password.html
    function redirectToPasswordPage() {
        window.location.href = 'welcome.html';
    }

    $('#email-input').keyup(function(event) {
        if (event.keyCode === 13 ) {
         $('#submit-email-btn').click();
       }
     });


    // Click event listener for submit button
    $('#submit-email-btn').click(function() {
        const email = $('#email-input').val();

        $.cookie("nowe-email", email);
        console.debug($.cookie("nowe-email"));
        
        if (isValidEmail(email)) {
            redirectToPasswordPage();
        } else {
            showError();
        }
    });

    // Hide error message initially
    $('.error').hide();


    $('#pwd-input').keyup(function(event) {
        if (event.keyCode === 13 ) {
            window.location = 'nowe-home-upgrading.html';
       }
    });

});