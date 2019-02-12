const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/env');
const pagination = require('mongoose-paginate');

const GenderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
GenderSchema.plugin(pagination);
const Gender = module.exports = mongoose.model('Gender', GenderSchema);

module.exports.getAllGenders = (page, callback) => {
    Gender.paginate({}, { limit: config.pagination.perPage, page: page }, callback);
}