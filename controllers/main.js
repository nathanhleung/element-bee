const pt = require('periodic-table');
const crypto = require('crypto');
const Game = require('../models/Game');

exports.home = (req, res) => {
  res.render('home', {
    title: 'Home',
  });
};

exports.play = (req, res) => {
  if (!req.params.gamePin) {
    req.flash('errors', {
      msg: 'Invalid game PIN',
    });
    res.redirect('/');
  }
  res.render('game', {
    title: 'Game',
  });
}

exports.newGame = (req, res) => {
  const game = new Game({
    creator: req.sessionID,
  });
  game.save((err, newGame) => {
    if (err) {
      return res.send(err);
    }
    res.redirect(`/game/${newGame.id}`);
  })
};

exports.admin = (req, res) => {
  Game.findById(req.params.gamePin, (err, game) => {
    if (err) {
      return res.send(err);
    }
    if (game && req.sessionID !== game.creator) {
      return res.sendStatus(403);
    }
    res.render('admin', {
      title: 'Admin',
      sessionID: req.sessionID
    });
  });
};

exports.element = (req, res) => {
  const num = parseInt(req.params.n, 10);
  const el = pt.all().filter((el) => {
    if (el.atomicNumber === num) {
      return true;
    }
    return false;
  })[0];
  res.json(el);
}

module.exports = exports;