class Request {
  constructor() {}

  static toJSON(data) {
    return JSON.parse(data);
  }

  static processPostData(res, data) {
    data = this.toJSON(data);
    if (typeof data["min"] !== "number" || typeof data["max"] !== "number") {
      return res.writeHead(400, "Merci d'inserer uniquement des nombres.");
    }
    if (data["max"] - data["min"] < 5) {
      return res.writeHead(
        400,
        "Merci d'inserer un nombre max superieur d'au moins 5 unites par rapport au nombre min."
      );
    }
    let jsonResponse = {
      min: data["min"],
      max: data["max"],
      goodAnswer: Math.round(data["max"] / 2) + Math.round(data["min"] / 2),
    };
    res.write(
      `Nombres enregistrés :\n min:${data["min"]}\n max:${data["max"]}`
    );
    return jsonResponse;
  }

  static processPutData(data) {
    return parseInt(data);
  }
}

module.exports = Request;
