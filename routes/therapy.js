const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Therapy');
});

module.exports = router;