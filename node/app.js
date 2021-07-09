const express = require('express');
const app = express();
const mongoose = require('./mongoose');
const bodyParser = require('body-parser');

const{ Team, User, Average } = require('./models');
// const{ team } = require('./models/team.model');

// Load in middleware
app.use(bodyParser.json());

// For CORS policy
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// User CRUD

app.get('/users', (req,res) => {
    User.find({}).then((users) => {
        res.send(users)
    });
})

app.get('/users/:id', (req,res) => {
    User.findOne({_id: req.params.id}).then((user) => {
        res.send(user)
    })
})

app.post('/users', (req,res) => {
    let name = req.body.name
    let email = req.body.email
    let favTeams = req.body.favTeams

    let newUser = new User({
        name,
        favTeams,
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

// Team CRUD (no post bc I am lazy and don't want to type out each value)
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

// Average
app.get('/averages/:section', (req,res) => {
    Average.findOne({section: req.params.section}).then((average) => {
        res.send(average)
    })
})



app.listen(3000, () => {
    console.log("Server is listenting on port 3000")
})