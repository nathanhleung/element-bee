/* global io Vue sessionID */

const socket = io();

const vm = new Vue({
  el: '#adminApp',
  data: {
    state: 'LOBBY',
    element: {},
    connections: 0,
  },
  methods: {
    start() {
      socket.emit('start');
      this.state = 'GAME';
    },
    // Show element name
    show() {
      socket.emit('show');
      this.state = 'SHOW';
    },
    // Request element
    // element() is a reserved function in Vue I think
    // so we can't use it
    newElement() {
      socket.emit('newElement');
      this.state = 'GAME';
    },
    end() {
      socket.emit('end');
      this.state = 'LOBBY';
      this.element = {};
    }
  },
});

socket.on('connection-update', (count) => {
  vm.connections = count;
});

// The start event returns an element
socket.on('start', (element) => {
  vm.element = element;
});

socket.on('newElement', (element) => {
  vm.element = element;
});