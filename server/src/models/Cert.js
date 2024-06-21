const mongoose = require('mongoose');

// Define the cert schema
const certSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    publicKey: { type: String, required: true },
    signature: { type: String, required: true },
    certType: { type: String, required: true },
    certOwner: { type: String, required: true }
});

const Cert = mongoose.model('Cert', certSchema);
module.exports = Cert;
