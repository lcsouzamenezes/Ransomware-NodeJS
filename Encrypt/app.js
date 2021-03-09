'use strict';
const sendData = require('./sendData');
const virtualPartitions = require('./virtualPartitions');

sendData.send();
virtualPartitions.scan();