const express = require('express');
const router = express.Router();
const config = require('../config/env');
const Major = require('../models/major');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/create', (req, res, next) => {
    let newMajor = new Major({
        name: req.body.name
    });
    newMajor.save((err, doc) => {
        if (err) {
            res.json({ error: false, msg: 'Failed To Create Major' + err });
        } else {
            res.json({ error: true, msg: 'Major Created' });
        }
    });
});
router.get('/', function(req, res, next) {
    let page = req.query.page ? req.query.page : 1;

    Major.getAllMajors(page, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.json({ error: true, msg: err });
        }
    });
});
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    var major = {
        name: req.body.name
    };
    Major.findByIdAndUpdate(req.params.id, { $set: major }, { new: true }, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: "Major Updated" });
        } else {
            res.json({ error: true, msg: "Failed To Update Major" + err });
        }
    });
})
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    Major.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: 'Deleted Major Successfully' });
        } else {
            res.json({ error: true, msg: 'Failed To Delete Major' });
        }
    });
});

module.exports = router;