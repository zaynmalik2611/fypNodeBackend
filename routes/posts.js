const express = require('express');
const router = express.Router();
const {Posts} = require('../models/posts');

router.post('/', async (req, res) => {
    
    const post = new Posts({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    });

    try {
        const result = await post.save();
        console.log(result);
        res.send('yes');
    }
    catch(ex) {
        console.log(ex.message);
        res.send('no');
    }
});


router.get('/', async (req, res) => {
    const posts = await Posts
    .find()
    .populate('author', 'username -_id')
    .select('title author content');
    res.send(posts);
});


module.exports = router;