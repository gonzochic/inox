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

  router.get('/details', loggedIn, function(req, res) {
      User.findOne({'_id': req.user._id}, {'profile.follows': 1}, function (err, user) {
        if (err) {
          res.status(404).send(err);
        }

        User.find({
          '_id' : { '$in' : user.profile.follows }
        }, {'profile': 1}).sort({'local.username': 'desc'}).exec(function(err, myFollows) {
          console.log(myFollows);
          res.send(myFollows);
        });

      });
  });

  router.get('/:userid', loggedIn, function(req, res) {
      User.findOne({'_id': req.params.userid}, {'profile.follows': 1}, function (err, user) {
        if (err) {
          res.status(404).send(err);
        }
        res.send(user.profile.follows);
      });
  });

  router.get('/:userid/details', loggedIn, function(req, res) {
      User.findOne({'_id': req.params.userid}, {'profile.follows': 1}, function (err, user) {
        if (err) {
          res.status(404).send(err);
        }

        User.find({
          '_id' : { '$in' : user.profile.follows }
        }, {'profile.avatar': 1, 'local.username': 1}).sort({'local.username': 'asc'}).exec(function(err, myFollows) {
          res.send(myFollows);
        });

      });
  });


  return router;

};
