const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.post('/', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email!');
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid password!');

    const token = user.generateAuthToken();
    res.send(token);
});

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

module.exports = router;
