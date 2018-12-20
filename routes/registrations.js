const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/env');
const Registration = require('../models/registration');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/register', (req, res, next) => {
    let newRegistration = new Registration({
        user_id: req.body.user_id,
        college_name: req.body.college_name,
        event_name: req.body.event_name,
        workshops: req.body.workshops,
        events: req.body.events,
        paper_presentations: req.body.paper_presentations,
        from_date: req.body.from_date,
        to_date: req.body.to_date,
        status: req.body.status,
        message: req.body.message,
        file_name: req.body.file_name

    });
    Registration.addRegistration(newRegistration, (err, registration) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to Register' + err });
        } else {
            res.json({ success: true, msg: 'Registered' });
        }
    });
});

router.get('/', function(req, res, next) {
    let page = req.query.page ? req.query.page : 1;
    Registration.getAllRegistration(page, (err, registrations) => {
        if (!err) {
            res.send(registrations);
        } else {
            res.json({ error: true, msg: err });
        }
    });
});
router.get('/user/:id', function(req, res, next) {
    Registration.find({ user_id: req.params.id }, function(err, docs) {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Getting Registration  :' + JSON.stringify(err, undefined, 2))
        }

    });
});
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Registration.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.json({ success: true, msg: 'Deleted Your Registration' }) } else { res.json({ success: false, msg: "Failed To Delete" }) }
    });
});
module.exports = router;