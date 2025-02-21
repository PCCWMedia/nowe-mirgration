var timer; // Declare timer variable outside the click function

$('#getOTP_btn').click(function () {
  
    $(this).removeClass('standardbtn').addClass('disabled-btn');
    var count = 120;
    var countdownSpan = $(this);
    countdownSpan.text('Sent. Expires in ' + count + ' seconds...');
    // countdownSpan.text('短訊已發送並將於' + count + '秒後逾時失效...');

    $('.otp-wrapper').fadeIn();
    $('#submit-OTP').show();
    $("#otp-inputs input").first().focus();
    timer = setInterval(function () {
      count--;
      countdownSpan.text('Sent. Expires in ' + count + ' seconds...');
      // countdownSpan.text('短訊已發送並將於' + count + '秒後逾時失效...');

      if (count < 0) {
        clearInterval(timer);
        countdownSpan.text('Resend One-Time Pass Code');
        $('#getOTP_btn').removeClass('disabled-btn').addClass('standardbtn');
      }
    }, 1000);
});


// code update

var BACKSPACE_KEY = 8;
var ENTER_KEY = 13;
var TAB_KEY = 9;
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var ZERO_KEY = 48;
var NINE_KEY = 57;

function otp(elementId) {
  var inputs = document.getElementById(elementId).children;
  var callback = null;

  function init(completeCallback) {
    callback = completeCallback;
    for (i = 0; i < inputs.length; i++) {
      registerEvents(i, inputs[i]);
    }
  }

  function destroy() {
    for (i = 0; i < inputs.length; i++) {
      registerEvents(i, inputs[i]);
    }
  }

  function registerEvents(index, element) {
    element.addEventListener("input", function(ev) {
      onInput(index, ev);
    });
    element.addEventListener("paste", function(ev) {
      onPaste(index, ev);
    });
    element.addEventListener("keydown", function(ev) {
      onKeyDown(index, ev);
    });
  }

  function onPaste(index, ev) {
    ev.preventDefault();
    var curIndex = index;
    var clipboardData = ev.clipboardData || window.clipboardData;
    var pastedData = clipboardData.getData("Text");
    for (i = 0; i < pastedData.length; i++) {
      if (i < inputs.length) {
        if (!isDigit(pastedData[i])) break;
        inputs[curIndex].value = pastedData[i];
        curIndex++;
      }
    }
    if (curIndex == inputs.length) {
      inputs[curIndex - 1].focus();
      callback(retrieveOTP());
      checkOTPFields();
    } else {
      inputs[curIndex].focus();
    }
  }

  function onKeyDown(index, ev) {
    var key = ev.keyCode || ev.which;
    if (key == LEFT_KEY && index > 0) {
      ev.preventDefault(); // prevent cursor to move before digit in input
      inputs[index - 1].focus();
    }
    if (key == RIGHT_KEY && index + 1 < inputs.length) {
      ev.preventDefault();
      inputs[index + 1].focus();
    }
    if (key == BACKSPACE_KEY && index > 0) {
      if (inputs[index].value == "") {
        // Empty and focus previous input and current input is empty
        inputs[index - 1].value = "";
        inputs[index - 1].focus();
      } else {
        inputs[index].value = "";
      }
    }
    if (key == ENTER_KEY) {
      // force submit if enter is pressed
      ev.preventDefault();
      if (isOTPComplete()) {
        callback(retrieveOTP());
      }
    }
    if (key == TAB_KEY && index == inputs.length - 1) {
      // force submit if tab pressed on last input
      ev.preventDefault();
      if (isOTPComplete()) {
        callback(retrieveOTP());
      }
    }
  }

  function onInput(index, ev) {
    var value = ev.data || ev.target.value;
    var curIndex = index;
    for (i = 0; i < value.length; i++) {
      if (i < inputs.length) {
        if (!isDigit(value[i])) {
          inputs[curIndex].value = "";
          break;
        }
        inputs[curIndex++].value = value[i];
        if (curIndex == inputs.length) {
          if(isOTPComplete()) {
            callback(retrieveOTP());
          }
        } else {
          inputs[curIndex].focus();
        }
      }
    }
  }

  function retrieveOTP() {
    var otp = "";
    for (i = 0; i < inputs.length; i++) {
      otp += inputs[i].value;
    }
    return otp;
  }

  function isDigit(d) {
    return d >= "0" && d <= "9";
  }

  function isOTPComplete() {
    var isComplete = true;
    var i = 0;
    while (i < inputs.length && isComplete) {
      if (inputs[i].value == "") {
        isComplete = false;
      }
      i++;
    }
    return isComplete;
  }

  return {
    init: init
  };
}

var otpModule = otp("otp-inputs");
otpModule.init(function(passcode) {});


let isValidationInProgress = false;

// Monitor input fields for changes
$('.code-wrapper input').on('keyup', function () {
  checkOTPFields();
});

// Function to check if all OTP fields are filled
function checkOTPFields() {
  if (isValidationInProgress) {
    // If validation is in progress, don't enable the button
    return;
  }

  let allInputsFilled = true;

  // Check if all inputs are filled
  $('.code-wrapper input').each(function () {
    if ($(this).val() === '') {
      allInputsFilled = false;
      return false; // Exit the loop early
    }
  });

  if (allInputsFilled) {
    $('#submit-OTP').removeAttr('disabled');
  } else {
    $('#submit-OTP').attr('disabled', 'disabled');
  }
}

// Trigger validation when the last input field is filled
$('.code-wrapper input:last').on('input', function () {
  if ($(this).val() !== '') {
    checkOTPValidation();
  }
});

// Trigger validation when the submit button is clicked
$('#submit-OTP').on('click', function () {
  checkOTPValidation();
});

// Function for OTP validation
function checkOTPValidation() {
  isValidationInProgress = true;

  // Show loading spinner and disable the submit button
  $('.loading-wrapper').addClass('show');
  $('#submit-OTP').attr('disabled', 'disabled');

  setTimeout(function () {
    // // Hide loading spinner and show error message
    // $('.loading-wrapper').removeClass('show');
    // $('#otp-error').show();

    // // Re-enable the submit button
    // $('#submit-OTP').removeAttr('disabled');
    // isValidationInProgress = false;

    // // Re-run checkOTPFields to ensure button state is correct
    // checkOTPFields();
    window.location = 'nowe-migration-create-acct-pwd.html';
  }, 2000);
}



