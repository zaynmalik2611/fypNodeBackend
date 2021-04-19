const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,   
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.jwtPrivateKey);
    return token;
}

const User = mongoose.model('User', userSchema);

exports.User = User;