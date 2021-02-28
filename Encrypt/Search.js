'use strict';
const fs = require('fs');
const path = require('path');

module.exports.walk = function walk(dirPath, callback) {
    fs.readdir(dirPath, function (err, files) {
        if (!err) {
            files.forEach(function (file) {
                var filePath = path.join(dirPath, file);
                fs.stat(filePath, function (err, stat) {
                    if (!err) {
                        if (stat.isFile()) {
                            callback(filePath, stat);
                        } else if (stat.isDirectory()) {
                            walk(filePath, callback);
                        }
                    }
                })
            })
        }
    });
}