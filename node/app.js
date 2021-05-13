const express = require('express');
const app = express();
const mongoose = require('./mongoose');
const bodyParser = require('body-parser');

const{ Team, User } = require('./models');
// const{ team } = require('./models/team.model');

// Load in middleware
app.use(bodyParser.json());


// User CRUD

app.get('/users', (req,res) => {
    User.find({}).then((users) => {
        res.send(users)
    });
})

app.post('/users', (req,res) => {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email

    let newUser = new User({
        firstName,
        lastName,
        email
    })

    newUser.save().then((userDoc) => {
        res.send(userDoc)
    })
})

app.patch('/users/:id', (req,res) => {
    User.findOneAndUpdate({_id: req.params.id}, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })
})

app.delete('/users/:id', (req,res) => {
    User.findOneAndRemove({
        _id: req.params.id
    }).then((removedUserDoc) => {
        res.send(removedUserDoc)
    })
})

// Team CRUD (no put bc I am lazy and don't want to type out each value)
app.get('/teams', (req, res) => {
    Team.find({}).then((teams) => {
        res.send(teams)
    });
})

app.get('/teams/:id', (req,res) => {
    Team.findOne({_id: req.params.id}).then((team) => {
        res.send(team)
    })
})

app.patch('/teams/:id', (req,res) => {
    User.findOneAndUpdate({_id: req.params.id}, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })
})

app.delete('/teams/:id', (req,res) => {
    User.findOneAndRemove({
        _id: req.params.id
    }).then((removedUserDoc) => {
        res.send(removedUserDoc)
    })
})



app.listen(3000, () => {
    console.log("Server is listenting on port 3000")
})