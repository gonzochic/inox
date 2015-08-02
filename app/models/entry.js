var mongoose = require('mongoose');

var entrySchema = mongoose.Schema({
  author: mongoose.Schema.Types.ObjectId,
  authorName: String,
  issued: { type: Date, default: Date.now },
  content: String,
  feed: mongoose.Schema.Types.ObjectId,
  feedName: String,
  tags: [],
  comments: [],
  likes: {type: Array, default: []}
});

module.exports = mongoose.model('Entry', entrySchema);
