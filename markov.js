"use strict"

/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};

    for (let idx in this.words) {
      idx = Number(idx);

      if (idx === this.words.length - 1) {
        if (chains[this.words[idx]]) {
          chains[this.words[idx]].push(null);
        } else {
          chains[this.words[idx]] = [null];
        }
      } else if (chains[this.words[idx]]) {
        chains[this.words[idx]].push(this.words[idx + 1]);
      }
      else {
        chains[this.words[idx]] = [this.words[idx + 1]];
      }
    }

    return chains;
  }


  /** return random text from chains */

  getText(numWords = 100) {
    let chainsKeys = Object.keys(this.chains);
    let randWord = chainsKeys[this.random(0, chainsKeys.length)];
    let text = [];
    while (numWords > 0 && randWord != null) {
      text.push(randWord);
      let wordChain = this.chains[randWord]
      randWord = wordChain[this.random(0, wordChain.length)];
      numWords--;
    }
    return text.join(" ");
  }

  /** https://futurestud.io/tutorials/generate-a-random-number-in-range-with-javascript-node-js */
  random(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }

}


module.exports = MarkovMachine;
