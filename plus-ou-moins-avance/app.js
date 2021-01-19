/*
EXCERCICE : 
TP: Jeu du plus ou du moins basic

POST /party => lance une nouvelle partie, dans le body, on doit pouvoir passer un min et un max
PUT /party/current => envoi dans le body d'un chiffre, réception d'un + ou d'un - ou d'un Félicitation, le chiffre était XXX
GET /party/current => affiche l'historique de la partie en cours
GET /scores => affiche les 10 meilleurs scores
    
*/

const Game = require("./Game.js");
const Routing = require("./Routing.js");
const Request = require("./Request.js");

const http = require("http");
const APP_PORT = 6880;

const server = http.createServer((req, res) => {
  let router = new Routing(req, res);
  let game = new Game();
  let data = "";
  let tempUserRes = null;

  /* GET processing */
  router.get("/scores", function (req, res) {
    game.printScoresBoard(res);
    res.end();
  });

  router.get("/party/current", function (req, res) {
    game.printCurrentSessionScores(res);
    res.end();
  });

  /* Storage of any data received */
  req.on("data", function (chunk) {
    data += chunk;
  });

  /* Treatment of received data */
  req.on("end", () => {
    router.put("/party/current", function (req, res) {
      let p = new Promise(function (resolve, reject) {
        Request.processPutData(data);
      })
        .then((value) => {
          tempUserRes = value;
          game.attempts = game.attempts++;
        })
        .catch((err) => {
          console.error(err);
        });
    });
    router.post("/party", function (req, res) {
      let p = new Promise(function (resolve, reject) {
        Request.processPostData(res, data);
      })
        .then((json) => {
          game.min = json["min"];
          game.max = json["max"];
          game.goodAnswer = json["goodAnswer"];
        })
        .catch((err) => {
          console.error(err);
        });
    });
    if (tempUserRes !== null) {
      game.isGoodAnswer(res, tempUserRes);
    }
    return res.end();
  });
});

server.listen(APP_PORT);
