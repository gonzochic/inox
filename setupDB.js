var mongoose = require('mongoose');
var configDB = require('./config/database.js');
var Feed = require('./app/models/feed');
var Entry = require('./app/models/entry');
var faker = require('faker');

mongoose.connect(configDB.url);

Feed.find({}).remove().exec();
Entry.find({}).remove().exec();

for (var i= 0; i < 5; i++) {
  var feed = new Feed({
    authorName: faker.internet.userName(),
    title: faker.company.companyName(),
    description: faker.lorem.sentences(),
    tags: ["foo", "bar"]
  });


  feed.save(function(err, savedFeed) {

    for (var j= 0; j < 30; j++) {
      var entry = new Entry({
        authorName: faker.internet.userName(),
        content: faker.lorem.paragraphs(),
        feed: savedFeed._id,
        feedName: savedFeed.title,
        issued: faker.date.past(),
        tags: ["foo", "bar"],
        comments: ["first comment", "second comment"]
      });
      entry.save();
    }
  });
}
