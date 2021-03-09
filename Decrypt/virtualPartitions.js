'use strict';
const os = require('os');
const fs = require('fs');
const searchData = require('./searchData');
const decryptData = require('./decryptData');

const virtualPartitions = ["C:\\Users\\" + os.userInfo().username,
                           "K:\\", "L:\\", "M:\\", "N:\\", "O:\\",
                           "D:\\", "A:\\", "B:\\", "F:\\", "Q:\\",
                           "G:\\", "H:\\", "R:\\", "S:\\", "J:\\",
                           "U:\\", "W:\\", "V:\\", "X:\\", "T:\\",
                           "Y:\\", "Z:\\", "E:\\", "P:\\", "I:\\"];

module.exports.scan = function () {

    for (var partition of virtualPartitions) {

        if (fs.existsSync(partition)) {

            searchData.walk(partition, function (filePath) {

                if (filePath.endsWith("encrypt")) {

                    decryptData.fileDecryption(filePath);
                }
            });
        }
    }
}