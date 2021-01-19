/*
EXCERCICE : 
TP: Jeu du plus ou du moins basic

POST /party => lance une nouvelle partie, dans le body, on doit pouvoir passer un min et un max
PUT /party/current => envoi dans le body d'un chiffre, réception d'un + ou d'un - ou d'un Félicitation, le chiffre était XXX
GET /party/current => affiche l'historique de la partie en cours
GET /scores => affiche les 10 meilleurs scores
    
*/

const Game = require("./Game.js");

const http = require("http");
const APP_PORT = 6880;

let scoresBoard = [];
let currentScores = [];
let min = 0;
let max = 0;
let goodAnswer = 0;
let attempts = 0;

const processPostData = (res, data) => {
  data = JSON.parse(data);
  min = data["min"];
  max = data["max"];
  if (typeof min !== "number" || typeof max !== "number") {
    res.writeHead(400, "Merci d'inserer uniquement des nombres.");
    return;
  }
  if (max - min < 5) {
    res.writeHead(
      400,
      "Merci d'inserer un nombre max superieur d'au moins 5 unites par rapport au nombre min."
    );
    return;
  }
  goodAnswer = Math.round(max / 2) + Math.round(min / 2);
  currentScores = [];
  attempts = 0;
  res.write(`Nombres enregistrés :\n min:${min}\n max:${max}`);
};

const processPutData = (data) => {
  attempts++;
  return parseInt(data);
};

const isGoodAnswer = (answer) => {
  if (answer == goodAnswer) {
    scoresBoard += attempts;
    currentScores = [];
    return `Félicitation, vous avez gagné ! \nLa bonne réponse était ${answer}.`;
  } else if (answer < goodAnswer) {
    currentScores += answer;
    return "Plus !";
  } else {
    currentScores += answer;
    return "Moins !";
  }
};

const printCurrentSessionScores = (res, currentScores) => {
  for (let i = 0; i < currentScores.length; i++) {
    res.write(`Tentative ${i + 1} : ${currentScores[i]} \n`);
  }
};

const printScoresBoard = (res, scoresBoard) => {
  const sortedScores = [].sort.call(scoresBoard, function (a, b) {
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
};

const server = http.createServer((req, res) => {
  let data = "";
  let tempUserRes = null;

  /* GET processing */
  if (req.method === "GET") {
    if (req.url === "/party/current") {
      printCurrentSessionScores(res, currentScores);
    }
    if (req.url === "/scores") {
      printScoresBoard(res, scoresBoard);
    }
    res.end();
  }

  /* Storage of any data received */
  req.on("data", (chunk) => {
    data += chunk;
  });

  /* Treatment of received data */
  req.on("end", () => {
    if (req.method === "PUT" && req.url === "/party/current") {
      tempUserRes = processPutData(data);
    }
    if (req.method === "POST" && req.url === "/party") {
      processPostData(res, data);
    }
    if (tempUserRes !== null) {
      res.write(isGoodAnswer(tempUserRes));
    }
    return res.end();
  });
});

server.listen(APP_PORT);
