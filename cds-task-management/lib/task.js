/**
 * task.js
 */

var restService = require('cds-rest-services'),
    restUrls = require('cds-rest-services').urls,
    cdsConfig = require('cds-config'),
    header = cdsConfig.restUrl.contentType,
    requireUtil = require("util"),
    util = require('cds-util'),
    log = require('cds-logger').logger("cds-task-management");


exports.createTask = function(params, files, token, callback) {
    log.debug("createTask : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    saveAttachments(files, function(imgPaths) {
        params.taskWorkAllocation.toDate = util.formatDate(null, params.taskWorkAllocation.toDate);
        params.taskAttachments = imgPaths;
        restService.builbArgs(restUrls.task.createTask, params, headers, function(args) {
            restService.makecall(args, callback);
        });
    });
};

exports.editTask = function(params, token, callback) {
    log.debug("editTask : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    //build url path
    var url = {
        path: requireUtil.format(restUrls.task.editTask.path, params.taskId),
        method: restUrls.task.editTask.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.deleteTask = function(params, token, callback) {
    log.debug("deleteTask : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    restService.builbArgs(restUrls.task.deleteTask, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.addAttachmentToTask = function(params, files, token, callback) {
    log.debug("addAttachmentToTask : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    var url = {
        path: requireUtil.format(restUrls.task.addAttachmentToTask.path, params.taskId),
        method: restUrls.task.addAttachmentToTask.method
    };

    saveAttachments(files, function(imgPaths) {
        restService.builbArgs(url, imgPaths, headers, function(args) {
            restService.makecall(args, callback);
        });
    });
};

//internal image saver
var saveAttachments = function(files, callback) {

    var images = [];
    if(files != null){
        if(files.attachmentName.length){
            for(var i=0; i< files.attachmentName.length; i++){
                var imageName = files.attachmentName[i].name;
                var originalName = files.attachmentName[i].originalname;
                images.push({
                    attachmentName: imageName,
                    originalName : originalName
                });
            }
        }else{
             var imageName = files.attachmentName.name;
             var originalName = files.attachmentName.originalname;
                images.push({
                    attachmentName: imageName,
                     originalName : originalName
                });
        }
        console.log(images);
         callback(images);
    }else{
         callback([]);
    }
}

exports.deleteAttachmentFromTask = function(params, token, callback) {
    log.debug("deleteAttachmentFromTask : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    var url = {
        path: requireUtil.format(restUrls.task.deleteAttachmentFromTask.path, params.taskId),
        method: restUrls.task.deleteAttachmentFromTask.method
    };

    restService.builbArgs(url, params.attachments, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.addCommentToTask = function(params, token, callback) {
    log.debug("addCommentToTask : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    var url = {
        path: requireUtil.format(restUrls.task.addCommentToTask.path, params.taskId),
        method: restUrls.task.addCommentToTask.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.updateCommentToTask = function(params, token, callback) {
    log.debug("updateCommentToTask : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    var url = {
        path: requireUtil.format(restUrls.task.updateCommentToTask.path, params.taskId),
        method: restUrls.task.updateCommentToTask.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.deleteCommentToTask = function(params, token, callback) {
    log.debug("deleteCommentToTask : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    var url = {
        path: requireUtil.format(restUrls.task.deleteCommentToTask.path, params.taskId),
        method: restUrls.task.deleteCommentToTask.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getStatuses = function(params, orgId, callback) {
    log.debug("getStatuses : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.orgId] = orgId;

    var url = {
        path: requireUtil.format(restUrls.task.getStatuses.path, params.statusType),
        method: restUrls.task.getStatuses.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getTaskDetails = function(params, token, callback) {
    log.debug("getTaskDetails : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    var url = {
        path: requireUtil.format(restUrls.task.getTaskDetails.path, params.taskId),
        method: restUrls.task.getTaskDetails.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getAssignedTasks = function(params, token, callback) {
    log.debug("getAssignedTasks : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    ( params.fromDate !== undefined ) ? params.fromDate = util.formatDate(null, params.fromDate) : delete params.fromDate;
    ( params.toDate !== undefined ) ? params.toDate = util.formatDate(null, params.toDate) : delete params.toDate;

    restService.builbArgs(restUrls.task.getAssignedTasks, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getSupervisorTasks = function(params, token, callback) {
    log.debug("getSupervisorTasks : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    ( params.fromDate !== undefined ) ? params.fromDate = util.formatDate(null, params.fromDate) : delete params.fromDate;
    ( params.toDate !== undefined ) ? params.toDate = util.formatDate(null, params.toDate) : delete params.toDate;

    restService.builbArgs(restUrls.task.getSupervisorTasks, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getTaskPrimeIds = function(params, token, callback) {
    log.debug("getTaskPrimeIds : " + (JSON.stringify(params)));
    var headers = header;
    if (token)
    headers[cdsConfig.token] = token;

    restService.builbArgs(restUrls.task.getTaskPrimeIds, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getTasks = function(params, token, callback) {
    log.debug("getTasks : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    ( params.fromDate !== undefined ) ? params.fromDate = util.formatDate(null, params.fromDate) : delete params.fromDate;
    ( params.toDate !== undefined ) ? params.toDate = util.formatDate(null, params.toDate) : delete params.toDate;

    restService.builbArgs(restUrls.task.getTasks, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.getTeamTasks = function(params, token, callback) {
    log.debug("getTeamTasks : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    ( params.fromDate !== undefined ) ? params.fromDate = util.formatDate(null, params.fromDate) : delete params.fromDate;
    ( params.toDate !== undefined ) ? params.toDate = util.formatDate(null, params.toDate) : delete params.toDate;    

    restService.builbArgs(restUrls.task.getTeamTasks, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.updateTasksStatus = function(params, token, callback) {
    log.debug("updateTasksStatus : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.token] = token;

    var url = {
        path: requireUtil.format(restUrls.task.updateTasksStatus.path, params.taskId),
        method: restUrls.task.updateTasksStatus.method
    };

    restService.builbArgs(url, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.requestTypes = function(params, orgId, callback) {
    log.debug("requestTypes : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.orgId] = orgId;

    restService.builbArgs(restUrls.task.requestTypes, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.taskCategories = function(params, orgId, callback) {
    log.debug("taskCategories : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.orgId] = orgId;

    restService.builbArgs(restUrls.task.taskCategories, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};

exports.taskPriority = function(params, orgId, callback) {
    log.debug("taskPriority : " + (JSON.stringify(params)));
    var headers = header;
    headers[cdsConfig.orgId] = orgId;

    restService.builbArgs(restUrls.task.taskPriority, params, headers, function(args) {
        restService.makecall(args, callback);
    });
};
