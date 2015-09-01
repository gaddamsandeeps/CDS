/** 
 * User Service
 * Module dependencies.
 */

var restService = require('cds-rest-services'),
    restUrls = require('cds-rest-services').urls,
    cdsConfig = require('cds-config'),
    header = cdsConfig.restUrl.contentType,
    requireUtil = require("util"),
    log = require('cds-logger').logger("user-service");

exports.authenticate = function(params, callback) {
    log.debug("authenticate");
    restService.builbArgs(restUrls.user.authenticate, params, header, function(args) {
        restService.makecall(args, callback);
    });
};

exports.myProfile = function(params, token, callback) {
    log.debug("myProfile : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    //build url path
    var path = requireUtil.format(restUrls.user.myProfile.path, params.userId);
    var url = {
        path: path,
        method: restUrls.user.myProfile.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.updateProfile = function(params, token, callback) {
    log.debug("updateProfile : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    //build url path
    var path = requireUtil.format(restUrls.user.updateProfile.path, params.userId);
    var url = {
        path: path,
        method: restUrls.user.updateProfile.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.viewUser = function(params, token, callback) {
    log.debug("viewUser : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    //build url path
    var path = requireUtil.format(restUrls.user.viewUser.path, params.userId);
    var url = {
        path: path,
        method: restUrls.user.viewUser.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.resetPassword = function(params, token, callback) {
    log.debug("resetPassword : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;
    var path = requireUtil.format(restUrls.user.resetPassword.path, params.password);
    var url = {
        path: path,
        method: restUrls.user.resetPassword.method
    };

    delete params.password;

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.forgotPassword = function(params, orgId, callback) {
    log.debug("forgotPassword : " + (JSON.stringify(params)));
    var headers = header;
    if (orgId)
        headers[cdsConfig.orgId] = orgId;

    var path = requireUtil.format(restUrls.user.forgotPass.path, params.userName);
    var url = {
        path: path,
        method: restUrls.user.forgotPass.method
    };

    delete params.userName;

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};


exports.isUserExist = function(params, orgId, callback) {
    log.debug("isUserExist : " + (JSON.stringify(params)));
    var headers = header;
    if (orgId)
        headers[cdsConfig.orgId] = orgId;

    //build url path
    var path = requireUtil.format(restUrls.user.isUserExist.path, params.userId);
    var url = {
        path: path,
        method: restUrls.user.isUserExist.method
    };

    //remove userId from params
    delete params.userId;

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.isMobileExist = function(params, orgId, callback) {
    log.debug("isMobileExist : " + (JSON.stringify(params)));
    var headers = header;
    if (orgId)
        headers[cdsConfig.orgId] = orgId;

    //build url path
    var path = requireUtil.format(restUrls.user.isMobileExist.path, params.mobileNo);
    var url = {
        path: path,
        method: restUrls.user.isMobileExist.method
    };

    //remove userId from params
    delete params.mobileNo;

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.isMailExist = function(params, orgId, callback) {
    log.debug("isMailExist : " + (JSON.stringify(params)));
    var headers = header;
    if (orgId)
        headers[cdsConfig.orgId] = orgId;

    //build url path
    var path = requireUtil.format(restUrls.user.isMailExist.path, params.mail);
    var url = {
        path: path,
        method: restUrls.user.isMailExist.method
    };

    //remove userId from params
    delete params.mail;

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.userTypes = function(orgId, callback) {
    log.debug("userTypes");
    var headers = header;
    if (orgId)
        headers[cdsConfig.orgId] = orgId;

    restService.builbArgs(restUrls.user.userTypes, null, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.usersList = function(params, token, callback) {
    log.debug("usersList : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    restService.builbArgs(restUrls.user.usersList, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getPrivileges = function(token, callback) {
    log.debug("getPrivileges : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    restService.builbArgs(restUrls.user.getPrivileges, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.viewUserInfo = function(params, token, callback) {
    log.debug("viewUserInfo : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    var path = requireUtil.format(restUrls.user.viewUserInfo.path, params.userId);
    var url = {
        path: path,
        method: restUrls.user.viewUserInfo.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};
exports.updateProfileImage = function(params, token, callback) {
    log.debug("updateProfile : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
        headers[cdsConfig.token] = token;

    //build url path
    var path = requireUtil.format(restUrls.user.updateProfileImage.path, params.userId);
    var url = {
        path: path,
        method: restUrls.user.updateProfileImage.method
    };
    console.log(url);
    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
}
