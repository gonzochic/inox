var express = require('express');
var router = express.Router();
var loggedIn = require('./rest-authentication');
var Entry = require('../models/entry')
var ObjectId = require('mongoose').Types.ObjectId;

// app/routes.js
module.exports = function(passport) {

  router.get('/', loggedIn,function(req, res) {
      Entry.find({}).sort({"_id": 'desc'}).limit(15).exec(function (err, entries) {
        if (err) {
          res.status(404).send(err);
        }
        res.send(entries);

      });
  });

  router.get('/more/:lastentry', loggedIn,function(req, res) {
      Entry.find({ "_id": { "$lt": req.params.lastentry }}).sort({"_id": 'desc'}).limit(15).exec(function (err, entries) {
        if (err) {
          res.status(404).send(err);
        }

        res.send(entries);

      });
    });

  router.get('/:feed', loggedIn,function(req, res) {
      Entry.find({'feed' : new ObjectId(req.params.feed)}).sort({"_id": 'desc'}).limit(15).exec(function (err, entries) {
        if (err) {
          res.status(404).send(err);
        }
        res.send(entries);

      });
  });

  router.get('/:feed/more/:lastentry', loggedIn,function(req, res) {
      Entry.find({$and :[
        {'feed' : new ObjectId(req.params.feed)},
        {'_id' : { "$lt": req.params.lastentry }}
      ]}).sort({"_id": 'desc'}).limit(15).exec(function (err, entries) {
        if (err) {
          res.status(404).send(err);
        }
        res.send(entries);

      });
  });


  router.post('/:id', loggedIn,function(req, res) {
    console.log(req.body);
    var entry = new Entry({
      author: new ObjectId(req.body.author),
      authorName: req.body.authorName,
      content: req.body.content,
      embed: req.body.embed,
      feed: new ObjectId(req.params.id),
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

  router.put('/:id/likes', loggedIn, function(req, res) {
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
