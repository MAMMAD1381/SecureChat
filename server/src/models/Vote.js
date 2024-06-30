const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  votedBy: { type: String, required: true },
  poll: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;