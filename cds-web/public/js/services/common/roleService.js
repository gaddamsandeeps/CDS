define(['services/serviceModule'], function(serviceModule) {
    serviceModule.factory('roleService', ['$http',
        function($http) {


            var roleStateMap = {
                "Admin": ["Admin"],
                "Citizen": ["Requests"],
                "Cadre": ["Dashboard", "Tasks", "Calendar", "Requests"],
                "Office Executive": ["Dashboard", "Tasks", "Calendar", "Requests", "Registrants"],
                "Office Manager": ["Dashboard", "Tasks", "Calendar", "Requests", "Registrants"],
                "MP": ["Dashboard", "Tasks", "Calendar", "Requests", "Registrants"]
            }


            var navItemsMaps = {
                Admin:{
                    name:"Admin",
                    url:"/admin"
                },
                Dashboard: {
                    name: "Dashboard",
                    url: "/dashboard"
                },
                Tasks: {
                    name: "Tasks",
                    url: "/tasks"
                },
                Calendar: {
                    name: "Calendar",
                    url: "#"
                },
                Requests: {
                    name: "Requests",
                    url: "/requests"
                },
                Registrants: {
                    name: "Registrants",
                    url: "/profile#/list"
                }
            };



            var privilegeMap = {

                /*Non secured pages - Home*/

                "all": ["root.home",
                    "root.homeDot",
                    "root.knowyourmp",
                    "root.parliament",
                    'root.aboutconstituency',
                    'root.vision',
                    'root.initiatives',
                    'root.gallery',
                    'root.contactus',

                    /*Non secured pages - Signin*/

                    'root.signin',
                    'root.forgotpassword',
                    "root.nullsession",

                    /*Non secured pages - Register*/


                    "root.register"
                ],


                /*Secured pages - Profile*/

                "P1120": ["root.profile",
                    "root.profile.editprofile.personal",
                    /*"root.profile.editprofile.work",*/
                    "root.profile.editprofile.voter",
                    "root.profile.editprofile.address",
                    "root.profile.editprofile.volunteer",
                    "root.profile.editprofile.family",
                    "root.profile.editprofile.cadre"
                ],

                "P1101": ["root.profileLookup",
                        "root.profile.list"
                ],
                "P1122": ["root.profile.memberdashboard"],

                /*Secured pages - Dashboard*/

                "P1010": ["root.dashboard"],


                /*Secured pages - Requests*/

                "P1047": ["root.requests",
                    "root.viewRequest",
                    "root.addRequest"
                ],

                /*Secured pages - Tasks*/
                "P1038": ["root.tasks",
                    "root.viewTasks",
                    "root.addTask",
                    "root.teamTasks",
                    "root.allTasks"
                ],
                "P1039":["root.supervisorviewAllTasks"]
            };

            return {
                getInitialState: function(role) {
                    switch (role) {
                        case "citizen":
                            return "citizen";
                            break;
                        default:
                            return "default";
                    }
                },

                checkValidModule: function(state, privilegeStateArray) {

                    for (var i = 0; i < privilegeStateArray.length; i++) {

                        if (privilegeStateArray[i] == state) {
                            return true;
                            break;
                        }
                    }

                    return;
                },


                getPrivilegeStateArray: function(privilegeArray) {
                    var privilegeStateArray = [];
                    for (var i = 0; i < privilegeArray.length; i++) {
                        if (privilegeMap[privilegeArray[i].privilegeCode]) {
                            privilegeStateArray = privilegeStateArray.concat(privilegeMap[privilegeArray[i].privilegeCode]);
                        }
                    }
                    return privilegeStateArray.concat(privilegeMap.all);
                },

                getTopRole: function(appRoles) {
                    var topRole, rolesArray = [];
                    appRoles = appRoles || [];

                    for (var i = 0; i < appRoles.length; i++) {
                        rolesArray.push(appRoles[i].roleName);
                    }

                    console.log(rolesArray);

                    if (rolesArray.indexOf("MP") > -1) {
                        topRole = "MP";
                    }else if(rolesArray.indexOf("Admin") > -1){
                        topRole = "Admin";
                    } else if (rolesArray.indexOf("Office Manager") > -1) {
                        topRole = "Office Manager";
                    } else if (rolesArray.indexOf("Office Executive") > -1) {
                        topRole = "Office Executive";
                    } else if (rolesArray.indexOf("Cadre") > -1) {
                        topRole = "Cadre";
                    } else if (appRoles.roleName === "Volunteer") {
                        topRole = "Volunteer";
                    } else {
                        topRole = "Citizen";
                    }
                    return topRole;
                },

                getNavArray: function(role) {


                    var navArray = [];
                    var roleStateArray = roleStateMap[role];

                    for (var i = 0; i < roleStateArray.length; i++) {
                        navArray.push(navItemsMaps[roleStateArray[i]]);
                    }

                    return navArray;
                }

            };
        }
    ]);
});