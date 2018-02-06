"use strict";
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt   = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({
    email               : { type: String, min: 5, max: 255, unique: true, require: true },
    password            : { type: String, max: 255, require: true },
    nickname            : { type: String, max: 255 },
    avatar              : { type: Object },
    gender              : { type: Number, enum: [0, 1] },
    phone               : { type: String },
    birthday            : { type: Date },
    role                : { type: Number, enum: [0, 1], default: 0 },
    verifyCode          : { type: String, max: 32 },
    isVerified          : { type: Boolean, default: false },
    isBlocked           : { type: Boolean, default: false },
    deletedAt           : { type: Date },
}, { timestamps: true });

UserSchema.plugin(mongoosePaginate);

// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
