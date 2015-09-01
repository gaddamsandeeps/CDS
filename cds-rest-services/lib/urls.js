module.exports = {
    user: {
        myProfile: {
            path: "myprofile/%s/",
            method: "POST"
        },
        updateProfile: {
            path: "updateProfile/%s/",
            method: "POST"
        },
        authenticate: {
            path: "authenticate",
            method: "POST"
        },
        isUserExist: {
            path: "user/usernameexists/%s/",
            method: "GET"
        },
        isMobileExist: {
            path: "user/mobileexists/%s/",
            method: "GET"
        },
        isMailExist: {
            path: "user/emailexists/%s/",
            method: "GET"
        },
        usersList: {
            path: "search/users",
            method: "GET"
        },
        userTypes: {
            path: "lookup/usertype/",
            method: "GET"
        },
        viewUser: {
            path: "user/%s/requestDetails",
            method: "GET"
        },
        resetPassword: {
            path: "user/resetpassword/%s/",
            method: "PUT"
        },
        forgotPass: {
            path: "user/forgotpass/%s/",
            method: "GET"
        },
        getPrivileges: {
            path: "lookup/privileges",
            method: "GET"
        },
        viewUserInfo: {
            path: "userinfo/%s/userinformation",
            method: "GET"
        },
        updateProfileImage: {
            path: "user/%s/uploadphoto",
            method: "PUT"
        }
    },
    task: {
        createTask: {
            path: "tasks/",
            method: "POST"
        },
        editTask: {
            path: "tasks/%s/",
            method: "PUT"
        },
        deleteTask: {
            path: "tasks/",
            method: "DELETE"
        },
        addAttachmentToTask: {
            path: "tasks/%s/attachments/",
            method: "POST"
        },
        deleteAttachmentFromTask: {
            path: "tasks/%s/attachments/",
            method: "DELETE"
        },
        addCommentToTask: {
            path: "tasks/%s/comments/",
            method: "POST"
        },
        updateCommentToTask: {
            path: "tasks/%s/comments/",
            method: "PUT"
        },
        deleteCommentToTask: {
            path: "tasks/%s/comments/",
            method: "DELETE"
        },
        getStatuses: {
            path: "lookup/%s/statuses/",
            method: "GET"
        },
        getTaskDetails: {
            path: "tasks/%s/",
            method: "GET"
        },
        getTasks: {
            path: "tasks/alltasks/",
            method: "GET"
        },
        getAssignedTasks: {
            path: "tasks/mytasks/",
            method: "GET"
        },
        getSupervisorTasks: {
            path: "tasks/tasksforsupervisor/",
            method: "GET"
        },
        // check the servicename and change it accordingly
        getTaskPrimeIds: {
            path: "tasks/tasksforsupervisor/",
            method: "GET"
        },
        getTeamTasks: {
            path: "tasks/reporteestasks/",
            method: "GET"
        },
        updateTasksStatus: {
            path: "tasks/%s/updatetaskstatus/",
            method: "PUT"
        },
        requestTypes: {
            path: "lookup/requestsTypes/",
            method: "GET"
        },
        taskCategories: {
            path: "lookup/taskCategories/",
            method: "GET"
        },
        taskPriority: {
            path: "lookup/priorities/",
            method: "GET"
        }
    },
    role: {
        getRole: {
            path: "roles/%s/",
            method: "GET"
        },
        deactivateRole: {
            path: "roles/%s/",
            method: "DELETE"
        },
        getRoles: {
            path: "roles",
            method: "GET"
        },
        saveRole: {
            path: "roles",
            method: "POST"
        },
        updateRole: {
            path: "roles/%s/",
            method: "PUT"
        }
    },
    office: {
        vnCVerificationList: {
            path: "user/dashboard/%s/",
            method: "GET"
        },
        approveVnC: {
            path: "userstatuschange/%s/cadre/approve/",
            method: "PUT"
        },
        rejectVnC: {
            path: "userstatuschange/%s/cadre/reject",
            method: "PUT"
        },
        holdVnC: {
            path: "userstatuschange/%s/cadre/waitingforinfo",
            method: "PUT"
        },
        assignCadreForApproval: {
            path: "userstatuschange/cadre/assign",
            method: "POST"
        }
    },
    dashboard: {
        viewMessage: {
            path: "user/dashboard/inboxdetails/%s/",
            method: "GET"
        },
        notifications: {
            path: "user/dashboard/notificationslist/",
            method: "GET"
        },
        messageCount: {
            path: "user/dashboard/%s/taskscount/%s/",
            method: "GET"
        },
        tasksByAge: {
            path: "user/%s/taskreports/priorityagereports",
            method: "GET"
        },
        tasksTrendRPerMonth: {
            path: "user/dashboard/%s/taskstrendreportspermonth/%s/",
            method: "GET"
        },
        cadresTrendRPerMonth: {
            path: "user/dashboard/cadresandvolunteerstrendreportspermonth",
            method: "GET"
        },
        cadrePickedStatus: {
            path: "user/dashboard/%s/cadrespicked/%s/",
            method: "PUT"
        }
    },
    citizen: {
        viewCitizen: {
            path: "user/%s/requestDetails",
            method: "GET"
        },
        savePersonalInf: {
            path: "user/",
            method: "POST"
        },
        editPersonalInf: {
            path: "user/%s/",
            method: "PUT"
        },
        deletePersonalInf: {
            path: "user/%s/",
            method: "DELETE"
        },
        getPersonalInf: {
            path: "user/%s/",
            method: "GET"
        },
        saveWorkInf: {
            path: "user/%s/workinfo",
            method: "PUT"
        },
        editWorkInf: {
            path: "user/%s/workinfo",
            method: "PUT"
        },
        getWorkInf: {
            path: "user/%s/workinfo",
            method: "GET"
        },
        saveVoterInf: {
            path: "user/%s/voter",
            method: "POST"
        },
        editVoterInf: {
            path: "user/%s/voter",
            method: "PUT"
        },
        getVoterInf: {
            path: "user/%s/voter",
            method: "GET"
        },
        deleteVoterInf: {
            path: "user/%s/voter",
            method: "DELETE"
        },
        getVoterInfByText: {
            path: "lookup/%s/constituency",
            method: "GET"
        },
        saveResidentialAddress: {
            path: "user/%s/postaladdress",
            method: "POST"
        },
        editResidentialAddress: {
            path: "user/%s/postaladdress",
            method: "PUT"
        },
        getResidentialAddress: {
            path: "user/%s/postaladdress",
            method: "GET"
        },
        delete: {
            path: "user/%s/",
            method: "DELETE"
        },
        saveFamily: {
            path: "user/%s/relation",
            method: "POST"
        },
        editFamily: {
            path: "user/%s/relation",
            method: "PUT"
        },
        getFamily: {
            path: "user/%s/relation",
            method: "GET"
        },
        deleteFamily: {
            path: "user/%s/relation",
            method: "DELETE"
        },
        occupations: {
            path: "lookup/occupation/",
            method: "GET"
        },
        addressByPincode: {
            path: "lookup/address/%s/",
            method: "GET"
        },
        qualifications: {
            path: "lookup/qualification/",
            method: "GET"
        },
        careerAspirations: {
            path: "lookup/careeraspirations",
            method: "GET"
        },
        skillGaps: {
            path: "lookup/skillgaps",
            method: "GET"
        },
        quickRegistration: {
            path: "user/registration/self/quickreg",
            method: "POST"
        }
    },
    volunteer: {
        save: {
            path: "user/%s/volunteer",
            method: "POST"
        },
        edit: {
            path: "user/%s/volunteer",
            method: "PUT"
        },
        get: {
            path: "user/%s/volunteer",
            method: "GET"
        },
        delete: {
            path: "user/%s/volunteer",
            method: "DELETE"
        },
        areasIntrestedToVolunteer: {
            path: "lookup/interestedarea/",
            method: "GET"
        },
        category: {
            path: "lookup/volunteercategory/",
            method: "GET"
        },
        leads: {
            path: "lookup/volunteerleads",
            method: "GET"
        },
        isVolunteerIdExist: {
            path: "user/volunteercodeexists/%s",
            method: "GET"
        },
        performanceGrades: {
            path: "lookup/performancegrades",
            method: "GET"
        },
        volunteerSheet: {
            path: "user/%s/volunteerSheet",
            method: "GET"
        }
    },
    cadre: {
        save: {
            path: "user/%s/cadre",
            method: "POST"
        },
        edit: {
            path: "user/%s/cadre",
            method: "PUT"
        },
        get: {
            path: "user/%s/cadre",
            method: "GET"
        },
        delete: {
            path: "user/%s/cadre",
            method: "DELETE"
        },
        responsibityInParty: {
            path: "partypositions/",
            method: "POST"
        },
        partyPositions: {
            path: "lookup/partyposition/",
            method: "GET"
        },
        bloodGroups: {
            path: "lookup/bloodgroup",
            method: "GET"
        },
        cadreWorksheet: {
            path: "user/%s/cadreWorksheet",
            method: "GET"
        },
        isPartyMemberShipIdExist: {
            path: "user/partymemberidexists/%s",
            method: "GET"
        },
        leadersincadre: {
            path: "lookup/leadersincadre/",
            method: "GET"
        },
        cadres: {
            path: "lookup/cadres/%s/",
            method: "GET"
        }
    }
};
