const mongoose = require('mongoose');

communitiesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    }
});
const Communities = mongoose.model('Communities', communitiesSchema);

exports.Communities = Communities;