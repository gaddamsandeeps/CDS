/** 
 * Citizen Service
 * Module dependencies.
 */

var restService = require('cds-rest-services'),
    restUrls = restService.urls,
    requireUtil = require("util"),
    cdsConfig = require('cds-config'),
    header = cdsConfig.restUrl.contentType,
    log = require('cds-logger').logger("citizen-service");

exports.deletePersonalinf = function(params, token, callback) {
    log.debug("deletePersonalinf : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path
    var path = requireUtil.format(restUrls.citizen.deletePersonalinf.path, params.userId);
    var url = {
        path: path,
        method: restUrls.citizen.deletePersonalinf.method
    };

    restService.builbArgs(url, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getVoterInfByText = function(params, orgId, callback) {
    log.debug("getVoterInfByText : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.orgId] = orgId;

    //build url path
    var url = {
        path: requireUtil.format(restUrls.citizen.getVoterInfByText.path, params.q),
        method: restUrls.citizen.getVoterInfByText.method
    };


    restService.builbArgs(url, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.deleteVoterInf = function(params, token, callback) {
    log.debug("deleteVoterInf : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path
    var url = {
        path: requireUtil.format(restUrls.citizen.deleteVoterInf.path, params.userId),
        method: restUrls.citizen.deleteVoterInf.method
    };

    restService.builbArgs(url, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getAddressByPincode = function(params, orgId, callback) {
    log.debug("getAddressByPincode : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.orgId] = orgId;

    //build url path
    var url = {
        path: requireUtil.format(restUrls.citizen.addressByPincode.path, params.q),
        method: restUrls.citizen.addressByPincode.method
    };

    restService.builbArgs(url, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.deleteFamily = function(params, token, callback) {
    log.debug("deleteFamily : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path
    var url = {
        path: requireUtil.format(restUrls.citizen.deleteFamily.path, params.userId),
        method: restUrls.citizen.deleteFamily.method
    };

    restService.builbArgs(url, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getQualifications = function(orgId, callback) {
    log.debug("getQualifications");
    var headers = header;
    headers[cdsConfig.orgId] = orgId;

    restService.builbArgs(restUrls.citizen.qualifications, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getOccupations = function(orgId, callback) {
    log.debug("getOccupations");
    var headers = header;
    headers[cdsConfig.orgId] = orgId;

    restService.builbArgs(restUrls.citizen.occupations, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

//delete citizen
exports.delete = function(params, token, callback) {
    log.debug("delete : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path
    var path = requireUtil.format(restUrls.citizen.delete.path, params.userId);
    var url = {
        path: path,
        method: restUrls.citizen.delete.method
    };

    restService.builbArgs(url, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

//view citizen
exports.viewCitizen = function(params, token, callback) {
    log.debug("viewCitizen : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path
    var url = {
        path: requireUtil.format(restUrls.citizen.viewCitizen.path, params.userId),
        method: restUrls.citizen.viewCitizen.method
    };

    restService.builbArgs(url, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.careerAspirations = function(orgId, callback) {
    log.debug("careerAspirations");
    var headers = header;
    headers[cdsConfig.orgId] = orgId;

    restService.builbArgs(restUrls.citizen.careerAspirations, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.skillGaps = function(orgId, callback) {
    log.debug("skillGaps");
    var headers = header;
    headers[cdsConfig.orgId] = orgId;

    restService.builbArgs(restUrls.citizen.skillGaps, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};
