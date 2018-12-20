const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/env');
const pagination = require('mongoose-paginate');

const Schema = mongoose.Schema;

const ClassSchema = mongoose.Schema({
    major_id: {
        type: Schema.Types.ObjectId,
        ref: 'Major',
        required: true,
    },
    department_id: {
         type: Schema.Types.ObjectId, 
         ref: 'Department',
         required: true
    },
    year_id: {
        type: Schema.Types.ObjectId, 
         ref: 'Year',
         required: true
    },
    section_id: {
        type: Schema.Types.ObjectId, 
         ref: 'Section',
         required: true
    }
});
ClassSchema.plugin(pagination);
const Class = module.exports = mongoose.model('Class', ClassSchema);
module.exports.getAllClasses = (page, callback) => {
    Class.paginate({}, { limit: config.pagination.perPage, page: page }, callback);
}
