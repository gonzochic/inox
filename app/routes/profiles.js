var express = require('express');
var router = express.Router();
var loggedIn = require('./rest-authentication');
var User = require('../models/user')

module.exports = function(passport) {

  router.get('/', function(req, res) {
      User.find({}, {'profile' : 1, 'lastLoginTime' : 1}, function (err, users) {
        if (err) {
          res.status(404).send(err);
        }
        res.send(users);
      });
  });

  router.get('/:id', function(req, res) {
      User.findOne({'_id': req.params.id}, {'profile' : 1, 'lastLoginTime' : 1}, function (err, user) {
        if (err) {
          res.status(404).send(err);
        }
        res.send(user);
      });
  });

  return router;

};
