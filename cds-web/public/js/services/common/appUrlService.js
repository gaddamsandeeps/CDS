define(['services/serviceModule'], function(serviceModule) {

    serviceModule.factory('appUrlService', [function() {
        return {



            signin: "/signin",
            getUserSession: "/auth/user/getuserfromsession",

            //Create User module

            savePersonalInfo: '/auth/citizen/savepersonalinf',
            saveWorkInfo: "/citizen/saveworkinf",
            saveVoterInfo: "/auth/citizen/savevoterinf",
            saveresidentialaddress: "/auth/citizen/saveresidentialaddress",
            saveVolunteer: "/auth/volunteer/save",
            saveFamily: "/auth/citizen/saveFamily",
            saveCadre: "/auth/cadre/save",


            updatePersonalInfo: '/auth/citizen/editpersonalinf',
            updateWorkInfo: "/auth/citizen/editworkinf",
            updateVoterInfo: "/auth/citizen/editvoterinf",
            updateResidentialAddress: "/auth/citizen/editresidentialaddress",
            updateVolunteer: "/auth/volunteer/edit",
            updateFamily: "/auth/citizen/editfamily",
            updateCadre: "/auth/cadre/edit",
            updateProfileImage: "/user/updateProfileImage",

            changePwd: "/auth/user/resetpassword",
            forgotpwd: "/user/forgotpwd",

            quickReg: "/citizen/quickregistration",

            //View & Edit & Retrieve member info

            getUserList: "/auth/user/usersList",
            getUserTypes: "/user/userTypes",
            getUserView: "/user/view",
            getUserPersonalInfo: "/auth/citizen/getpersonalinf",
            getUserWorkInfo: "/auth/citizen/getworkinf",
            getUserVoterInfo: "/auth/citizen/getvoterinf",
            getUserAddressInfo: "/auth/citizen/getresidentialaddress",
            getUserVolunteerInfo: "/auth/volunteer/get",
            getUserFamilyInfo: "/auth/citizen/getfamily",
            getUserCadreInfo: "/auth/cadre/get",

            getLeadCadres: "/auth/cadre/cadreleads",

            getProfileInfo: "/auth/user/viewuserinfo",



            getUserAvailability: "/user/isuserexist",
            getMobileAvailability: "/user/ismobileexist",
            getEmailAvailability: "/user/isemailexist",



            getEducationOptions: "/citizen/qualifications",
            getOccupationOptions: "/citizen/occupations",

            getInterestedAreasInfo: "/volunteer/interestedAreasToVolunteer",

            getPartyPositionsInfo: "/cadre/partyPositions",
            getBloodGroupsInfo: "/cadre/bloodgroups",
            getAddress: "/citizen/address",
            getConstituencyInfo: "/citizen/getvoterinfbytext",

            getVolunteerCategoryInfo: "/volunteer/volunteercategory",
            getLeadInfo: "/volunteer/volunteerleads",
            getPerformanceGradeInfo: "/volunteer/performancegrades",
            getCareerAspirationOptions: "/citizen/careeraspirations",
            getSkillGapsOptions: "/citizen/skillgaps",

            getTaskCategories: "/user/taskcategories",
            saveTaskInfo: "/auth/user/createtask",
            getTasksList: "/auth/user/tasks",
            getCadreLeads: "/auth/cadre/cadreleads",
            getTaskPriorities: "/user/taskpriority",
            getCadreList: "/auth/cadre/cadres",

            //get PrimeId
            getPrimeIdList: "auth/user/primeids",

            getTasksByAge: "/auth/dashboard/tasksByAge",
            getTasksByTrend: "/auth/dashboard/tasksTrendRPerMonth",

            getTaskDetails: "/auth/user/taskdetails",
            getTeamTasks: "/auth/user/teamtasks",
            getAllTasks: "/auth/user/tasks",
            getTaskStatuses: "/user/statuses",
            getMyTasksList: "/auth/user/assignedtasks",
            deleteTask: "/auth/user/deletetask",
            updateTask: "/auth/user/updatetasksstatus",
            getTaskState: "/auth/dashboard/messageCount",

            getsupervisorAllTasks: "/auth/user/tasksforsupervisor",

            deleteUser: "/volunteer/delete",

            /*Office executive*/

            getCadreVerifications: "/auth/office/vnc/verificationlist",


            /*dashboard*/
            getNotificationDetails: "/auth/dashboard/viewMessage",
            getNotifications: "/auth/dashboard/notifications",
            addCommentToTask: "/auth/user/addcommenttotask",
            updateCadreStatus: "/auth/dashboard/cadrepickedstatus",
            approveAsCadre: "/auth/office/vnc/approve",
            rejectCadre: "/auth/office/vnc/reject",
            cancelCadre: "/auth/dashboard/cadrepickedstatus",
            getMembershipTrend: "/auth/dashboard/cadrestrendrpermonth",
            deleteCitizen: "/auth/citizen/delete"
        };

    }]);



});
