import $ from "jquery";
import Cleave from 'cleave.js';

import FormValidation from "./form-validation";


let FormEvent = {};
(function (context) {

  context.enableNextBtn = function($form) {
    var $button = $form.find('button.disabled');
    $button.removeClass('disabled');

    $form.find('.input-wrap').removeClass('error');
  };

  context.disableNextBtn = function($form) {
    var $button = $form.find('button');
    $button.addClass('disabled');
  };

  context.formatInput = function() {
    // new Cleave('.after-input .zipcode-input', {
    //   numericOnly: true,
    //   blocks: [5],
    // });

    new Cleave('.after-input .phone-number-input', {
      numericOnly: true,
      blocks: [0, 3, 0, 3, 4],
      delimiters: ["(", ")", " ", "-"],
    });

    new Cleave('.after-input .dob-input', {
      date: true,
      delimiter: '/',
      datePattern: ['m', 'd', 'Y']
    });
  }

  context.toggleInput = function() {
    var toggleInputWrap = function($element) {
      // Remove active/error style for other input-wrap
      var $currentInputWrap = $element.closest('.input-wrap');
      var $parent = $currentInputWrap.parent();
      // console.log($parent[0].classList);
      $parent.find('.input-wrap').each(function() {
        if (!$(this).is($currentInputWrap)) {
          $(this).removeClass('active');
          $(this).removeClass('error');
        }
      });
    };

    var focusInput = function($parent) {
      var $beforeInput = $parent.find('.before-input');
      var $afterInput = $parent.find('.after-input');

      $beforeInput.addClass('hide');
      $afterInput.removeClass('hide');
      $afterInput.each(function() {
        if ($(this).find('input').val() === '') {
          $(this).find('input').focus();
          return false;
        }
      });
    };

    $('.input-wrap').on('click', function() {
      if ($(this).find('.before-input').length === 1) {
        $(this).find('.before-input input').focus();
      }

      $(this).removeClass('error');
    });

    $('.before-input').on('click', function(e) {
      e.stopPropagation();

      var $parent = $(this).closest('.input-wrap');
      focusInput($parent);
    });

    $('.before-input input').on('focus', function (e) {
      e.stopPropagation();

      var $parent = $(this).closest('.input-wrap');
      if ($(this).closest('.field').length === 1) {
        $parent = $(this).closest('.field');
      }

      focusInput($parent);
    });

    $('.after-input input').on('focus', function(e) {
      e.stopPropagation();
      var $afterInput = $(this).closest('.after-input');

      toggleInputWrap($afterInput);
    });

    $('.input-wrap').on('click', '.checkbox', function() {
      var $wrap = $(this).closest('.input-wrap');
      $wrap.find('.checkbox').removeClass('active');

      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
      } else {
        $(this).addClass('active');
      }
    });
  };


  context.validate = function($form, error=false) {
    var showError = function($element) {
      if ($element.hasClass('input-wrap')) {
        $element.addClass('error');
      } else {
        $element.closest('.input-wrap').addClass('error');
      }
    };

    var validateInputList = function($form) {
      var $inputList = $form.find('input:visible');

      if ($inputList.length === 0) {
        return true;
      }

      var count = 0;

      $.each($inputList, function(index, $input) {
        $input = $($input);
        var inputVal = $.trim($input.val());
        if (inputVal === '') {
          count += 1;
          if (error) {
            showError($input);
          }
          return false;
        }

        if ($input.hasClass('email-input')) {
          if (!FormValidation.isEmail(inputVal)) {
            count += 1;
            if (error) {
              showError($input);
            }
            return false;
          }
        }

        if ($input.hasClass('phone-number-input')) {
          if (!FormValidation.isPhone(inputVal)) {
            count += 1;
            if (error) {
              showError($input);
            }
            return false;
          }
        }

        if ($input.hasClass('zipcode-input')) {
          if (!FormValidation.isZip(inputVal)) {
            count += 1;
            if (error) {
              showError($input);
            }
            return false;
          }
        }

        if ($input.hasClass('dob-input')) {
          if (inputVal.length !== 10) {
            count += 1;

            if (error) {
              showError($input);
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
      var count = 0;

      $.each($inputWrapList, function(index, $inputWrap) {
        $inputWrap = $($inputWrap);
        var $checkboxList = $inputWrap.find('.checkbox:visible');
        if ($checkboxList.length > 0 && !$checkboxList.hasClass('active')) {
          count += 1;
          if (error) {
            showError($inputWrap);
          }

          return false;
        }
      });

      return count === 0;
    };

    return validateInputList($form) && validateMultipleChoices($form) && validateCheckboxList($form);
  };

  context.changeFormStatus = function($form) {
    if (context.validate($form)) {
      context.enableNextBtn($form);
    } else {
      context.disableNextBtn($form);
    }
  };

})(FormEvent);


$(document).ready(function () {
  FormEvent.toggleInput();
  FormEvent.formatInput();

  $('.example-list').on('keyup blur change click', function () {
    var $form = $(this);
    FormEvent.changeFormStatus($form);
  });

  $('.example-list').on('click', '.submit-btn', function () {
    var $form = $(this).closest(".example-list");
    if (FormEvent.validate($form, true)) {
      FormEvent.enableNextBtn($form);
    } else {
      FormEvent.disableNextBtn($form);
    }
  });
});
