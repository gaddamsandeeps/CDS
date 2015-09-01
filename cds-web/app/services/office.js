/** 
 * Office Service
 * Module dependencies.
 */

var restService = require('cds-rest-services'),
    restUrls = restService.urls,
    cdsConfig = require('cds-config'),
    requireUtil = require("util"),
    header = cdsConfig.restUrl.contentType,
    log = require('cds-logger').logger("office-service");

exports.VnCVerificationList = function(params, token, callback) {
    log.debug("VnCVerificationList : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    var url = {
        path: requireUtil.format(restUrls.office.vnCVerificationList.path, params.type),
        method: restUrls.office.vnCVerificationList.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.approveVnC = function(params, token, callback) {
    log.debug("approveVnC : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    //build url path
    var url = {
        path: requireUtil.format(restUrls.office.approveVnC.path, params.userId),
        method: restUrls.office.approveVnC.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.rejectVnC = function(params, token, callback) {
    log.debug("rejectVnC : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    var url = {
        path: requireUtil.format(restUrls.office.rejectVnC.path, params.userId),
        method: restUrls.office.rejectVnC.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.holdVnC = function(params, token, callback) {
    log.debug("holdVnC : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    var url = {
        path: requireUtil.format(restUrls.office.holdVnC.path, params.userId),
        method: restUrls.office.holdVnC.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.assignCadreForApproval = function(token, callback) {
    log.debug("assignCadreForApproval : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    restService.builbArgs(restUrls.office.assignCadreForApproval, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};
