'use strict';

/**
 * Selects [num] random elements from array [arr]
 * @param arr - the array to select elements from
 * @param num - the number of elements to select
 */
exports.selectRandomFromArray = function (arr, num) {
  const selected = [];
  for (let i = 0; i < num; i++) {
    const index = Math.floor(Math.random() * arr.length);
    selected.push(arr[index]);
    // After getting a value, remove it from the array
    arr.splice(index, 1);
  }
  return selected;
}

/**
 * Shuffles an array
 * @param array - the array to shuffle
 * Courtesy of https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
exports.shuffleArray = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}