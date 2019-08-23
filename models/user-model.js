var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
}, {timestamps: true});

let User = mongoose.model('users', UserSchema);

module.exports = User;