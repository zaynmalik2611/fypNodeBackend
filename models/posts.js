const mongoose = require('mongoose');
const { User } = require('./user');
postsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    }
});

const Posts = mongoose.model('Posts', postsSchema);

exports.Posts = Posts;