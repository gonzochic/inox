var express = require('express');
var router = express.Router();
var loggedIn = require('./rest-authentication');
var User = require('../models/user');

module.exports = function(passport) {

  router.get('/', loggedIn, function(req, res) {
      User.find({'_id': req.user._id}, {'follows': 1}, function (err, follows) {
        if (err) {
          res.status(404).send(err);
        }
        res.send(follows);
      });
  });

  router.get('/:userid', loggedIn, function(req, res) {
      User.find({'_id': req.params.id}, {'follows': 1}, function (err, follows) {
        if (err) {
          res.status(404).send(err);
        }
        res.send(follows);
      });
  });

  return router;

};
