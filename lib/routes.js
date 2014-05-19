'use strict';

var index = require('./controllers'),
    htcontent = require('./controllers/htcontent'),
    names = require('./controllers/names');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.route('/api/names')
    .get(names.find)
    .post(names.create)
    .delete(names.removeAll);

  app.route('/api/names/random')
    .get(names.findRandom)
    .put(names.updateRandom);

  app.route('/api/names/:nameId')
    .get(names.findOne)
    .put(names.update)
    .delete(names.remove);

  app.param('nameId', names.name);

  app.route('/api/htcontent')
    .get(htcontent.find);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( index.index);
};