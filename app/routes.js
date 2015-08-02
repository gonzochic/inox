// app/routes.js
var loginRoute = require('./routes/login');
var entriesRoute = require('./routes/entries');
var feedsRoute = require('./routes/feeds');
var pagesRoute = require('./routes/pages');
var profileRoute = require('./routes/profiles');

module.exports = function(app, passport) {

  app.use('/', loginRoute(passport));
  app.use('/entries', entriesRoute(passport));
  app.use('/feeds', feedsRoute(passport));
  app.use('/pages', pagesRoute(passport));
  app.use('/profiles',profileRoute(passport));

};
