const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  username: { type: String, require: true },
  comment: { type: String, require: true },
  timestamp: { type: Date, default: Date.now },
  videoID: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
});

mongoose.model('Comment', CommentSchema);
