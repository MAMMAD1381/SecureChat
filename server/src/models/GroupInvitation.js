const mongoose = require('mongoose')
const Schema = mongoose.Schema

const groupInvitationSchema = new Schema({
  user: { type: String, required: true },
  groupName: { type: String, required: true },
  owner: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  cert: { type: mongoose.Schema.Types.ObjectId, ref: 'Cert', required: true },
})

module.exports = mongoose.model('GroupInvitation', groupInvitationSchema)
