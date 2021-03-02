'use strict';
const os = require('os');
const fs = require('fs');
const Search = require('./Search');
const Decryption = require('./Decryption');

var virtualPartitions = ["C:\\Users\\" + os.userInfo().username,
                          "K:\\", "L:\\", "M:\\", "N:\\", "O:\\",
                          "D:\\", "A:\\", "B:\\", "F:\\", "Q:\\",
                          "G:\\", "H:\\", "R:\\", "S:\\", "J:\\",
                          "U:\\", "W:\\", "V:\\", "X:\\", "T:\\",
                          "Y:\\", "Z:\\", "E:\\", "P:\\", "I:\\"];

module.exports.start = function () {

    for (var partition of virtualPartitions) {

        if (fs.existsSync(partition)) {

            Search.walk(partition, function (filePath) {

                if (filePath.endsWith("encrypt")) {

                    Decryption.fileDecryption(filePath);
                }
            });
        }
    }
}