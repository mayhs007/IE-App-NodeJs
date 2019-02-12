const express = require('express');
const router = express.Router();
const config = require('../config/env');
const Roles = require('../models/role');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/create', (req, res, next) => {
    let newRoles = new Roles({
        name: req.body.name
    });
    newRoles.save((err, doc) => {
        if (err) {
            res.json({ error: false, msg: 'Failed To Create Roles' + err });
        } else {
            res.json({ error: true, msg: 'Roles Created' });
        }
    });
});
router.get('/', function(req, res, next) {
    let page = req.query.page ? req.query.page : 1;

    Roles.getAllRoless(page, (err, docs) => {
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

    var role = {
        name: req.body.name
    };
    Roles.findByIdAndUpdate(req.params.id, { $set: role }, { new: true }, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: "Roles Updated" });
        } else {
            res.json({ error: true, msg: "Failed To Update Roles" + err });
        }
    });
});
router.post('/delete/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    Roles.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: 'Deleted Roles Successfully' });
        } else {
            res.json({ error: true, msg: 'Failed To Delete Roles' });
        }
    });
});

module.exports = router;