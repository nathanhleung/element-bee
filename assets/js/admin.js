/* global io Vue sessionID gamePin */

const socket = io();

const url = window.location.href;
const gamePin = url.substr(url.lastIndexOf('/') + 1);

const vm = new Vue({
  el: '#adminApp',
  data: {
    state: 'LOBBY',
    element: {},
    connections: 0,
    gamePin,
  },
  methods: {
    start() {
      socket.emit('start');
    },
    // Show element name
    show() {
      socket.emit('show');
    },
    // Request element
    // element() is a reserved function in Vue I think
    // so we can't use it
    newElement() {
      socket.emit('newElement');
    },
    end() {
      socket.emit('end');
    },
    delete() {
      socket.emit('delete');
    }
  },
});

socket.on('connection-update', (count) => {
  vm.connections = count;
});

// The start event returns an element
socket.on('start', (element) => {
  this.state = 'GAME';
  vm.element = element;
});

socket.on('show', () => {
  this.state = 'SHOW';
});

socket.on('end', () => {
  this.state = 'LOBBY';
});

socket.on('newElement', (element) => {
  this.state = 'GAME';
  vm.element = element;
});

socket.on('delete', () => {
  vm.state = 'DELETED';
});