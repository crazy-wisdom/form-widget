import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./styles/form.scss";
import "./styles/demo.scss";

import "./scripts/form-validation";
import "./scripts/form-wrapper";


console.log("hello world!");


$(function() {
  $.formatInputValue();
  $.toggleInputEvents();

  $('.form').on('blur input', 'input', function() {
    var $form = $(this).closest(".form");
    $form.clearError();

    var $inputList = $form.find('input:visible');
    var result = true;
    $.each($inputList, function(index, $input) {
      var $input = $($input);
      if ($.trim($input.val()) === '') {
        console.log($input)
        result = false;
        return false;
      }
    });

    if (result) {
      $form.enableNextBtn();
    }
  });

  $('.form').on('click', '.submit-btn', function () {
    var $form = $(this).closest(".form");
    if ($form.validate()) {
      console.log('yes')
    } else {
      console.log('no');
    }
  });
});
