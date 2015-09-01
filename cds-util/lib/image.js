/** 
 * Common Service
 * Module dependencies.
 */
var fs = require("fs");

//send file path using req.files.upload.path
exports.read = function(path, callback) {
    fs.readFile(path, function(err, data) {
        callback(err, data);
    });
};

//send file path using req.files.upload.path
exports.save = function(source, target, callback) {
    fs.readFile(source, function(err, data) {
        if (err) {
            callback(err, null);
        } else {
            fs.writeFile(target, data, function(err) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, target);
                }
            });
        }
    });
};
