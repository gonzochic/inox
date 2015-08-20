var express = require('express');
var router = express.Router();
var loggedIn = require('./rest-authentication');
var User = require('../models/user');

var ObjectId = require('mongoose').Types.ObjectId;


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

      if(followTarget == requesterId) {
        console.log("cant follow myself");
        res.send({});
        return;
      }

      User.findOne({'_id': followTarget}, function (err, target) {
        if (err) {
          res.status(404).send(err);
        }
        var targetWasAllreadyFollowed = target.profile.follower.indexOf(requesterId) > -1;

        if (!targetWasAllreadyFollowed) {
          User.findOne({'_id': requesterId}, function (err, requester) {
            if(err) {
              res.status(404).send(err);
            }
            var  requesterIsAllreadyFollowing = requester.profile.follows.indexOf(followTarget) > -1;
            if(!requesterIsAllreadyFollowing) {
              target.profile.follower.push(requesterId);
              requester.profile.follows.push(new ObjectId(followTarget));

              target.save();
              requester.save();
            }

          });
        }
        res.send({});
      });
  });

  return router;

};
