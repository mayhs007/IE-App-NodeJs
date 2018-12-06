const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/env');
const pagination = require('mongoose-paginate');

const SectionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
SectionSchema.plugin(pagination);
const Section = module.exports = mongoose.model('Section', SectionSchema);

module.exports.getAllSections = (page, callback) => {
    Section.paginate({}, { limit: config.pagination.perPage, page: page }, callback);
}