/** 
 * Citizen Controller
 * Module dependencies.
 */
var log = require('cds-logger').logger("cds-registration : citizen-controller"),
    util = require('cds-util'),
    cdsConfig = require('cds-config'),
    async = require("async"),
    citizenService = require('./services/citizen');

exports.savePersonalInf = function(params, token, fCallback) {
    log.debug("savePersonalInf");

    async.series({
            dob: function(callback) {
                var dob = params.dateOfBirth;
                if (dob) { //change date format
                    callback(null, util.formatDate(null, dob));
                } else {
                    callback(null, null);
                }
            },
            education: function(callback) {
                var education = params.educationId;
                if (education) {
                    //change date format
                    callback(null, {
                        "educationId": education
                    });
                } else {
                    callback(null, null);
                }
            }
        },
        function(err, results) {
            dob = results.dob;
            education = results.education;

            if (dob) {
                params.dateOfBirth = dob;
            }
            if (education) {
                params.education = education;
            }

            citizenService.savePersonalInf(params, token, function(resp) {
                fCallback(resp);
            });
        });
};

exports.editPersonalInf = function(params, token, fCallback) {
    log.debug("editPersonalInf ");

    async.series({
            dob: function(callback) {
                var dob = params.dateOfBirth;
                if (dob) { //change date format
                    callback(null, util.formatDate(null, dob));
                } else {
                    callback(null, null);
                }
            },
            education: function(callback) {
                var education = params.educationId;
                if (education) {
                    //change date format
                    callback(null, {
                        "educationId": education
                    });
                } else {
                    callback(null, null);
                }
            }
        },
        function(err, results) {
            dob = results.dob;
            education = results.education;
            if (dob) {
                params.dateOfBirth = dob;
            }
            if (education) {
                params.education = education;
            }
            citizenService.editPersonalInf(params, token, function(resp) {
                fCallback(resp);
            });
        });
};

exports.saveFile = function(files, callback) {
    if (files != null && Object.keys(files).length > 0) {
        var imageName = files.photograph.originalname;
        callback(cdsConfig.image.path + imageName);
    } else {
        callback(null);
    }
};

exports.getPersonalInf = function(params, token, callback) {
    log.debug("getPersonalInf");

    citizenService.getPersonalInf(params, token, function(resp) {
        var dob = resp.data.dateOfBirth;
        if (dob) { //change date format
            resp.data.dateOfBirth = util.deFormatDate(null, dob);
        }
        if (resp.data.education && resp.data.education.educationId) {
            resp.data.educationId = resp.data.education.educationId;
        }

        callback(resp);
    });
};

exports.saveWorkInf = function(params, token, callback) {
    log.debug("saveWorkInf ");

    citizenService.saveWorkInf(params, token, function(resp) {
        callback(resp);
    });
};

exports.editWorkInf = function(params, token, callback) {
    log.debug("editWorkInf");

    citizenService.editWorkInf(params, token, function(resp) {
        callback(resp);
    });
};

exports.getWorkInf = function(params, token, callback) {
    log.debug("getWorkInf");
    citizenService.getWorkInf(params, token, function(resp) {
        callback(resp);
    });
};

exports.saveVoterInf = function(params, token, callback) {
    log.debug("saveVoterInf ");

    citizenService.saveVoterInf(params, token, function(resp) {
        callback(resp);
    });
};

exports.editVoterInf = function(params, token, callback) {
    log.debug("editVoterInf");

    citizenService.editVoterInf(params, token, function(resp) {
        callback(resp);
    });
};

exports.getVoterInf = function(params, token, callback) {
    log.debug("getVoterInf");

    citizenService.getVoterInf(params, token, function(resp) {
        callback(resp);
    });
};

exports.saveResidentialAddress = function(params, token, callback) {
    log.debug("saveResidentialAddress");

    citizenService.saveResidentialAddress(params, token, function(resp) {
        callback(resp);
    });
};

exports.editResidentialAddress = function(params, token, callback) {
    log.debug("editResidentialAddress");

    citizenService.editResidentialAddress(params, token, function(resp) {
        callback(resp);
    });
};


exports.getResidentialAddress = function(params, token, callback) {
    log.debug("getResidentialAddress");

    citizenService.getResidentialAddress(params, token, function(resp) {
        callback(resp);
    });
};

exports.saveFamily = function(params, token, callback) {
    log.debug("saveFamily");
    if(params.length !== undefined){
        for (var i = 0; i < params.length; i++) {
            if (params[i].dateOfBirth) {
                params[i].dateOfBirth = util.formatDate(null, params[i].dateOfBirth);
            }
            if (params[i].marriageDate) {
                params[i].marriageDate = util.formatDate(null, params[i].marriageDate);
            }
        }
    } else {
        if (params.dateOfBirth) {
            params.dateOfBirth = util.formatDate(null, params.dateOfBirth);
        }
        if (params.marriageDate) {
            params.marriageDate = util.formatDate(null, params.marriageDate);
        }
    }

    citizenService.saveFamily(params, token, function(resp) {
        callback(resp);
    });
};

exports.editFamily = function(params, token, callback) {
    log.debug("editFamily");

    if(params.length !== undefined){
        for (var i = 0; i < params.data.length; i++) {
            if (params.data[i].dateOfBirth) {
                params.data[i].dateOfBirth = util.formatDate(null, params.data[i].dateOfBirth);
            }
            if (params.data[i].marriageDate) {
                params.data[i].marriageDate = util.formatDate(null, params.data[i].marriageDate);
            }
        }
    } else {
        if (params.dateOfBirth) {
            params.dateOfBirth = util.formatDate(null, params.dateOfBirth);
        }
        if (params.marriageDate) {
            params.marriageDate = util.formatDate(null, params.marriageDate);
        }
    }

    citizenService.editFamily(params, token, function(resp) {
        callback(resp);
    });
};

exports.getFamily = function(params, token, callback) {
    log.debug("getFamily");

    citizenService.getFamily(params, token, function(resp) {
        if (resp.data.status === "success") {
            for (var i = 0; i < resp.data.length; i++) {
                if (resp.data[i].dateOfBirth) {
                    resp.data[i].dateOfBirth = util.deFormatDate(null, resp.data[i].dateOfBirth);
                }
                if (resp.data[i].education && resp.data[i].education.educationId) {
                    resp.data[i].educationId = resp.data[i].education.educationId;
                }
                if (resp.data[i].marriageDate) {
                    resp.data[i].marriageDate = util.deFormatDate(null, resp.data[i].marriageDate);
                }
            }
        }

        callback(resp);
    });
};

exports.quickRegistration = function(params, orgId, callback) {
    log.debug("quickRegistration");

    try {
        var dob = params.dateOfBirth;
        params.dateOfBirth = util.formatDate(null, dob);

        delete params.orgId;

        citizenService.quickRegistration(params, orgId, function(resp) {
            callback(resp);
        });
    } catch (e) {
        callback(e);
    }

};
