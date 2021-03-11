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

  var $form = $('.form:visible');

  $form.handleInput();
  $form.handleEnterKey();
  $form.handleSubmit();
});
