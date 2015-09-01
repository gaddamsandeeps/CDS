/** 
 * Citizen Service
 * Module dependencies.
 */

var restService = require('cds-rest-services'),
    restUrls = restService.urls,
    cdsConfig = require('cds-config'),
    header = cdsConfig.restUrl.contentType,
    requireUtil = require("util"),
    log = require('cds-logger').logger("cadre-service");

exports.delete = function(params, token, callback) {
    log.debug("delete : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path
    var url = {
        path: requireUtil.format(restUrls.cadre.delete.path, params.userId),
        method: restUrls.cadre.delete.method
    };

    restService.builbArgs(url, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.partyPositions = function(orgId, callback) {
    log.debug("partyPositions");
    var headers = header;
    headers[cdsConfig.orgId] = orgId;

    restService.builbArgs(restUrls.cadre.partyPositions, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.bloodGroups = function(orgId, callback) {
    log.debug("bloodGroups");
    var headers = header;
    headers[cdsConfig.orgId] = orgId;

    restService.builbArgs(restUrls.cadre.bloodGroups, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.isPartyMemberShipIdExist = function(params, token, callback) {
    log.debug("isPartyMemberShipIdExist");
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path
    var url = {
        path: requireUtil.format(restUrls.cadre.isPartyMemberShipIdExist.path, params.partyMemberShipId),
        method: restUrls.cadre.isPartyMemberShipIdExist.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getCadreWorksheet = function(params, token, callback) {
    log.debug("getCadreWorksheet : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path
    var url = {
        path: requireUtil.format(restUrls.cadre.cadreWorksheet.path, params.userId),
        method: restUrls.cadre.cadreWorksheet.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getCadreLeads = function(token, callback) {
    log.debug("getCadreLeads ");
    var headers = header;
    headers[cdsConfig.token] = token;

    restService.builbArgs(restUrls.cadre.leadersincadre, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getCadresList = function(params, token, callback) {
    log.debug("getCadresList ");
    var headers = header;
    headers[cdsConfig.token] = token;

    var url = {
        path: requireUtil.format(restUrls.cadre.cadres.path, params.q),
        method: restUrls.cadre.cadres.method
    };
    
    restService.builbArgs(url, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};
