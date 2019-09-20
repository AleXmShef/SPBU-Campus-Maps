const mongoose = require('mongoose');

const CampusSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true
   },
    asset_url: {
       type: String,
        required, true
    },
    adjacency_list: [{
      type: Number,
      required: true
    }],
    icon_url: {
       type: String,
        required: true
    }
});

module.exports = Campus = mongoose.model('campus_schema', UserSchema);