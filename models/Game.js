const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  creator: String, // admin session id
  // we'll use _id for game PIN
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;