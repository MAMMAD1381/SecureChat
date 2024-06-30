const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vote = new Schema({
  votedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const pollOptionSchema = new Schema({
  optionText: { type: String, required: true },
  votes: [vote],
  votesCount: { type: Number, default: 0 },
});

const pollSchema = new Schema({
  question: { type: String, required: true },
  options: [pollOptionSchema],
  createdBy: { type: String, required: true },
  group: { type: String, required: true },
  cert: { type: mongoose.Schema.Types.ObjectId, ref: 'Cert', required: true },
  // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
