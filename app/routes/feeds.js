var express = require('express');
var router = express.Router();
var loggedIn = require('./rest-authentication');
var Feed = require('../models/feed');

module.exports = function(passport) {

  router.get('/', loggedIn, function(req, res) {
      Feed.find({}, function (err, feeds) {
        if (err) {
          res.status(404).send(err);
        }
        res.send(feeds);
      });
  });

  router.get('/:id', loggedIn, function(req, res) {
      Feed.findOne({'_id': req.params.id}, function (err, feed) {
        if (err) {
          res.status(404).send(err);
        }
        res.send(feed);
      });
  });

  return router;

};
