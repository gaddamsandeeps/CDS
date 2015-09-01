/** 
 * Volunteer Service
 * Module dependencies.
 */

var restService = require('cds-rest-services'),
    restUrls = restService.urls,
    cdsConfig = require('cds-config'),
    header = cdsConfig.restUrl.contentType,
    requireUtil = require("util"),
    log = require('cds-logger').logger("volunteer-service");

exports.delete = function(params, token, callback) {
    log.debug("delete : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path
    var url = {
        path: requireUtil.format(restUrls.volunteer.delete.path, params.userId),
        method: restUrls.volunteer.delete.method
    };

    restService.builbArgs(url, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.isVolunteerIdExist = function(params, token, callback) {
    log.debug("isVolunteerIdExist : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.orgId] = orgId;

    //build url path
    var url = {
        path: requireUtil.format(restUrls.volunteer.isVolunteerIdExist.path, params.volunteerId),
        method: restUrls.volunteer.isVolunteerIdExist.method
    };

    restService.builbArgs(url, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.performanceGrades = function(orgId, callback) {
    log.debug("performanceGrades");
    var headers = header;
    headers[cdsConfig.orgId] = orgId;

    restService.builbArgs(restUrls.volunteer.performanceGrades, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.areasIntrestedToVolunteer = function(orgId, callback) {
    log.debug("areasIntrestedToVolunteer" );
    var headers = header;
    headers[cdsConfig.orgId] = orgId;

    restService.builbArgs(restUrls.volunteer.areasIntrestedToVolunteer, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.volunteerCategory = function(orgId, callback) {
    log.debug("volunteerCategory ");
    var headers = header;
    headers[cdsConfig.orgId] = orgId;

    restService.builbArgs(restUrls.volunteer.category, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.volunteerLeads = function(orgId, callback) {
    log.debug("volunteerLeads : ");
    var headers = header;
    headers[cdsConfig.orgId] = orgId;

    restService.builbArgs(restUrls.volunteer.leads, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.volunteerSheet = function(params, token, callback) {
    log.debug("volunteerSheet : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path
    var url = {
        path: requireUtil.format(restUrls.volunteer.volunteerSheet.path, params.volunteerId),
        method: restUrls.volunteer.volunteerSheet.method
    };

    restService.builbArgs(url, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};
