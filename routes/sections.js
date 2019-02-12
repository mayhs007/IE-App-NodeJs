const express = require('express');
const router = express.Router();
const config = require('../config/env');
const Section = require('../models/section');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/create', (req, res, next) => {
    let newSection = new Section({
        name: req.body.name
    });
    newSection.save((err, doc) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to Create Section' + err });
        } else {
            res.json({ success: true, msg: 'Section Created' });
        }
    });
});
router.get('/', function(req, res, next) {
    let page = req.query.page ? req.query.page : 1;

    Section.getAllSections(page, (err, sections) => {
        if (!err) {
            res.send(sections);
        } else {
            res.json({ error: true, msg: err });
        }
    });
});
router.post('/update/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    var section = {
        name: req.body.name
    };
    Section.findByIdAndUpdate(req.params.id, { $set: section }, { new: true }, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: "Section Updated" });
        } else {
            res.json({ error: true, msg: "Failed To Update Section" + err });
        }
    });
})
router.post('/delete/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    Section.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: 'Section Deleted' });
        } else {
            res.json({ error: true, msg: 'Failed To Delete Section' });
        }
    });
});
module.exports = router;