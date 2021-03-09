'use strict';
const crypto = require('crypto');
const fs = require('fs');
const keyData = require('./keyData');

module.exports.fileEncryption = function (file) {

    var hash = encrypt(fs.readFileSync(file));

    fs.writeFileSync(file, JSON.stringify(hash));

    fs.renameSync(file, file + '.encrypt');
}

var encrypt = (text) => {

    const iv = crypto.randomBytes(16);

    var cipher = crypto.createCipheriv('aes-256-ctr', keyData.key, iv);

    var encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};