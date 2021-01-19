class Request {
  constructor() {}

  static toJSON(data) {
    return JSON.parse(data);
  }

  static processPostData(res, data) {
    try {
      data = this.toJSON(data);
    } catch (error) {
      return Promise.reject("JSON parsing error");
    }
    if (typeof data["min"] !== "number" || typeof data["max"] !== "number") {
      res.writeHead(400, "Merci d'inserer uniquement des nombres.");
      return Promise.reject("Non-Numeric");
    }
    if (data["max"] - data["min"] < 5) {
      res.writeHead(
        400,
        "Merci d'inserer un nombre max superieur d'au moins 5 unites par rapport au nombre min."
      );
      return Promise.reject("Numbers too close");
    }
    let jsonResponse = {
      min: data["min"],
      max: data["max"],
      goodAnswer: Math.round(data["max"] / 2) + Math.round(data["min"] / 2),
    };
    res.write(
      `Nombres enregistrés :\n min:${data["min"]}\n max:${data["max"]}`
    );
    return Promise.resolve(jsonResponse);
  }

  static processPutData(data) {
    return parseInt(data);
  }
}

module.exports = Request;
