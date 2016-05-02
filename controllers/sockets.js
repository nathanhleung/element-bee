const socketCtrl = require('../controllers/socket');

exports.connection = (socket, io) => {
  io.emit('connection-update', io.engine.clientsCount);
  
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
};

module.exports = exports;