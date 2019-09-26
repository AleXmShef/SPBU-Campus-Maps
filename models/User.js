const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    study_group: {
        name: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        }
    }
});

module.exports = User = mongoose.model('user', UserSchema);