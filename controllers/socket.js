const pt = require('periodic-table');

exports.disconnect = (data, socket, io) => {
  io.emit('connection-update', io.engine.clientsCount);
};

exports.newAdmin = (gamePin, socket, io) => {
  
  
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

exports.adminDisconnect = (gamePin, socket, io) => {
  
};

module.exports = exports;