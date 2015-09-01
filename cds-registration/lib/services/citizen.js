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

exports.savePersonalInf = function(params, token, callback) {
    log.debug("savePersonalInf : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    restService.builbArgs(restUrls.citizen.savePersonalInf, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.editPersonalInf = function(params, token, callback) {
    log.debug("editPersonalInf : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path
    var url = {
        path: requireUtil.format(restUrls.citizen.editPersonalInf.path, params.userId),
        method: restUrls.citizen.editPersonalInf.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getPersonalInf = function(params, token, callback) {
    log.debug("getPersonalInf : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path
    var url = {
        path: requireUtil.format(restUrls.citizen.getPersonalInf.path, params.userId),
        method: restUrls.citizen.getPersonalInf.method
    };

    restService.builbArgs(url, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.saveWorkInf = function(params, token, callback) {
    log.debug("saveWorkInf : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path
    var url = {
        path: requireUtil.format(restUrls.citizen.saveWorkInf.path, params.userId),
        method: restUrls.citizen.saveWorkInf.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.editWorkInf = function(params, token, callback) {
    log.debug("editWorkInf : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path
    var url = {
        path: requireUtil.format(restUrls.citizen.editWorkInf.path, params.userId),
        method: restUrls.citizen.editWorkInf.method
    };

    //remove userId from params
    delete params.userId;

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getWorkInf = function(params, token, callback) {
    log.debug("getWorkInf : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path
    var url = {
        path: requireUtil.format(restUrls.citizen.getWorkInf.path, params.userId),
        method: restUrls.citizen.getWorkInf.method
    };

    restService.builbArgs(url, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.saveVoterInf = function(params, token, callback) {
    log.debug("saveVoterInf : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path    
    var url = {
        path: requireUtil.format(restUrls.citizen.saveVoterInf.path, params.userId),
        method: restUrls.citizen.saveVoterInf.method
    };

    //remove userId from params
    delete params.userId;

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.editVoterInf = function(params, token, callback) {
    log.debug("editVoterInf : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path    
    var url = {
        path: requireUtil.format(restUrls.citizen.editVoterInf.path, params.userId),
        method: restUrls.citizen.editVoterInf.method
    };

    //remove userid from params
    delete params.userId;

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getVoterInf = function(params, token, callback) {
    log.debug("getVoterInf : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path    
    var url = {
        path: requireUtil.format(restUrls.citizen.getVoterInf.path, params.userId),
        method: restUrls.citizen.getVoterInf.method
    };

    restService.builbArgs(url, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.saveResidentialAddress = function(params, token, callback) {
    log.debug("saveResidentialAddress : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path    
    var url = {
        path: requireUtil.format(restUrls.citizen.saveResidentialAddress.path, params.userId),
        method: restUrls.citizen.saveResidentialAddress.method
    };

    //remove userid from params
    delete params.userId;

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.editResidentialAddress = function(params, token, callback) {
    log.debug("editResidentialAddress : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path    
    var url = {
        path: requireUtil.format(restUrls.citizen.editResidentialAddress.path, params.userId),
        method: restUrls.citizen.editResidentialAddress.method
    };

    delete params.userId;

    restService.builbArgs(url, params.data, headers, function(args) {
        restService.makecall(args, callback);
    });
};
exports.getResidentialAddress = function(params, token, callback) {
    log.debug("getResidentialAddress : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path    
    var url = {
        path: requireUtil.format(restUrls.citizen.getResidentialAddress.path, params.userId),
        method: restUrls.citizen.getResidentialAddress.method
    };

    restService.builbArgs(url, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.saveFamily = function(params, token, callback) {
    log.debug("saveFamily : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path    
    var url = {
        path: requireUtil.format(restUrls.citizen.saveFamily.path, params.userId),
        method: restUrls.citizen.saveFamily.method
    };

    //remove userid from params
    delete params.userId;

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.editFamily = function(params, token, callback) {
    log.debug("editFamily : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;



    //build url path    
    var url = {
        path: requireUtil.format(restUrls.citizen.editFamily.path, params.userId),
        method: restUrls.citizen.editFamily.method
    };

    //remove userid from params
    delete params.userId;

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getFamily = function(params, token, callback) {
    log.debug("getFamily : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path    
    var url = {
        path: requireUtil.format(restUrls.citizen.getFamily.path, params.userId),
        method: restUrls.citizen.getFamily.method
    };

    restService.builbArgs(url, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.quickRegistration = function(params, orgId, callback) {
    log.debug("quickRegistration : " + (JSON.stringify(params)));
    var headers = header;
    if (orgId)
        headers[cdsConfig.orgId] = orgId;

    restService.builbArgs(restUrls.citizen.quickRegistration, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};
