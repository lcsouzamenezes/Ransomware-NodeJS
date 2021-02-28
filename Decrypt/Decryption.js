'use strict';
const crypto = require('crypto');
const fs = require('fs');

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

module.exports.fileDecryption = function (file) {
    var text = decrypt(JSON.parse(fs.readFileSync(file)));
    fs.writeFileSync(file, text);
    fs.renameSync(file, file.split('.').slice(0, -1).join('.'));
}

var decrypt = (hash) => {
    var decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
    var decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
    return decrpyted.toString();
};