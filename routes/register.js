const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.post('/', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['username', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    try {
        await user.save();
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send( _.pick(user, ['_id','username', 'email']));
    }
    catch(ex) {
        console.log(ex.message);
        res.send('no');
    }
});

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

module.exports = router;
