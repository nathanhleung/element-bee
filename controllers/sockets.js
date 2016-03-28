const socketCtrl = require('../controllers/socket');
const Game = require('../models/Game');
const moment = require('moment');

exports.connection = (socket, io) => {
  io.emit('connection-update', io.engine.clientsCount);
  
  // Clear DB once every hour of everything created an hour ago or before
  setInterval(() => {
    Game.find({
      created: {
        $lte: moment().subtract(1, 'hours')
      }
    })
  }, 1000 * 60 * 60);
  
  socket.on('disconnect', (data) => {
    socketCtrl.disconnect(data, socket, io);
  });
  
  socket.on('start', (data) => {
    socketCtrl.start(data, socket, io);
  });
  
  socket.on('show', (data) => {
    socketCtrl.show(data, socket, io);
  });
  
  socket.on('newElement', (data) => {
    socketCtrl.newElement(data, socket, io);
  });
  
  socket.on('end', (data) => {
    socketCtrl.end(data, socket, io);
  });
  
  socket.on('delete', (data) => {
    socketCtrl.delete(data, socket, io);
  });
};

module.exports = exports;