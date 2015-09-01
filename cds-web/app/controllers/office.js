/** 
 * Office Controller
 * Module dependencies.
 */
var officeService = require('../services/office'),
    log = require('cds-logger').logger("office-controller");

exports.VnCVerificationList = function(req, res, next) {
    log.debug("VnCVerificationList : logged user - " + req.user.data.user.appUserId + " type : " + req.query.type);
    var type = req.query.type;
    var token = req.user ? req.user.data.token : null;

    officeService.VnCVerificationList({
        type: type
    }, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.assignCadreForApproval = function(req, res, next) {
    log.debug("assignCadreForApproval : logged user - " + req.user.data.user.appUserId + " selected user - " + req.query.userId + " type : " + req.query.type);
    var params = req.body;
    var token = req.user ? req.user.data.token : null;

    officeService.assignCadreForApproval(params, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.approveVnC = function(req, res, next) {
    log.debug("approveVnC : logged user - " + req.user.data.user.appUserId + " selected user - " + req.query.userId);
    var userId = req.body.userId;
    console.log(req.body);
    var token = req.user ? req.user.data.token : null;

    officeService.approveVnC(req.body, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.rejectVnC = function(req, res, next) {
    log.debug("rejectVnC : logged user - " + req.user.data.user.appUserId + " selected user - " + req.query.userId);
    var userId = req.body.userId;
    var comment = req.body.comment;
    var token = req.user ? req.user.data.token : null;

    officeService.rejectVnC({
        userId: userId,
        rejectComment: comment
    }, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.holdVnC = function(req, res, next) {
    log.debug("holdVnC : logged user - " + req.user.data.user.appUserId + " selected user - " + req.query.userId);
    var userId = req.query.userId;
    var token = req.user ? req.user.data.token : null;

    officeService.holdVnC({
        userId: userId
    }, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.getServiceCentreEmployeeDetails = function(req, res, next) {
    log.debug("getServiceCentreEmployeeDetails : logged user - " + req.user.data.user.appUserId);
    var sId = req.query.id;
    var token = req.user ? req.user.data.token : null;

    officeService.getServiceCentreEmployeeDetails({
        sId: sId
    }, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.getServiceCentreDetails = function(req, res, next) {
    log.debug("getServiceCentreDetails : logged user - " + req.user.data.user.appUserId);
    var token = req.user ? req.user.data.token : null;

    officeService.getServiceCentreDetails(token, function(resp) {
        req.resp = resp;
        next();
    });
};
