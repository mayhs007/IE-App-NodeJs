const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/env');
const pagination = require('mongoose-paginate');

const DepartmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
DepartmentSchema.plugin(pagination);
const Department = module.exports = mongoose.model('Department', DepartmentSchema);

module.exports.getAllDepartments = (page, callback) => {
    Department.paginate({}, { limit: config.pagination.perPage, page: page }, callback);
}