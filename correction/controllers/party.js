const Controller = require("../lib/controller");

module.exports = class PartyController extends (
  Controller
) {
  static routes = [
    { method: "GET", url: "/party", action: "index" }
    { method: "POST", url: "/party", action: "create" },
    { method: "PUT", url: "/party/current", action: "guess" },
    { method: "GET", url: "/party/current", action: "history" },
  ];

  index() {
    return "Create a party using POST";
  }

  create() {
    Party.currentParty = new Party(
      this.req.body.min || 0,
      this.req.body.max || 100
    );
    this.res.statusCode = 204;
  }

  guess() {
    if (!Party.currentParty) {
      throw new Error("No Party");
    }
    const result = Party.currentParty.guess(body);
    this.res.end();
    if (result === "=") {
      return `Félicitation, le chiffre était${Party.currentParty.number} `;
    } else {
      return result;
    }
  }

  history() {
    if (!Party.currentParty) {
      throw new Error("No Party");
    }
    return this.res.write(Party.currentParty.guesses.join(", "));
  }
};
