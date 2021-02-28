'use strict';
const express = require('express');
const path = require('path');
const Network = require("./Network");

var app = express();

Network.receive()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (_req, res) {
    res.render('index', {data: Network.datahtml});
});

app.listen(3000);