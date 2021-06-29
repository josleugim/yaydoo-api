'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    hashed_pwd: {
        iv: { type: String },
        encryptedPwd: { type: String }
    },
    role: { type: String, required: true },
    isActive: { type: Boolean, default: true }
});

UserSchema.virtual('toObject', { getters: true, virtuals: true });

module.exports = mongoose.model('User', UserSchema);