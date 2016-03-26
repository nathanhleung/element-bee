'use strict';

/* global io Vue */

var socket = io();

var vm = new Vue({
  el: '#elementApp',
  data: {
    state: 'LOBBY',
    message: 'Starting soon.',
    element: {}
  }
});

socket.on('start', function (element) {
  vm.state = 'GAME';
  vm.element = element;
});

socket.on('newElement', function (element) {
  vm.element = element;
  vm.state = 'GAME';
});

socket.on('show', function () {
  vm.state = 'SHOW';
});

socket.on('end', function () {
  vm.state = 'LOBBY';
  vm.message = 'Next match starting soon';
  vm.element = {};
});