var mongoose = require('mongoose');

var feedSchema = mongoose.Schema({
  authorID: mongoose.Schema.Types.ObjectId,
  authorName: String,
  title: String,
  description: String,
  tags: []
});

module.exports = mongoose.model('Feed', feedSchema);
