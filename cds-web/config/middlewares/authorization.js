/**
 * Generic require login routing middleware
 */
var cdsConfig = require('cds-config'),
    util = require('cds-util'),
    roleConfig = require('../role');

exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        util.handleErrors(cdsConfig.errors.session.expired, function(resp) {
            res.json(resp);
        });
    } else {
        next();
    }
};

/**
 * User authorizations routing middleware
 */
exports.user = {
    hasAuthorization: function(req, res, next) {
        next();
    },
    hasAuthorizationToPage: function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/signin#/statusnull-nosession');
        } else {
            var defRole = roleConfig.getTopRole(req.user.data.user.appRoles),
            availModules = roleConfig.getPermittedModules(defRole);

            for(var i=0; i<availModules.length; i++){
                if(availModules[i].url == req.route.path){
                    next();
                    return;
                    break;

                }
            }
            res.redirect('/');
        }
    },
    hasOpenSession: function(req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/');
        } else {
            next();
        }
    },
    hasAuthorisedRole: function(req, res, next) {

    }

};

/**
 *  filter  the response b4 sending to user
 */
exports.filterResponse = function(req, res) {
    var resp = req.resp;
    req.resp = null;
    //res.statusCode = resp.data.httpStatusCode;
    if (resp.data.errorCode === '40105') {
        util.handleErrors(cdsConfig.errors.session.expired, function(resp) {
            res.json(resp);
        });
    } else {
        res.json(resp);
    }

};