class Request {
  constructor() {}

  static toJSON(data) {
    return JSON.parse(data);
  }

  static processPostData(res, data, resolve, reject) {
    try {
      data = this.toJSON(data);
    } catch (error) {
      return reject("JSON parsing error");
    }
    if (typeof data["min"] !== "number" || typeof data["max"] !== "number") {
      res.writeHead(400, "Merci d'inserer uniquement des nombres.");
      return reject("Non-Numeric");
    }
    if (data["max"] - data["min"] < 5) {
      res.writeHead(
        400,
        "Merci d'inserer un nombre max superieur d'au moins 5 unites par rapport au nombre min."
      );
      return reject("Numbers too close");
    }
    let jsonResponse = {
      min: data["min"],
      max: data["max"],
      goodAnswer: Math.round(data["max"] / 2) + Math.round(data["min"] / 2),
    };
    res.write(
      `Nombres enregistrés :\n min:${data["min"]}\n max:${data["max"]}`
    );
    return resolve(jsonResponse);
  }

  static processPutData(data, resolve, reject) {
    try {
      let res = parseInt(data);
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  }
}

module.exports = Request;
