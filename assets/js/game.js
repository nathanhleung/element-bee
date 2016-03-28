/* global io Vue */

const socket = io();

const vm = new Vue({
  el: '#elementApp',
  data: {
    state: 'LOBBY',
    message: 'Starting soon.',
    element: {},  
  },
});

socket.on('start', (element) => {
  vm.state = 'GAME';
  vm.element = element;
});

socket.on('newElement', (element) => {
  vm.element = element;
  vm.state = 'GAME';
});

socket.on('show', () => {
  vm.state = 'SHOW';
});

socket.on('end', () => {
  vm.state = 'LOBBY';
  vm.message = 'Next match starting soon'
  vm.element = {};
});

socket.on('delete', () => {
  vm.state = 'DELETED';
  vm.message = 'The game has expired. Please return to the lobby.';
});