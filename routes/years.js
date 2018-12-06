const express = require('express');
const router = express.Router();
const config = require('../config/env');
const Year = require('../models/year');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/create', (req, res, next) => {
    let newYear = new Year({
        name: req.body.name
    });
    newYear.save((err, doc) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to Create Year' + err });
        } else {
            res.json({ success: true, msg: 'Year Created' });
        }
    });
});
router.get('/', function(req, res, next) {
    let page = req.query.page ? req.query.page : 1;

    Year.getAllYears(page, (err, years) => {
        if (!err) {
            res.send(years);
        } else {
            res.json({ error: true, msg: err });
        }
    });
});
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    var year = {
        name: req.body.name
    };
    Year.findByIdAndUpdate(req.params.id, { $set: year }, { new: true }, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: "Year Updated" });
        } else {
            res.json({ error: true, msg: 'Failed To Update Year' + err });
        }
    });
})
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    Year.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: 'Year Deleted' });
        } else {
            res.json({ error: true, msg: 'Failed To Delete Year' });
        }
    });
});
module.exports = router;