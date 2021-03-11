import jquery from "jquery";
import validation from './lib/validation';
var $ = jquery;


jquery.fn.extend({
  validateEmail: function() {
    var result = true;
    this.each(function() {
      result = validation.isEmail($.trim(this.value));
      return result;
    });

    return result;
  },

  validatePhone: function() {
    var result = true;
    this.each(function() {
      result = validation.isPhone($.trim(this.value));
      return result;
    });

    return result;
  },

  validateZip: function() {
    var result = true;
    this.each(function() {
      result = validation.isZip($.trim(this.value));
      return result;
    });

    return result;
  },

  validateDob: function() {
    var result = true;
    this.each(function() {
      result = validation.isDOB($.trim(this.value));
      return result;
    });

    return result;
  },

  clearError: function() {
    // console.log(this)
    this.find('.error-message').html('');
  },

  showError: function($error) {
    $error.html(this.data('error'));
    if (this.hasClass('input-wrap')) {
      this.removeClass('active').addClass('error');
    } else {
      this.closest('.input-wrap').removeClass('active').addClass('error');
    }
  },

  validate: function(showMessage) {
    if (!showMessage) {
      showMessage = true;
    }

    var validateInputList = function($form) {
      var $inputList = $form.find('input:visible');
      var $error = $form.find('.error-message');

      if ($inputList.length === 0) {
        return true;
      }

      var count = 0;

      $.each($inputList, function(index, $input) {
        $input = $($input);
        var inputVal = $.trim($input.val());
        if (inputVal === '') {
          count += 1;
          if (showMessage) {
            $input.showError($error);
          }
          return false;
        }

        if ($input.hasClass('email-input')) {
          if (!$input.validateEmail()) {
            count += 1;
            if (showMessage) {
              $input.showError($error);
            }
            return false;
          }
        }

        if ($input.hasClass('phone-number-input')) {
          if (!$input.validatePhone()) {
            count += 1;
            if (showMessage) {
              $input.showError($error);
            }
            return false;
          }
        }

        if ($input.hasClass('zipcode-input')) {
          if (!$input.validateZip()) {
            count += 1;
            if (showMessage) {
              $input.showError($error);
            }
            return false;
          }
        }

        if ($input.hasClass('dob-input')) {
          if (!$input.validateDob()) {
            count += 1;

            if (showMessage) {
              $input.showError($error);
            }
            return false;
          }
        }
      });

      // Make sure all of input have value.
      return count === 0;
    };

    var validateMultipleChoices = function($form) {
      var $choices = $form.find('.choice.multiple');

      if ($choices.length === 0) {
        return true;
      }

      var count = 0;
      $.each($choices, function(index, $choice) {
        $choice = $($choice);

        if (!$choice.is(':hidden') && $choice.find('.checkbox').hasClass('active')) {
          count += 1;
          return false;
        }
      });

      // Make sure multiple choices have one checked at least.
      return count > 0;
    };

    var validateCheckboxList = function($form) {
      var $inputWrapList = $form.find('.input-wrap');
      var $error = $form.find('.error-message');
      var count = 0;

      $.each($inputWrapList, function(index, $inputWrap) {
        $inputWrap = $($inputWrap);
        var $checkboxList = $inputWrap.find('.checkbox:visible');
        if ($checkboxList.length > 0 && !$checkboxList.hasClass('active')) {
          count += 1;
          if (error) {
            $inputWrap.showError($error);
          }

          return false;
        }
      });

      return count === 0;
    };

    var $form = this;

    $form.clearError();
    if (!validateInputList($form)) {
      return false;
    }

    if (!validateMultipleChoices($form)) {
      return false;
    }

    if (!validateCheckboxList($form)) {
      return false;
    }

    return true;
  },
});
