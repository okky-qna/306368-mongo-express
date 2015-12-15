var routes = require('../routes/index');
var hello = require('../routes/hello');

module.exports = function connectRoutes(app) {
  app.use('/', routes);
  app.use('/', hello);
};
