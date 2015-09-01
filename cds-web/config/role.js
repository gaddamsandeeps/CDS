var roleStateMap = {
    "Admin": ["Admin", "Profile"],
    "Citizen": ["Requests","Profile"],
    "Cadre": ["Dashboard", "Tasks", "Calendar","Requests","Profile"],
    "Office Executive": ["Dashboard", "Tasks", "Calendar", "Requests", "Registrants","Profile"],
    "Office Manager": ["Dashboard", "Tasks", "Calendar", "Requests", "Registrants","Profile"],
    "MP": ["Dashboard", "Tasks", "Calendar", "Requests", "Registrants","Profile"]
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
    },
    Profile : {
        name : "Profile",
        url : "/profile"
    }
};


 exports.getTopRole= function(appRoles) {
        var topRole, rolesArray = [];
        appRoles = appRoles || [];
        for (var i = 0; i < appRoles.length; i++) {
            rolesArray.push(appRoles[i].roleName);
        }

        if (rolesArray.indexOf("MP") > -1) {
            topRole = "MP";
        }else if(rolesArray.indexOf("Admin") > -1){
            topRole = "Admin";
        }else if (rolesArray.indexOf("Office Manager") > -1) {
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
    };

 exports.getPermittedModules= function(role) {

        var navArray = [];
        var roleStateArray = roleStateMap[role];

        for (var i = 0; i < roleStateArray.length; i++) {
            navArray.push(navItemsMaps[roleStateArray[i]]);
        }

        return navArray;
    };
