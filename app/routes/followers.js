var express = require('express');
var router = express.Router();
var loggedIn = require('./rest-authentication');
var User = require('../models/user');

module.exports = function(passport) {

  router.get('/:userid', loggedIn, function(req, res) {
      User.find({'_id': req.params.id}, {'follower': 1}, function (err, follower) {
        if (err) {
          res.status(404).send(err);
        }
        res.send(follower);
      });
  });

  router.post('/:userid',loggedIn, function(req, res) {
      var followTarget = req.params.userid;
      var requesterId = req.user._id;
      User.findOne({'_id': followTarget}, function (err, target) {
        if (err) {
          res.status(404).send(err);
        }
        var targetWasAllreadyFollowed = target.follower.indexOf(requesterId) > -1;

        if (!targetWasAllreadyFollowed) {
          User.findOne({'_id': requesterId}, function (err, requester) {
            if(err) {
              res.status(404).send(err);
            }
            var  requesterIsAllreadyFollowing = requester.follows.indexOf(followTarget) > -1;
            if(requesterIsAllreadyFollowing) {
              user.follower.push(requesterId);
              requester.follows.push(req.params._id);

              user.save();
              request.save();
            }

          });
        }
        res.send({});
      });
  });

  return router;

};
