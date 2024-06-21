const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    members: [{ type: String, required: true }], // Array of memberSchema
    owner: { type: String, required: true },
    cert: { type: mongoose.Schema.Types.ObjectId, ref: 'Cert', required: true } // Reference to Cert model
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
