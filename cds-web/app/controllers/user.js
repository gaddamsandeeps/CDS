/** 
 * User Controller
 * Module dependencies.
 */
var userService = require('../services/user'),
    taskMgmt = require('cds-task-management'),
    roleMgmt = require('cds-role-management'),
    log = require('cds-logger').logger("user-controller"),
    fs = require("fs"),
    cdsConfig = require('cds-config');


exports.signin = function(req, res, next) {
    log.debug("signin");
    if (!req.user) {
        res.render('layouts/signin.html', {
            title: 'Login'
        });
    } else {
        res.redirect('/success');
    }
};

exports.myProfile = function(req, res, next) {
    log.debug("myProfile : logged user - " + req.user.data.user.appUserId);
    var params = req.body;
    var token = req.user ? req.user.data.token : null;

    userService.myProfile(params, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.updateProfile = function(req, res, next) {
    log.debug("updateProfile : logged user - " + req.user.data.user.appUserId);
    var params = req.body;
    var token = req.user ? req.user.data.token : null;

    userService.updateProfile(params, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.updateProfileImage = function(req, res, next) {
    var userId = req.user.data.user.appUserId;
    var existingImgPath = req.body.currentImgPath || "";
    var token = req.user ? req.user.data.token : null;
    var params = req.body;
    params.userId = userId;
    params.photograph = req.files.photograph.name;
    userService.updateProfileImage(params, token, function(resp) {
        var img_path = req.files.photograph.path;
        if (resp.status == "failure") {
            fs.unlink(img_path, function(e) {});
        } else {
            fs.unlink(existingImgPath, function(e) {});
        }
        res.json(resp);
    });
};

exports.authenticate = function(params, callback) {
    log.debug("authenticate : logging user : " + params.loginId);
    userService.authenticate(params, callback);
};

exports.resetPassword = function(req, res, next) {
    log.debug("resetPassword : logged user - " + req.user);
    var params = req.body.params;
    var token = req.user ? req.user.data.token : null;

    userService.resetPassword(params, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.forgotPassword = function(req, res, next) {
    log.debug("forgotPassword : logged user - " + req.query.userName);
    var username = req.query.userName;
    var orgId = req.query.orgId;

    userService.forgotPassword({
        userName: username
    }, orgId, function(resp) {
        res.json(resp);
    });
};

exports.viewUser = function(req, res, next) {
    log.debug("viewUser : logged user - " + req.user.data.user.appUserId);
    var userId = req.query.userId;
    var token = req.user ? req.user.data.token : null;

    userService.viewUser({
        userId: userId
    }, token, function(resp) {
        req.resp = resp;
        next();
    });
};


exports.getUserToken = function(user) {
    return user ? user.token : null;
};

exports.isUserExist = function(req, res, next) {
    log.debug("isUserExist : userName - " + req.query.userName);

    var userName = req.query.userName;
    var orgId = req.query.orgId;

    userService.isUserExist({
        userId: userName
    }, orgId, function(resp) {
        res.json(resp);
    });
};

exports.isMobileExist = function(req, res, next) {
    log.debug("isMobileExist : mobileNumber - " + req.query.mobileNumber);

    var mobileNumber = req.query.mobileNumber;
    var orgId = req.query.orgId;

    userService.isMobileExist({
        mobileNo: mobileNumber
    }, orgId, function(resp) {
        res.json(resp);
    });
};

exports.isMailExist = function(req, res, next) {
    log.debug("isMailExist : email - " + req.query.email);

    var email = req.query.email;
    var orgId = req.query.orgId;

    userService.isMailExist({
        mail: email
    }, orgId, function(resp) {
        res.json(resp);
    });
};

exports.userTypes = function(req, res, next) {
    log.debug("userTypes : orgId - " + req.query.orgId);
    var orgId = req.query.orgId;

    userService.userTypes(orgId, function(resp) {
        res.json(resp);
    });
};

exports.usersList = function(req, res, next) {
    log.debug("usersList : logged user - " + req.user.data.user.appUserId);
    var params = req.query;
    params.limit = req.query.limit;

    var token = req.user ? req.user.data.token : null;

    userService.usersList(params, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.createTask = function(req, res, next) {
    log.debug("createTask : logged user - " + req.user.data.user.appUserId);
    var params = req.body;
    var token = req.user ? req.user.data.token : null;

    taskMgmt.createTask(params, req.files, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.editTask = function(req, res, next) {
    log.debug("editTask : logged user - " + req.user.data.user.appUserId);
    var params = req.body;
    var token = req.user ? req.user.data.token : null;

    taskMgmt.editTask(params, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.deleteTask = function(req, res, next) {
    log.debug("deleteTask : logged user - " + req.user.data.user.appUserId);
    var tid = req.query.id;
    var token = req.user ? req.user.data.token : null;

    taskMgmt.deleteTask({
        id: tid
    }, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.addAttachmentToTask = function(req, res, next) {
    log.debug("addAttachmentToTask : logged user - " + req.user.data.user.appUserId);
    var tid = req.body.taskId;
    var token = req.user ? req.user.data.token : null;

    console.log(req.files);

    taskMgmt.addAttachmentToTask({
        taskId: tid
    }, req.files, token, function(resp) {
        req.resp = resp;
        next();
    });
};

/*exports.deleteAttachmentFromTask = function(req, res, next) {
    log.debug("deleteAttachmentFromTask : logged user - " + req.user.data.user.appUserId);
    var tid = req.query.id;
    var token = req.user ? req.user.data.token : null;

    taskMgmt.deleteAttachmentFromTask({
        id: tid
    }, token, function(resp) {
        req.resp = resp;
        next();
    });
};*/

exports.deleteAttachmentFromTask = function(req, res, next) {
    log.debug("deleteAttachmentFromTask : logged user - " + req.user.data.user.appUserId);
    var params = req.body;

    if (!params.attachments.length) {
        params.attachments = [];
    }
    var token = req.user ? req.user.data.token : null;

    taskMgmt.deleteAttachmentFromTask(params, token, function(resp) {
        var basePath = cdsConfig.attachments.rootPath + cdsConfig.attachments.path
        if (resp.status == "success") {
            if (params.attachments.length) {
                for (var i = 0; i < params.attachments.length; i++) {
                    fs.unlink(basePath + params.attachments[i].attachmentName, function(e) {
                        console.log("deleted");
                    });
                }
            } else {
                /*Delete all attachments*/
                for (var i = 0; i < params.attachmentsArray.length; i++) {
                    fs.unlink(basePath + params.attachmentsArray[i].attachmentName, function(e) {
                        console.log("deleted");
                    });
                }
            }

            //TODO get all the file names loop it and do fs.unlink           
            req.resp = resp;
            next();
        } else {
            req.resp = resp;
            next();
        }

    });
};

exports.addCommentToTask = function(req, res, next) {
    log.debug("addCommentToTask : logged user - " + req.user.data.user.appUserId);
    var params = req.body;
    var token = req.user ? req.user.data.token : null;

    taskMgmt.addCommentToTask(params, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.updateCommentToTask = function(req, res, next) {
    log.debug("updateCommentToTask : logged user - " + req.user.data.user.appUserId);
    var params = req.body;
    var token = req.user ? req.user.data.token : null;

    taskMgmt.updateCommentToTask(params, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.deleteCommentToTask = function(req, res, next) {
    log.debug("deleteCommentToTask : logged user - " + req.user.data.user.appUserId);
    var params = req.body;
    var token = req.user ? req.user.data.token : null;

    taskMgmt.deleteCommentToTask(params, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.getStatuses = function(req, res, next) {
    log.debug("getStatuses");
    var statusType = req.query.statustype;
    var orgId = req.query.orgId;

    taskMgmt.getStatuses({
        statusType: statusType
    }, orgId, function(resp) {
        res.json(resp);
    });
};


exports.getTaskDetails = function(req, res, next) {
    log.debug("getTaskDetails : logged user - " + req.user.data.user.appUserId);
    var taskId = req.query.id;
    var token = req.user ? req.user.data.token : null;

    taskMgmt.getTaskDetails({
        taskId: taskId
    }, token, function(resp) {
        req.resp = resp;
        if (resp.status == "success") {
            req.resp.data.rootPath = cdsConfig.attachments.viewPath + cdsConfig.attachments.path;
        }
        next();
    });
};

exports.getTeamTasks = function(req, res, next) {
    log.debug("getTasks : logged user - " + req.user.data.user.appUserId);
    var params = req.query;
    var token = req.user ? req.user.data.token : null;

    taskMgmt.getTeamTasks(params, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.getTasks = function(req, res, next) {
    log.debug("getTasks : logged user - " + req.user.data.user.appUserId);
    var params = req.query;
    var token = req.user ? req.user.data.token : null;

    taskMgmt.getTasks(params, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.getAssignedTasks = function(req, res, next) {
    log.debug("getAssignedTasks : logged user - " + req.user.data.user.appUserId);
    var params = req.query;
    var token = req.user ? req.user.data.token : null;

    taskMgmt.getAssignedTasks(params, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.getSupervisorTasks = function(req, res, next) {
    log.debug("getSupervisorTasks : logged user - " + req.user.data.user.appUserId);
    var params = req.query;
    var token = req.user ? req.user.data.token : null;

    taskMgmt.getSupervisorTasks(params, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.getTaskPrimeIds = function(req, res, next) {
    log.debug("getTaskPrimeIds : logged user - " + req.user.data.user.appUserId);
    var params = req.query;
    var token = req.user ? req.user.data.token : null;

    taskMgmt.getTaskPrimeIds(params, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.requestTypes = function(req, res, next) {
    log.debug("requestTypes");
    var params = req.body;
    var orgId = req.query.orgId;

    taskMgmt.requestTypes(params, orgId, function(resp) {
        res.json(resp);
    });
};

exports.taskCategories = function(req, res, next) {
    log.debug("taskCategories");
    var params = req.body;
    var orgId = req.query.orgId;

    taskMgmt.taskCategories(params, orgId, function(resp) {
        res.json(resp);
    });
};

exports.taskPriority = function(req, res, next) {
    log.debug("taskPriority");
    var params = req.body;
    var orgId = req.query.orgId;

    taskMgmt.taskPriority(params, orgId, function(resp) {
        res.json(resp);
    });
};

exports.updateTasksStatus = function(req, res, next) {
    log.debug("updateTasksStatus : logged user - " + req.user.data.user.appUserId);
    var params = req.body;
    var token = req.user ? req.user.data.token : null;

    taskMgmt.updateTasksStatus(params, token, function(resp) {
        req.resp = resp;
        next();
    });
};

//roles
exports.getRole = function(req, res, next) {
    log.debug("getRole : logged user - " + req.user.data.user.appUserId);
    var id = req.query.id;
    var token = req.user ? req.user.data.token : null;

    roleMgmt.getRole({
        id: id
    }, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.deactivateRole = function(req, res, next) {
    log.debug("deactivateRole : logged user - " + req.user.data.user.appUserId);
    var id = req.query.id;
    var token = req.user ? req.user.data.token : null;

    roleMgmt.deactivateRole({
        id: id
    }, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.getRoles = function(req, res, next) {
    log.debug("getRoles : logged user - " + req.user.data.user.appUserId);
    var token = req.user ? req.user.data.token : null;

    roleMgmt.getRoles(null, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.saveRole = function(req, res, next) {
    log.debug("saveRole : logged user - " + req.user.data.user.appUserId);
    var params = req.body;
    var token = req.user ? req.user.data.token : null;

    roleMgmt.saveRole(params, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.updateRole = function(req, res, next) {
    log.debug("updateRole : logged user - " + req.user.data.user.appUserId);
    var params = req.body;
    var token = req.user ? req.user.data.token : null;

    roleMgmt.updateRole(params, token, function(resp) {
        req.resp = resp;
        next();
    });
};

exports.getPrivileges = function(req, res, next) {
    log.debug("getPrivileges : logged user - " + req.user.data.user.appUserId);
    var token = req.user ? req.user.data.token : null;

    userService.getPrivileges(token, function(resp) {
        req.resp = resp;
        next();
    });
};

/**
 * Logout
 */
exports.signout = function(req, res, next) {
    req.logout();
    res.redirect('/');
};

/**
 * User Data
 */
exports.getUserFromSession = function(req, res, next) {
    var user = req.user;

    //remove non accesible data for browser
    delete user.token;
    res.json(user);
};

exports.viewUserInfo = function(req, res, next) {
    log.debug("viewUserInfo : logged user - " + req.user.data.user.appUserId + " selected user - " + req.query.userId);

    var userId = req.query.userId || req.user.data.user.appUserId;
    var token = req.user ? req.user.data.token : null;

    userService.viewUserInfo({
        userId: userId
    }, token, function(resp) {
        req.resp = resp;
        next();
    });
};
