import $ from "jquery";
import Cleave from 'cleave.js';

var jquery = $;

require('./lib/jquery.inputmask.min.js');

jquery.extend({
  formatInputValue: function() {
    new Cleave('.phone-number-input', {
      numericOnly: true,
      blocks: [0, 3, 0, 3, 4],
      delimiters: ["(", ")", " ", "-"],
    });

    $('.dob-input').inputmask('99/99/9999');
  },

  toggleInputEvents: function() {
    var toggleInputWrap = function($element) {
      // Remove active/error style for other input-wrap
      var $currentInputWrap = $element.closest('.input-wrap');
      var $parent = $currentInputWrap.parent();
      // console.log($parent[0].classList);
      $parent.find('.input-wrap').each(function() {
        if ($(this).is($currentInputWrap)) {
          $(this).addClass('active');
          $(this).removeClass('error');
        } else {
          // $(this).removeClass('active');
          $(this).removeClass('error');
        }
      });
    };

    $('.before-input').on('click', function(e) {
      var $inputWrap = $(this).closest('.input-wrap');
      var $beforeInput = $(this);
      var $afterInput = $inputWrap.find('.after-input');
      $beforeInput.addClass('hide');
      $afterInput.removeClass('hide');
      $afterInput.find('input').focus();
    });

    $('.after-input input').on('focus', function(e) {
      e.stopPropagation();
      var $afterInput = $(this).closest('.after-input');
      $afterInput.find('.input-hint').removeClass('hide');

      $(this).removeAttr('placeholder');

      toggleInputWrap($afterInput);
    });

    $('.after-input input').on('blur', function(e) {
      e.stopPropagation();

      toggleInputWrap($(this));
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
  }
});

jquery.fn.extend({
  enableNextBtn: function() {
    var $button = this.find('button.disabled');
    $button.removeClass('disabled');

    this.find('.input-wrap').removeClass('error');
  },

  disableNextBtn: function() {
    var $button = this.find('button');
    $button.addClass('disabled');
  },

  showValidationStatus: function() {
    if (this.validate()) {
      this.enableNextBtn();
    } else {
      this.disableNextBtn();
    }
  }
});
