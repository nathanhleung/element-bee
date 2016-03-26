const pt = require('periodic-table');
const crypto = require('crypto');
const Game = require('../models/Game');

exports.home = (req, res) => {
  res.render('home', {
    title: 'Home',
  });
};

exports.game = (req, res) => {
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

exports.admin = (req, res) => {
  const game = new Game({
    creator: req.sessionID
  });
  game.save((err, newGame) => {
    res.render('admin', {
      title: 'Admin',
      sessionID: req.sessionID,
      gamePin: newGame.id
    });
  })
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