class Routing {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  get method() {
    return this.req.method;
  }

  get url() {
    return this.req.url;
  }

  get(url, callback) {
    if (this.method === "GET" && this.url === url) {
      return callback(this.req, this.res);
    }
  }

  post(url, callback) {
    if (this.method === "POST" && this.url === url) {
      return callback(this.req, this.res);
    }
  }

  put(url, callback) {
    if (this.method === "PUT" && this.url === url) {
      return callback(this.req, this.res);
    }
  }
}

module.exports = Routing;
