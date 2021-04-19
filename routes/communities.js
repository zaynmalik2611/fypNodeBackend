const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {Communities} = require('../models/communities');


router.get('/', async (req, res) => {
    const communities = await Communities.find();
    res.send(communities);
});

router.get('/:name', async (req, res) => {
    const community = await Communities.find({name : req.params.name});
    res.send(community);
})

router.post('/', auth, async (req, res) => {
    const community = new Communities({
        name: req.body.name
    });
    try {
        const result = await community.save();
        console.log(result);
        res.send('yes');
    }
    catch(ex) {
        console.log(ex.message);
        res.send('no');
    }
});

router.put('/:id', async (req, res) => {
    const community = await Communities.findById(req.params.id);
    if(!community)
        return res.status(404).send('The community with the id does not exist.');
    
    try {
        const result = await community.save();
        console.log(result);
        res.send('Successfuly updated');
    }
    catch(ex) {
        console.log(ex.message);
        res.send('Not updated!');
    }
    
});

router.delete('/:id', async (req, res) => {
    const community = await Communities.findByIdAndDelete(req.params.id);
    if(!community)
        return res.status(404).send('The community with the id does not exist.');
    res.send(community);
});

module.exports = router;
