/** 
 * Volunteer Controller
 * Module dependencies.
 */

var volunteerService = require('../services/volunteer'),
    cdsRegistration = require('cds-registration'),
    log = require('cds-logger').logger("volunteer-controller");


exports.save = function(req, res, next) {
    log.debug("save : logged user - " + req.user.data.user.appUserId);
    var token = req.user ? req.user.data.token : null;
    var params = req.body;
    params.userId = params.userId || req.user.data.user.appUserId;

    cdsRegistration.saveVolunteer(params, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.edit = function(req, res, next) {
    log.debug("edit : logged user - " + req.user.data.user.appUserId);
    var token = req.user ? req.user.data.token : null;
    var params = req.body;
    params.userId = params.userId || req.user.data.user.appUserId;

    cdsRegistration.editVolunteer(params, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.get = function(req, res, next) {
    log.debug("get : logged user - " + req.user.data.user.appUserId);
    var userId = req.query.userId || req.user.data.user.appUserId;
    var token = req.user ? req.user.data.token : null;

    cdsRegistration.getVolunteer({
        userId: userId
    }, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.delete = function(req, res, next) {
    log.debug("delete : logged user - " + req.user.data.user.appUserId);
    var token = req.user ? req.user.data.token : null;
    var userId = req.query.userId || req.user.data.user.appUserId;

    volunteerService.delete({
        userId: userId
    }, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.areasIntrestedToVolunteer = function(req, res, next) {
    log.debug("areasIntrestedToVolunteer :");
    var orgId = req.query.orgId;

    volunteerService.areasIntrestedToVolunteer(orgId, function(resp) {
        res.json(resp);
    });
};

exports.volunteerCategory = function(req, res, next) {
    log.debug("volunteerCategory");
    var orgId = req.query.orgId;

    volunteerService.volunteerCategory(orgId, function(resp) {
        res.json(resp);
    });
};

exports.volunteerLeads = function(req, res, next) {
    log.debug("volunteerLeads");
    var orgId = req.query.orgId;

    volunteerService.volunteerLeads(orgId, function(resp) {
        res.json(resp);
    });
};

exports.isVolunteerIdExist = function(req, res, next) {
    log.debug("isVolunteerIdExist");
    var orgId = req.query.orgId;

    volunteerService.isVolunteerIdExist({
        volunteerId: volunteerId
    }, orgId, function(resp) {
        res.json(resp);
    });
};

exports.performanceGrades = function(req, res, next) {
    log.debug("performanceGrades");
    var orgId = req.query.orgId;

    volunteerService.performanceGrades(orgId, function(resp) {
        res.json(resp);
    });
};

exports.volunteerSheet = function(req, res, next) {
    log.debug("volunteerSheet : logged user - " + req.user.data.user.appUserId);
    var token = req.user ? req.user.data.token : null;
    var volunteerId = req.query.volunteerId;

    volunteerService.volunteerSheet({
        volunteerId: volunteerId
    }, token, function(resp) {
        req.resp = resp;
        next();
    });
};
