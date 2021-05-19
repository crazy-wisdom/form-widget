import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./styles/form.scss";
import "./styles/demo.scss";

import './scripts/form-validation';
import './scripts/form-wrapper';
import Observable from './scripts/observable';


console.log("hello world!");


$(function() {
  $.formatInputValue();
  $.toggleInputEvents();

  var $form = $('.form:visible');

  $form.handleInput();
  $form.find('.submit-btn').handleEnterKey();
  $form.handleSubmit();

  // Observable demo
  const observable = Observable.create(observer => {
    observer.next('foo');
  });
  observable.subscribe({
    next: x => console.log('hello world ' + x)
  });

  const node = document.querySelector('.observable-input');
  const input$ = Observable.fromEvent(node, 'input').map(event => event.target.value);
  input$.subscribe({
    next: value => {
      document.querySelector('p.observable-text').innerHTML = value;
    }
  });
});


