class Party {
  number = null;
  guesses = [];

  static currentParty = null;

  constructor(min, max) {
    this.number = Math.floor(Math.random() * (max - min) + min);
  }

  guess(input) {
    const nb = +input;
    if (isNaN(nb)) {
      throw new Error("Input is not a number");
    }
    this.guesses.push(input);
    if (nb > this.number) return "-";
    if (nb < this.number) return "+";
    return "=";
  }
}

module.exports = Party;
