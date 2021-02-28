'use strict';
const crypto = require('crypto');
const fs = require('fs');

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);

module.exports.fileEncryption = function (file) {
    var hash = encrypt(fs.readFileSync(file));
    fs.writeFileSync(file, JSON.stringify(hash));
    fs.renameSync(file, file + '.encrypt');
}

var encrypt = (text) => {
    var cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    var encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};