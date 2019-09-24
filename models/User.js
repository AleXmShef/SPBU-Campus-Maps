const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    study_group: {
        global: {
            type: String,
            required: true
        },
        education_level: {
            type: String,
            required: true
        },
        study_program: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        study_program_link: {
            type: String,
            required: true
        },
        group: {
            type: String,
            required: true
        },
        timetable_link: {
            type: String,
            required: true
        }

    }
});

module.exports = User = mongoose.model('user', UserSchema);