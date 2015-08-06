var express = require('express');
var router = express.Router();
var loggedIn = require('./rest-authentication');
var request = require('request');

module.exports = function(passport) {

  router.get('/:url', loggedIn, function(req, res) {
    var embedlyKey = process.env.EMBEDLY_KEY || '';

    request('http://api.embed.ly/1/oembed?key=' + embedlyKey + '&url=' + req.params.url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body)
      } else {
        res.status(404).send();
      }
    });
  });

  return router;

};
