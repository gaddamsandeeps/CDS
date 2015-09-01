/** 
 * Cadre Controller
 * Module dependencies.
 */

var cadreService = require('../services/cadre'),
    cdsRegistration = require('cds-registration'),
    util = require('cds-util'),
    log = require('cds-logger').logger("cadre-controller");

exports.save = function(req, res, next) {
    log.debug("save : logged user - " + req.user.data.user.appUserId);
    var params = req.body;
    var token = req.user ? req.user.data.token : null;
    params.userId = params.userId || req.user.data.user.appUserId;

    cdsRegistration.saveCadre(params, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.edit = function(req, res, next) {
    log.debug("edit : logged user - " + req.user.data.user.appUserId);
    var params = req.body;
    params.userId = params.userId || req.user.data.user.appUserId;
    var token = req.user ? req.user.data.token : null;

    cdsRegistration.editCadre(params, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.get = function(req, res, next) {
    log.debug("get : logged user - " + req.user.data.user.appUserId);
    
     console.log(req.query.userId);


    var userId = req.query.userId || req.user.data.user.appUserId;
    



    var token = req.user ? req.user.data.token : null;

    cdsRegistration.getCadre({
        userId: userId
    }, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.delete = function(req, res, next) {
    log.debug("delete : logged user - " + req.user.data.user.appUserId);
    var userId = req.query.userId || req.user.data.user.appUserId;
    var token = req.user ? req.user.data.token : null;

    cadreService.delete({
        userId: userId
    }, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.partyPositions = function(req, res, next) {
    log.debug("partyPositions");
    var orgId = req.query.orgId;

    cadreService.partyPositions(orgId, function(resp) {
        res.json(resp);
    });
};

exports.bloodGroups = function(req, res, next) {
    log.debug("bloodGroups");
    var orgId = req.query.orgId;

    cadreService.bloodGroups(orgId, function(resp) {
        res.json(resp);
    });
};

exports.isPartyMemberShipIdExist = function(req, res, next) {
    log.debug("isPartyMemberShipIdExist");
    var partyMemberShipId = req.query.partyMemberShipId;
    var token = req.user ? req.user.data.token : null;

    cadreService.isPartyMemberShipIdExist({
        partyMemberShipId: partyMemberShipId
    }, token, function(resp) {
        res.json(resp);
    });
};

exports.getCadreWorksheet = function(req, res, next) {
    log.debug("getCadreWorksheet : logged user - " + req.user.data.user.appUserId + " cadre id - " + req.query.userId);
    var userId = req.query.userId;
    var token = req.user ? req.user.data.token : null;

    cadreService.getCadreWorksheet({
        userId: userId
    }, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.getCadreLeads = function(req, res, next) {
    log.debug("getCadreLeads : logged user - " + req.user.data.user.appUserId);
    var token = req.user ? req.user.data.token : null;

    cadreService.getCadreLeads(token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.getCadresList = function(req, res, next) {
    log.debug("getCadresList : logged user - " + req.user.data.user.appUserId);

    var token = req.user ? req.user.data.token : null;
    var q = req.query.q;

    cadreService.getCadresList({
        q: q
    }, token, function(resp) {
        req.resp = resp;
        next();
    });
};
