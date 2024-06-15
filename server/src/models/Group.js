const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Reference to User model
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User model
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
