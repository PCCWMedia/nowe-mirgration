$('input[type=text],input[type=email],input[type=password]').blur(function()
{
    if( $(this).val().length !== 0 ) {
        $(this).parent('.group').children('.group label').addClass('active');
    }
    else{
      $(this).parent('.group').children('.group label').removeClass('active');
    }
});

// toggle password
$(document).ready(function() {
  $('#viewpw').click(function() {
    if ($('#pw-input').attr('type') == 'text') {
      $('#pw-input').attr('type', 'password');
      $("#pwicon").attr("src","../img/viewcloseicon.png");
    } else {
      $('#pw-input').attr('type', 'text');
      $("#pwicon").attr("src","../img//viewicon.png");
    }
  });
});

$('.viewpw-btn').on('click', function() {
  var passwordInput = $(this).closest('.group').find('.password-input');
  var buttonIcon = $(this).find('img');

  if (passwordInput.attr('type') === 'password') {
    passwordInput.attr('type', 'text');
    buttonIcon.attr('src', '../img/viewicon.png'); // Change to open eye icon
  } else {
    passwordInput.attr('type', 'password');
    buttonIcon.attr('src', '../img/viewcloseicon.png'); // Change to closed eye icon
  }
});

$(function() {
  $('.nav-close-button, .overlay').on('click', closeMenu);
  $('.nav-button').on('click', function() {
    // open sidebar
    $('.sidebar').addClass('active');
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

  $('.nav-item-head').on('click', function(e) {
    var _this = $(this);

    // $('.sidebar ul.collapse').removeClass('show');
    // $('a[aria-expanded=true]').attr('aria-expanded', 'false');

    if (_this.parent('li').hasClass('active')) {
      _this.parent('li').removeClass('active');
    } else {
      // $('.nav-item-head').parent('li').removeClass('active');
      _this.parent('li').addClass('active');
    }
  });
});

function closeMenu() {
  // hide sidebar
  $('.sidebar').removeClass('active');
  // hide overlay
  $('.overlay').removeClass('active');
  $('.main-content').removeClass('show-menu');
}
// end of navigation control

// search filter
$('.search-button').on('click', function() {
  $('.searchbox').slideToggle('fast');
});

// realod captcha
$("#refresh").click(function() {
    $("#captcha").attr("src","captchas.php?r=" + Math.random());
});

$("#refresh-inwhite").click(function() {
    $("#captcha-inwhite").attr("src","captchas-inwhite.php?r=" + Math.random());
});


// why islocked?
$('#whyislock-btn').click(function() {
    $('#whyislock').slideDown(300);
});


// send button clicked
$('#send-btn').click(function() {
    $(this).text("Sent");
    $(this).attr( "disabled", "disabled" );
});


// setup footer
$(document).ready(function loadfooterHeight() {
  resetFooter();
});
$(window).on('resize', function() {
  resetFooter();
});
function resetFooter() {
  var footerheight = $("footer").outerHeight();
  $(".content-wrapper").css('padding-bottom', footerheight);
}


// select document type
var docLabel = "Document Number, e.g. A123456 (7)";

$("#document-type").change(function () {
  var selectedValue = $(this).val();
  if (selectedValue === "hkid") {
    $("#document-type-label").text(docLabel);
  } else if (selectedValue === "passport" || selectedValue === "businessReg") {
    $("#document-type-label").text("Document Number");
  }
});


// terms & conditions
$('.terms-conditions h2').click(function () {
  $(this).closest('.terms-conditions').toggleClass('active');
  $(this).next('.content').slideToggle();
});



// success page | app store
var userAgent = navigator.userAgent;
if (/iPad|iPhone|iPod/.test(userAgent)) {
    $('#ios-link').show();
} else if (/Android/.test(userAgent)) {
    $('#android-link').show();
} else {
    $('#ios-link, #android-link').show();
}


// nowe migration

// plans to be carried
$('#confirm-plans-btn').click(function () {
  $('.loading-wrapper').addClass('show');
  $('.plans-tobecarried-wrapper').hide();

  setTimeout(function() {
      window.location.href = 'nowe-migration-success.html';
  }, 3000);

});



// verify OTP
$('input[name="mobile-no"]').on('input', function () {
  if ($(this).val().trim() !== '') {
      $('#getOTP_btn').removeAttr("disabled");
  } else {
      $('#getOTP_btn').attr("disabled", "disabled");
  }
});

var timer; // Declare timer variable outside the click function

$('#getOTP_btn').click(function () {

    $(this).addClass('disabled-btn');
    var count = 120;
    var countdownSpan = $(this);
    countdownSpan.text('Sent. Expires in ' + count + ' seconds...');
    // countdownSpan.text('短訊已發送並將於' + count + '秒後逾時失效...');

    $('.one-time-passcode-wrapper').fadeIn();
    timer = setInterval(function () {
        count--;
        countdownSpan.text('Sent. Expires in ' + count + ' seconds...');
        // countdownSpan.text('短訊已發送並將於' + count + '秒後逾時失效...');

        if (count < 0) {
            clearInterval(timer);
            countdownSpan.text('Resend One-Time Passcode');
            $('#getOTP_btn').removeClass('disabled-btn');
        }
    }, 1000);
});
