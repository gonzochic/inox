var express = require('express');
var router = express.Router();
var loggedIn = require('./rest-authentication');
var Entry = require('../models/entry')
var ObjectId = require('mongoose').Types.ObjectId;

// app/routes.js
module.exports = function(passport) {

  router.get('/', function(req, res) {
      Entry.find({}).sort({issued: 'desc'}).exec(function (err, entries) {
        if (err) {
          res.status(404).send(err);
        }
        res.send(entries);

      });
  });

  router.get('/:id', function(req, res) {
      Entry.find({'feed' : new ObjectId(req.params.id)}).sort({issued: 'desc'}).exec(function (err, entries) {
        if (err) {
          res.status(404).send(err);
        }
        res.send(entries);

      });
  });

  router.post('/:id', function(req, res) {
    console.log(req.body);
    var entry = new Entry({
      author: new ObjectId(req.body.author),
      authorName: req.body.authorName,
      content: req.body.content,
      feed: req.params.id,
      feedName: req.body.feedName,
      tags: [],
      comments: []
    });

    entry.save(function(err) {
      if (err) {
        res.status(404).send({});
      }
        res.status(201).send({});
    })
  });

  router.put('/:id/likes',loggedIn, function(req, res) {
      Entry.findOne({'_id' : new ObjectId(req.params.id)}, function (err, entry) {
        if (err) {
          res.status(404).send(err);
        }
        var entryAlreadyLiked = entry.likes.indexOf(req.user._id) > -1;

        if (!entryAlreadyLiked) {
          entry.likes.push(req.user._id);
        }

        entry.save();

        var response = {
          likes:entry.likes.length,
          likedByUser: true
        }

        res.send(response);

      });
  });

  return router;

};
