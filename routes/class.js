const express = require('express');
const router = express.Router();
const config = require('../config/env');
const Class = require('../models/class');
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/:id', (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    User.getUserClass(req.params.id, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: doc });
        } else {
            res.json({ error: true, msg: "FAILED TO GET CLASS" + err });
        }
    });
});
router.post('/', (req, res, next) => {
    let newClass = new Class({
        user_id: req.body.user_id,
        major_id: req.body.major_id,
        department_id: req.body.department_id,
        year_id: req.body.year_id,
        section_id: req.body.section_id
    })
    Class.createClass(newClass, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'FALIED TO CREATE CLASS' + err });
        } else {
            res.json({ success: true, msg: 'CLASS registered' });
        }
    });
});
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    var department = {
        name: req.body.name
    };
    Class.findByIdAndUpdate(req.params.id, { $set: department }, { new: true }, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: "cLASS UPDATED" });
        } else {
            res.json({ error: true, msg: "FAILED TO UPDATE CLASS" + err });
        }
    });
})
router.delete('/', (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Class.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err) {
            res.json({ success: false, msg: 'FALIED TO DELETE CLASS' + err });
        } else {
            res.json({ success: true, msg: 'CLASS DELETED' });
        }
    });
});
module.exports = router;