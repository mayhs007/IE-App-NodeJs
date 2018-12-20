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
            res.json({ error: true, msg: "Failed To Get Class" + err });
        }
    });
});
router.get('/', function(req, res, next) {
    let page = req.query.page ? req.query.page : 1;
    Class.find().populate('major_id').populate('department_id').populate('year_id').populate('section_id').exec(function (err, docs) {
        if (!err){
            res.json({error:false , msg:docs});
        }
        else{
            res.json({error:true , msg:err});
        }   
    });
});
router.post('/create', (req, res, next) => {
    let newClass = new Class({
        major_id: req.body.major_id,
        department_id: req.body.department_id,
        year_id: req.body.year_id,
        section_id: req.body.section_id
    })
    newClass.save((err, doc) => {
        if (err) {
            res.json({ error: false, msg: 'Failed to Create Class' + err });
        } else {
            res.json({ error: true, msg: 'Class Created' });
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
            res.json({ error: false, msg: "Class Updated" });
        } else {
            res.json({ error: true, msg: "Failed To Update Class" + err });
        }
    });
})
router.delete('/:id', (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Class.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err) {
            res.json({ success: false, msg: 'Failed To Delete Class' + err });
        } else {
            res.json({ success: true, msg: 'Class Deleted' });
        }
    });
});
module.exports = router;