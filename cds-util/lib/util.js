/**
 * common utils.js
 */

var dateFormat = require("date-format-lite"),
    format = 'MMMM DD, YYYY',
    deFormat = 'DD/MM/YYYY';

var imageService = require("./image");

exports.formatDate = function(dFormat, val) {
    try {
        if (dFormat) {
            val = val.date(dFormat);
        } else {
            val = val.date(format);
        }
        return val;
    } catch (e) {
        return e;
    }
};

exports.deFormatDate = function(dFormat, val) {
    try {
        if (dFormat) {
            val = new Date(val).format(dFormat);
        } else {
            val = new Date(val).format(deFormat);
        }
        return val;
    } catch (e) {
        return e;
    }
};

exports.handleErrors = function(obj, callback) {
    var res = {};
    res.data = obj;
    if ((obj.httpStatusCode >= 200 && obj.httpStatusCode <= 300)) {
        res.status = 'success';
        callback(res);
    } else {
        res.status = 'failure';
        callback(res);
    }
};

exports = module.exports.image = imageService;