/*
EXCERCICE : 
TP: Jeu du plus ou du moins basic

POST /party => lance une nouvelle partie, dans le body, on doit pouvoir passer un min et un max
PUT /party/current => envoi dans le body d'un chiffre, réception d'un + ou d'un - ou d'un Félicitation, le chiffre était XXX
GET /party/current => affiche l'historique de la partie en cours
GET /scores => affiche les 10 meilleurs scores
    
*/

const http = require("http");
const Party = require("./models/party.js");
const partyController = require("./controllers/party");
const PartyController = require("./controllers/party");
const { parse } = require("path");

let currentParty = null;

function parseBody(req, res, next) {
  if (["GET", "HEAD", "DELETE", "OPTION"].includes(req.method)) {
    return next(req, res);
  }

  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    try {
      data = JSON.parse(data);
    } catch {
      res.statusCode = 400;
      return res.end("JSON Body is invalid");
    }
    req.body = data;
    next(req, res);
  });
}

function handleRequest(req, res) {
  const middleWares = [
    parseBody,
    errorMiddleware,
    PartyController.middleware,
    notFoundMiddleware,
  ];
  // TODO : apply middleware one after the other

  parseBody(req, res, (req, res) => errorMiddleware(req, res, handleRouting));
}

function notFoundMiddleware(req, res, body = null) {
  // Handle Routing

  res.statusCode = 404;
  res.end();
}

function errorMiddleware(req, res, callback) {
  try {
    callback(req, res);
  } catch (error) {
    res.statusCode = 500;
    res.end(err.message);
  }
}

const server = http.createServer(handleRequest);
server.listen(6880);
