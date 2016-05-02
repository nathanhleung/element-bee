'use strict';

const pt = require('periodic-table');

// So we don't have any repeats until we go all the way through
let discardPile = [];

function getElement() {
  const num = Math.round(Math.random() * pt.all().length);
  const el = pt.all()[num];
  if (discardPile.length === pt.all().length) {
    discardPile = [];
  }
  
  // There were a few instances where there were missing elements
  // Not sure why, but this is just a hedge against it
  if (typeof el === 'undefined') {
    return getElement();
  }
  if (discardPile.indexOf(el.symbol) !== -1) {
    return getElement();
  }
  
  discardPile.push(el.symbol);
  return el;
}

exports.disconnect = (data, socket, io) => {
  io.emit('connection-update', io.engine.clientsCount);
};

exports.start = (data, socket, io) => {
  io.emit('start', getElement());
};

exports.show = (data, socket, io) => {
  io.emit('show');
};

exports.newElement = (data, socket, io) => {
  io.emit('newElement', getElement());
};

exports.end = (data, socket, io) => {
  io.emit('end');
};

module.exports = exports;