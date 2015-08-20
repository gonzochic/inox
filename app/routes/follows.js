var express = require('express');
var router = express.Router();
var loggedIn = require('./rest-authentication');
var User = require('../models/user');

module.exports = function(passport) {

  router.get('/', loggedIn, function(req, res) {
      User.findOne({'_id': req.user._id}, {'profile.follows': 1}, function (err, user) {
        if (err) {
          res.status(404).send(err);
        }
        res.send(user.profile.follows);
      });
  });

  router.get('/:userid', loggedIn, function(req, res) {
      User.findOne({'_id': req.params.id}, {'profile.follows': 1}, function (err, user) {
        if (err) {
          res.status(404).send(err);
        }
        res.send(user.profile.follows);
      });
  });

  return router;

};
