const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/env');
const pagination = require('mongoose-paginate');

const MajorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
MajorSchema.plugin(pagination);
const Major = module.exports = mongoose.model('Major', MajorSchema);

module.exports.getAllMajors = (page, callback) => {
    Major.paginate({}, { limit: config.pagination.perPage, page: page }, callback);
}