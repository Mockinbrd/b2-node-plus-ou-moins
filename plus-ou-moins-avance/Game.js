class Game {
  constructor(min = 0, max = 0, goodAnswer = 0) {
    this.min = min;
    this.max = max;
    this.goodAnswer = goodAnswer;
    this.attempts = 0;
    this.scoresBoard = [];
    this.currentScores = [];
  }

  set min(value) {
    this.min = value;
  }

  get min() {
    return this.min;
  }

  set max(value) {
    this.max = value;
  }

  get max() {
    return this.max;
  }

  get scoresBoard() {
    return this.scoresBoard;
  }

  set scoresBoard(value) {
    this.scoresBoard += value;
  }

  get currentScores() {
    return this.currentScores;
  }

  set currentScores(value) {
    this.currentScores += value;
  }

  get goodAnswer() {
    return this.goodAnswer;
  }

  set goodAnswer(value) {
    this.goodAnswer = value;
  }

  get attempts() {
    return this.attempts;
  }

  set attempts(value) {
    this.attempts = value;
  }

  resetTemps() {
    this.attempts = 0;
    this.currentScores = [];
  }

  printScoresBoard(res) {
    const sortedScores = this.scoresBoard.sort(function (a, b) {
      return b - a;
    });
    const slicedSortedScores = sortedScores.slice(0, 9);
    for (let i = 0; i < slicedSortedScores.length; i++) {
      res.write(
        `TOP ${slicedSortedScores.length - i} : ${
          slicedSortedScores[i]
        } tentatives \n`
      );
    }
  }

  printCurrentSessionScores(res) {
    for (let i = 0; i < this.currentScores.length; i++) {
      res.write(`Tentative ${i + 1} : ${this.currentScores[i]} \n`);
    }
  }

  isGoodAnswer(res, answer) {
    if (answer == this.goodAnswer) {
      this.scoresBoard += this.attempts;
      this.currentScores = [];
      return res.write(
        `Félicitation, vous avez gagné ! \nLa bonne réponse était ${answer}.`
      );
    } else if (answer < this.goodAnswer) {
      this.currentScores += answer;
      return res.write("Plus !");
    } else {
      this.currentScores += answer;
      return res.write("Moins !");
    }
  }
}

module.exports = Game;
