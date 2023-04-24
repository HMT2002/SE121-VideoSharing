const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread',
    default: null,
    required: [true, 'Comment required thread'],
  },
  content: { type: String, required: [true, 'Comment required content'] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, required: [true, 'Comment required user'] },
  createDate: { type: Date, required: false, default: Date.now },
  updateDate: { type: Date, required: false, default: Date.now },

  points: { type: Number, required: [true, 'Comment required points'], default: 0 },
});
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
