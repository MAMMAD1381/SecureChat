const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const groupInfoSchema = new mongoose.Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    groupName: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'super'], default: 'user' },
    password: { type: String, required: true },
    salt: { type: String },
    publicKey: { type: String },
    groupsOwned: [groupInfoSchema],  // Embedded subdocument schema
    groupsJoined: [groupInfoSchema]  // Embedded subdocument schema
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.salt = salt;
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
