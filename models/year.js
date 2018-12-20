const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/env');
const pagination = require('mongoose-paginate');

const YearSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
YearSchema.plugin(pagination);
const Year = module.exports = mongoose.model('Year', YearSchema);

module.exports.getAllYears = (page, callback) => {
    Year.paginate({}, { limit: config.pagination.perPage, page: page }, callback);
}