define(['controllers/controllerModule'], function(controllerModule) {

    controllerModule.controller('headerController', ["$state", '$rootScope', '$http', '$location', 'cdsService', "roleService", "$sessionStorage",
        function($state, $rootScope, $http, $location, cdsService, roleService, $sessionStorage) {

            var self = this;
            self.showHeader = false;

            var cdsSession = $sessionStorage.cds = $sessionStorage.cds || {};

            cdsService.getUserSession(initiateUserSession);

            function initiateUserSession(resp) {

                self.showHeader = true;
                cdsService.userInfo = resp.data.user;
                if (resp.status == "failure") {
                    self.isUserAuthenticated = false;
                    return;
                }
                self.isUserAuthenticated = true;

                self.ifAdmin = true;

                $rootScope.userName = resp.data.user.citizen.firstName;
                $rootScope.appUserIds = resp.data.user.appUserId;
                var defRole = $rootScope.defRole = roleService.getTopRole(resp.data.user.appRoles);

                (defRole === "Admin") ? self.ifAdmin = false : true;

                self.navItems = roleService.getNavArray(defRole);
                for (var i = 0; i < self.navItems.length; i++) {
                    self.navItems[i].activeHeader = false;
                    if (location.href.toLowerCase().indexOf(self.navItems[i].name.toLowerCase()) > -1) {
                        self.navItems[i].activeHeader = true;
                    }
                }

                $rootScope.$broadcast('userAuthenticated', defRole);
            }


            self.navEditProfile = function() {
                cdsSession.currentUserId = "";
                window.location.href = "/profile#edit/personal";

                if (!cdsSession.currentUserId && $state.current.name == "root.profile.editprofile.personal") {
                    $state.reload();
                }

            }


            self.viewSelfProfile = function() {
                cdsSession.currentUserId = "";
                window.location.href = "/profile#/";

            }
            self.navChangePwd = function() {
                cdsSession.currentUserId = "";
                window.location.href = "/profile#changepassword";
            }

        }
    ]);

});
