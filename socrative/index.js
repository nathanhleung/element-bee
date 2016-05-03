'use strict';

const fs = require('fs');
const json2csv = require('json2csv');
const mkdirp = require('mkdirp');
const path = require('path');
const pt = require('periodic-table');
const util = require('./util');

// Shuffle the elements so when we generate questions
// it doesn't come in a predictable order
const elements = util.shuffleArray(pt.all());

// Array of quiz questions
let quiz = [];

// How many questions to generate, up to a max of elements.length
const numQuestions = elements.length;

// Loop through the shuffled elements array and
// create desired number of questions
for (let i = 0; i < numQuestions; i++) {
  const symbol = elements[i].symbol;
  // Generates array of elements and quantifies how similar the element name
  // is to the current element symbol above
  const matchCounts = elements.map((el) => {
    let matches = 0;
    for (let j = 0; j < symbol.length; j++) {
      if (el.name.toLowerCase().indexOf(symbol[j].toLowerCase()) !== -1) {
        matches++;
      }
    }
    // If they share the same first letter that's an extra point
    if (symbol[0].toLowerCase() === el.name[0].toLowerCase()) {
      matches++;
    }
    return {
      name: el.name,
      symbol: el.symbol,
      matches
    };
  });
  
  // Creates an array of elements sorted by the number of matches they have
  // 3 matches, then 2 matches, then 1 match, then none
  const byNumOfMatches = matchCounts.filter((el) => {
    if (el.symbol === symbol) {
      return false;
    }
    return true;
  }).reduce((prev, curr) => {
    // Create an array where position 0 is zero matches, 1 is one match, etc.
    if (typeof prev[curr.matches] === 'undefined') {
      prev[curr.matches] = [];
    }
    prev[curr.matches].push(curr);
    return prev;
  }, []).reverse();
  
  // Array for our alternate answer choices
  let answerChoices = [];
  // There should be 4 alternate answer choices and 1 correct choice
  // At this stage we only need to get our alternate choices
  let remaining = 4;
  
  // Iterate over array of matches starting with elements with most matches
  for (let j = 0; j < byNumOfMatches.length; j++) {
    // If there are any empty spots (for example no elements with 2 matches)
    // then fill the spot with an empty array
    if (typeof byNumOfMatches[j] === 'undefined') {
      byNumOfMatches[j] = [];
    }
    // If the array can't fill the remaining, concat it with the answerChoices array
    // and update the amount remaining needed
    if (byNumOfMatches[j].length < remaining) {
      answerChoices = answerChoices.concat(byNumOfMatches[j]);
      remaining = remaining - byNumOfMatches[j].length;
    } else {
      answerChoices = answerChoices.concat(util.selectRandomFromArray(byNumOfMatches[j], remaining));
      break;
    }
  }
  
  answerChoices = util.shuffleArray(answerChoices).map((el) => {
    return el.name;
  });
  
  quiz.push({
    question: symbol,
    answerChoices,
    answer: elements[i].name
  });
}

quiz = util.shuffleArray(quiz);

const formattedQuiz = quiz.map((el) => {
  const answerChoices = util.shuffleArray(el.answerChoices.concat(el.answer));
  const answerPos = answerChoices.indexOf(el.answer);
  const answerLetters = ['A', 'B', 'C', 'D', 'E'];
  return {
    type: 'Multiple choice',
    question: el.question,
    A: answerChoices[0],
    B: answerChoices[1],
    C: answerChoices[2],
    D: answerChoices[3],
    E: answerChoices[4],
    correct: answerLetters[answerPos]
  };
});

const dataDir = path.join(__dirname, 'data');
const jsonpath = path.join(dataDir, 'element-data.json');
const csvpath = path.join(dataDir, 'element-data.csv');
// If ./data doesn't exist, create it
mkdirp(dataDir, (err) => {
  if (err) {
    return console.log(err);
  }
  fs.writeFile(jsonpath, JSON.stringify(formattedQuiz), (err) => {
    if (err) {
      return console.log(err);
    } 
    console.log('JSON file successfully written.')
  });
  // Just grab the first element to get the keys
  const fields = Object.keys(formattedQuiz[0]);
  json2csv({ fields, data: formattedQuiz }, (err, csv) => {
    if (err) {
      return console.log(err);
    }
    fs.writeFile(csvpath, csv, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log('CSV file successfully written.')
    })
  })
});

