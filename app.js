"use strict";

const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const mainCtrl = require('./controllers/main');
const socketsCtrl = require('./controllers/sockets');

mongoose.connect(process.env.MONGODB || 'mongodb://localhost/elements');
mongoose.connection.on('error', () => {
  console.log('MongoDB error. Check your MongoDB connection!');
  process.exit(1);
});

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET || 'yoyoyo!!!',
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
}));
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1y',
}));
app.use((req, res, next) => {
  res.locals.basedir = path.join(__dirname, 'views');
  next();
});

app.get('/', mainCtrl.home);
app.get('/game/:gamePin', mainCtrl.game)
app.get('/admin', mainCtrl.admin);
// Public elements API - easier to just require into sockets.js though
app.get('/elements/:n', mainCtrl.element);

io.on('connection', (socket) => {
  socketsCtrl.connection(socket, io);
});

server.listen(app.get('port'), () => {
  console.log(`App listening on port ${app.get('port')}!`);
});