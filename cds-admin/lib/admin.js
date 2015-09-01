/**
 * task.js
 */

var restService = require('cds-rest-services'),
    restUrls = require('cds-rest-services').urls,
    cdsConfig = require('cds-config'),
    header = cdsConfig.restUrl.contentType,
    requireUtil = require("util"),
    util = require('cds-util'),
    log = require('cds-logger').logger("cds-admin");

exports.getVolunteerCategories = function(params, token, callback) {
    log.debug("getVolunteerCategories : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    restService.builbArgs(restUrls.admin.getVolunteerCategories, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.saveVolunteerCategory = function(params, token, callback) {
    log.debug("saveVolunteerCategory : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    restService.builbArgs(restUrls.admin.saveVolunteerCategory, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.updateVolunteerCategory = function(params, token, callback) {
    log.debug("updateVolunteerCategory : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    restService.builbArgs(restUrls.admin.updateVolunteerCategory, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};


