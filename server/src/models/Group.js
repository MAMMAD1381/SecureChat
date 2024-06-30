const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    members: [{ type: String, required: true }],
    owner: { type: String, required: true },
    polls:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Poll'}],
    cert: { type: mongoose.Schema.Types.ObjectId, ref: 'Cert', required: true }
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
