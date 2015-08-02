var express = require('express');
var router = express.Router();
var loggedIn = require('./authentication');

// app/routes.js
module.exports = function(passport) {

  router.get('/*', function(req, res) {
    res.render('reactpage.ejs', {
      pagename : 'app' // get the user out of session and pass to template
    });
  });

  return router;

};
