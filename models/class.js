const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/env');
const pagination = require('mongoose-paginate');

const ClassSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    major_id: {
        type: String,
        required: true,
    },
    department_id: {
        type: String,
        required: true
    },
    year_id: {
        type: String,
        required: true
    },
    section_id: {
        type: String,
        required: true
    }
});
ClassSchema.plugin(pagination);
const Class = module.exports = mongoose.model('Class', ClassSchema);

module.exports.getUserClass = function(id, callback) {
    const query = { _id: id }
    Class.findOne(query, callback);
}