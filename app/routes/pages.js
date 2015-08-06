var express = require('express');
var router = express.Router();
var loggedIn = require('./authentication');

// app/routes.js
module.exports = function(passport) {

  router.get('/*', function(req, res) {

  	var pageToLoad = process.env.IN_PRODUCTION == true ? 'prodpage.ejs' : 'reactpage.ejs'; 
  	console.log(pageToLoad);

    res.render(pageToLoad, {
      pagename : 'app' // get the user out of session and pass to template
    });
  });

  return router;

};
