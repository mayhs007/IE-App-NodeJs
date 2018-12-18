const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/env');
const User = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;



//Create
router.post('/register', (req, res, next) => {
    let newUser = new User({
        admission_number: req.body.admission_number,
        roll_number: req.body.roll_number,
        name: req.body.name,
        email_id: req.body.email_id,
        gender: req.body.gender,
        type: req.body.type,
        password: req.body.password

    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' + err });
        } else {
            res.json({ success: true, msg: 'User registered' });
        }
    });
});


//Read
router.get('/', function(req, res, next) {
    let page = req.query.page ? req.query.page : 1;

    User.getAllUsers(page, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.json({ error: true, msg: err });
        }
    });
});
/////////////////////////////////////////////////////////
router.get('/admins', function(req, res, next) {
    User.find({ type: 'admin' }, function(err, docs) {
        if (!err) {
            console.log('hello');
            res.send(docs);
        } else {
            console.log('Error in Getting Registration  :' + JSON.stringify(err, undefined, 2))
        }

    });
});

router.post('/authenticate', (req, res, next) => {
    const email_id = req.body.email_id;
    const password = req.body.password;
    User.getUserByEmailId(email_id, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, email: false, msg: 'USER NOT FOUND  ' + email_id });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: user }, config.application.secret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    email: true,
                    password: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        roll_number: user.roll_number,
                        email_id: user.email_id,
                        type: user.type
                    },
                    msg: 'YOUR LOGGED IN'
                })
            } else {
                return res.json({ success: false, password: false, msg: 'WRONG PASSWORD' });
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ profile: req.user, success: true });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in user Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});


module.exports = router;