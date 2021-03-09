'use strict';
const crypto = require('crypto');
const fs = require('fs');
const keyData = require('./keyData');

module.exports.fileDecryption = function (file) {

    var text = decrypt(JSON.parse(fs.readFileSync(file)));

    fs.writeFileSync(file, text);

    fs.renameSync(file, file.split('.').slice(0, -1).join('.'));
}

var decrypt = (hash) => {

    var decipher = crypto.createDecipheriv('aes-256-ctr', keyData.key, Buffer.from(hash.iv, 'hex'));

    var decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
};