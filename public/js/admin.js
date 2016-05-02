'use strict';

/* global io Vue sessionID */

var socket = io();

var vm = new Vue({
  el: '#adminApp',
  data: {
    state: 'LOBBY',
    element: {},
    connections: 0
  },
  methods: {
    start: function start() {
      socket.emit('start');
      this.state = 'GAME';
    },

    // Show element name
    show: function show() {
      socket.emit('show');
      this.state = 'SHOW';
    },

    // Request element
    // element() is a reserved function in Vue I think
    // so we can't use it
    newElement: function newElement() {
      socket.emit('newElement');
      this.state = 'GAME';
    },
    end: function end() {
      socket.emit('end');
      this.state = 'LOBBY';
      this.element = {};
    }
  }
});

socket.on('connection-update', function (count) {
  vm.connections = count;
});

// The start event returns an element
socket.on('start', function (element) {
  vm.element = element;
});

socket.on('newElement', function (element) {
  vm.element = element;
});