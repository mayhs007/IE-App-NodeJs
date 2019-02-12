const express = require('express');
const router = express.Router();
const config = require('../config/env');
const Department = require('../models/department');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/create', (req, res, next) => {
    let newDepartment = new Department({
        name: req.body.name
    });
    newDepartment.save((err, doc) => {
        if (err) {
            res.json({ error: false, msg: 'Failed to Create Department' + err });
        } else {
            res.json({ error: true, msg: 'Department Created' });
        }
    });
});
router.get('/', function(req, res, next) {
    let page = req.query.page ? req.query.page : 1;

    Department.getAllDepartments(page, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.json({ error: true, msg: err });
        }
    });
});
router.post('/update/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    var department = {
        name: req.body.name
    };
    Department.findByIdAndUpdate(req.params.id, { $set: department }, { new: true }, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: "Department Updated" });
        } else {
            res.json({ error: true, msg: "Failed To Update Department" + err });
        }
    });
})
router.post('/delete/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    Department.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: 'Deleted Department' });
        } else {
            res.json({ error: true, msg: "Failed to Delete Department" });
        }
    });
});

module.exports = router;