const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    study_group: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model('user', UserSchema);