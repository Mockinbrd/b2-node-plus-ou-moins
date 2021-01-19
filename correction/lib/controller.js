module.exports = class Controller {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  callRoute(route) {
    const handler = this[route.action];
    handler();

    if (this.res.statusCode) return (this.res.statusCode = 200);
    this.res.write(handler());
    this.res.end();
  }

  static middleware(req, res, next) {
    for (const route of this.routes) {
      if (req.method === route.method && req.url === route.url) {
        const ctrl = new this(req, res);
        ctrl.callRoute(route);
        return;
      }
    }

    next();
  }
};
