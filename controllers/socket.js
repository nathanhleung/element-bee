const pt = require('periodic-table');
const Game = require('../models/Game');

exports.disconnect = (data, socket, io) => {
  io.emit('connection-update', io.engine.clientsCount);
};

exports.start = (data, socket, io) => {
  const num = Math.round(Math.random() * pt.all().length);
  const el = pt.all()[num];
  io.emit('start', el);
};

exports.show = (data, socket, io) => {
  io.emit('show');
};

exports.newElement = (data, socket, io) => {
  const num = Math.round(Math.random() * pt.all().length);
  const el = pt.all()[num];
  io.emit('newElement', el);
};

exports.end = (data, socket, io) => {
  io.emit('end');
};

exports.delete = (gamePin, socket, io) => {
  Game.findById(gamePin).remove((err) => {
    // how to error handle?
  });
  io.emit('delete');
};

module.exports = exports;