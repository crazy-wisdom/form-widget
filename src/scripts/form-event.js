let FormEvent = {};
(function (context) {

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

})(FormEvent);
