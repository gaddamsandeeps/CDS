define(['controllers/controllerModule', 'jquery', 'notifications'], function(controllerModule, $, notifications) {

    controllerModule.controller('profileController', ["$stateParams", '$state', '$http', "appUrlService", "cdsService", '$scope', "roleService", "$window", "$sessionStorage", "appModalService",
        function($stateParams, $state, $http, appUrlService, cdsService, $scope, roleService, $window, $sessionStorage, appModalService) {


            var self = this,
                currentCitizenId = $stateParams.citizenId,
                children = [],
                spouse = [],
                regConfModalConfig = {
                    keyboard: true,
                    class: "registration-confirm-overlay",
                    backdrop: true
                },
                cdsSession = $sessionStorage.cds = $sessionStorage.cds || {};


            $scope.component = "viewProfile";

            $scope.overlay_title = notifications.profile_img_update_title;
            $scope.overlay_sucess_msg = "";
            $scope.upload_sucess_msg = notifications.img_update_succ_msg;


            $scope.currentProfileImage = "img-placeholder.jpg";
            cdsService.getProfileInfo(currentCitizenId, initiateProfile);


            function generateParamObject(objString) {
                objString = objString || "";
                var keysArray = objString.split(",");
                var keysObj = {};
                for (var i = 0; i < keysArray.length; i++) {
                    var splitArray = keysArray[i].split(":");
                    keysObj[splitArray[0]] = splitArray[1];
                }
                return keysObj;
            }

            function initiateProfile(resp) {
                if (resp.data) {
                    if (resp.data.gender == "M") {
                        resp.data.gender = "MALE";
                    } else if (resp.data.gender == "F") {

                        resp.data.gender = "FEMALE";
                    } else {
                        resp.data.gender = "NOT DISCLOSED";
                    }


                    self.user = resp.data;
                    self.user.cadre.citizen.healthInsurance = ((self.user.cadre.citizen.healthInsurance == 0) ? "No" : "Yes");
                    self.user.cadre.citizen.lifeInsurance = ((self.user.cadre.citizen.lifeInsurance == 0) ? "No" : "Yes");
                    self.user.volunteer.citizen.interestedAsVolunteer = ((self.user.volunteer.citizen.interestedAsVolunteer == 0) ? "No" : "Yes");
                    if (resp.data.voter !== undefined) {

                        $scope.voterNodeObj = generateParamObject(resp.data.voter.consituency);
                    }

                    var relData = resp.data.tblCitizenRelation;

                    angular.forEach(relData, function(value, key) {
                        if (relData[key].gender == "M") {
                            relData[key].gender = "Male";
                        } else if (relData[key].gender == "F") {
                            relData[key].gender = "Female";
                        } else {
                            relData[key].gender = "Not to be Disclosed";
                        }
                        if (value.relationType === "Wife" || value.relationType === "Husband") {
                            spouse = relData[key];

                        } else {
                            children.push(relData[key]);
                        }
                    });

                    $scope.children = children;
                    $scope.spouse = spouse;
                    $scope.currentProfileImage = resp.data.photograph;
                    self.user.photograph = self.user.photograph || "img-placeholder.jpg";
                }


            }
            self.navEditProfile = function($event) {

                cdsSession.currentUserId = $stateParams.citizenId;

                var choice = $event.target.attributes.id.value;

                switch (choice) {
                    case 'personal':
                        $state.go('root.profile.editprofile.personal');
                        break;
                    case 'work':
                        $state.go('root.profile.editprofile.work');
                        break;
                    case 'voter':
                        $state.go('root.profile.editprofile.voter');
                        break;
                    case 'address':
                        $state.go('root.profile.editprofile.address');
                        break;
                    case 'volunteer':
                        $state.go('root.profile.editprofile.volunteer');
                        break;
                    case 'family':
                        $state.go('root.profile.editprofile.family');
                        break;
                    case 'cadre':
                        $state.go('root.profile.editprofile.cadre');
                        break;

                }
            }

            self.showImageUpdateOverlay = function() {

                var registerModel = appModalService.init("registerOverlay.html", "registerOverlayController", $scope, regConfModalConfig)();


            }

        }
    ]);

});
