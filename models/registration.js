const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/env');
const pagination = require('mongoose-paginate');
const Schema = mongoose.Schema;

const RegistrationSchema = mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
   
    college_name: {
        type: String,
        required: true
    },
    event_name: {
        type: String,
        required: true
    },
    workshops: {
        type: Array
    },
    events: {
        type: Array
    },
    paper_presentations: {
        type: Array
    },
    from_date: {
        type: String
    },
    to_date: {
        type: String
    },
    status: {
        type: String
    },
    message: {
        type: String
    },
    file_name: {
        type: String
    }
});
RegistrationSchema.plugin(pagination);
const Registration = module.exports = mongoose.model('Registration', RegistrationSchema);


module.exports.getAllRegistration = (page, callback) => {
    Registration.paginate({}, { limit: config.pagination.perPage, page: page }, callback);
}
module.exports.getCurrentUserRegistrations = (id, callback) => {

}
module.exports.addRegistration = function(newRegistration, callback) {
    newRegistration.save(callback)
}