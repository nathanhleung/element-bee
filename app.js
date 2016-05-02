'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const mainCtrl = require('./controllers/main');
const socketsCtrl = require('./controllers/sockets');

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1y',
}));
app.use((req, res, next) => {
  res.locals.basedir = path.join(__dirname, 'views');
  next();
});

app.get('/', mainCtrl.game);
/* example credentials
process.env.ADMIN_NAME = 'me';
process.env.ADMIN_PASS = 'me123';
*/
app.get('/admin', mainCtrl.admin);

app.get('*', mainCtrl.notFound);

io.on('connection', (socket) => {
  socketsCtrl.connection(socket, io);
});

server.listen(app.get('port'), () => {
  console.log(`App listening on port ${app.get('port')}!`);
});