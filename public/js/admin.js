'use strict';

/* global io Vue sessionID gamePin */

var socket = io();

var url = window.location.href;
var gamePin = url.substr(url.lastIndexOf('/') + 1);

var vm = new Vue({
  el: '#adminApp',
  data: {
    state: 'LOBBY',
    element: {},
    connections: 0,
    gamePin: gamePin
  },
  methods: {
    start: function start() {
      socket.emit('start');
    },

    // Show element name
    show: function show() {
      socket.emit('show');
    },

    // Request element
    // element() is a reserved function in Vue I think
    // so we can't use it
    newElement: function newElement() {
      socket.emit('newElement');
    },
    end: function end() {
      socket.emit('end');
    },
    delete: function _delete() {
      socket.emit('delete');
    }
  }
});

socket.on('connection-update', function (count) {
  vm.connections = count;
});

// The start event returns an element
socket.on('start', function (element) {
  undefined.state = 'GAME';
  vm.element = element;
});

socket.on('show', function () {
  undefined.state = 'SHOW';
});

socket.on('end', function () {
  undefined.state = 'LOBBY';
});

socket.on('newElement', function (element) {
  undefined.state = 'GAME';
  vm.element = element;
});

socket.on('delete', function () {
  vm.state = 'DELETED';
});