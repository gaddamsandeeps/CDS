define(['controllers/controllerModule', 'formValidation', 'validators/volunteerValidators', 'errorMessages/volunteerErrors', 'jquery', "messageHandler", 'notifications'],
    function(controllerModule, formValidation, validationMap, errorJson, $, messageHandler, notifications) {

        controllerModule.controller('volunteerController', ['$state', '$http', "appUrlService", '$scope', 'registerService', "cdsService", "$sessionStorage", "appModalService", "$rootScope",

            function($state, $http, appUrls, $scope, registerService, cdsService, $sessionStorage, appModalService, $rootScope) {


                var self = this,
                    dataJson,
                    cdsSession,
                    config,
                    formStack,
                    FormStatus,
                    role;

                self.isNotValidForm = false;

                cdsSession = $sessionStorage.cds = $sessionStorage.cds || {};


                handleUserEdit(cdsSession.currentUserId);

                config = {
                    initiate: true,
                    blurValidation: false,
                    htmlValidation: false,
                    submitValidForm: false,
                    runCallBack: false,
                };


                formStack = formValidation.init("#volunteerRegistrationForm", validationMap, errorJson, config);

                registerService.getInterestedAreasOptions(function(resp) {
                    $scope.interestedAreasOptions = resp.data;
                });
                registerService.getVolunteerCategoryOptions(function(resp) {
                    $scope.volunteerCategoryOptions = resp.data;
                });
                registerService.getLeadOptions(function(resp) {
                    $scope.leadOptions = resp.data;
                });
                registerService.getPerformanceGradeOptions(function(resp) {
                    $scope.performanceGradeOptions = resp.data;
                });



                this.backview = function(e) {
                    e.preventDefault();
                    $state.go("root.profile.editprofile.address");
                }
                self.watchForm = function() {
                    $scope.$watch('self.user', function(newVal) {
                        FormStatus = $scope.volunteer.$dirty;
                    });
                }
                $scope.$on('$stateChangeStart', function(e, next, current) {
                    if (FormStatus == true) {
                        e.preventDefault();
                        saveModal = appModalService.init("saveChangesTemplate.html", "saveChangesController", $rootScope, {
                            class: "cadre-overlay"
                        })();
                        saveModal.result.then(function() {
                            FormStatus = false;
                            $state.go(next.name);
                        });
                    }
                });
                this.save = function() {


                    if (formStack.isValid) {

                        var requestObj = {};

                        requestObj.interestedAsVolunteer = self.user.citizen.interestedAsVolunteer;
                        requestObj.volunteerInterestedAreas = [];
                        if (self.user.interestedAreas >= 1) {
                            requestObj.volunteerInterestedAreas[0] = {
                                interestId: self.user.interestedAreas
                            };
                        }
                        requestObj.volunteer = {
                            "volunteerId": self.user.volunteerId,
                            "volunteerCategoryId": self.user.volunteerCategoryId,
                            "volunteerLeadId": self.user.volunteerLeadId,
                            "volunteerCodeNumber": self.user.volunteerCodeNumber,
                            "performanceGradeId": self.user.performanceGradeId
                        };
                        requestObj.userId = cdsSession.currentUserId;


                        $http({
                            method: dataJson.reqMethod,
                            url: dataJson.reqUrl,
                            data: requestObj
                        }).success(function(resp, status, headers, config) {

                            if (resp.status == "success") {

                                messageHandler.showInfoStatus(notifications.volunteer_successfulSave, ".status-message-wrapper");
                                setTimeout(function() {
                                    messageHandler.clearMessageStatus();
                                    FormStatus = false;
                                    $state.go('root.profile.editprofile.family');
                                }, 3000);



                            } else {
                                messageHandler.showErrorStatus(notifications.submissionError, ".status-message-wrapper");
                                setTimeout(function() {
                                    messageHandler.clearMessageStatus();
                                }, 3000);

                            }
                        }).error(function(data, status, headers, config) {
                            messageHandler.showErrorStatus(notifications.submissionError, ".status-message-wrapper");
                            setTimeout(function() {
                                messageHandler.clearMessageStatus();
                            }, 3000);
                        });

                    } else {
                        self.isNotValidForm = true;
                    }



                };

                function handleUserEdit(userId) {

                    registerService.getVolunteerInfo(userId, function(resp) {

                        dataJson = resp.data;
                        if (resp.data.volunteerId) {
                            dataJson.reqMethod = "PUT";
                            dataJson.reqUrl = appUrls.updateVolunteer;
                        } else {
                            dataJson.reqMethod = "POST";
                            dataJson.reqUrl = appUrls.saveVolunteer;
                        }

                        cdsService.getUserSession(function(resp) {
                            console.log(resp.data);
                            role = resp.data.user.appRoles;
                            console.log(role);
                            if (role[role.length - 1].roleName == "Citizen") {
                                if (self.user.citizen.interestedAsVolunteer == "0") {
                                    self.hideInterestedAreas = true;
                                } else {
                                    self.hideInterestedAreas = false;
                                }

                            };
                            console.log(self.user.volunteerLeadId);
                            if (role[role.length - 1].roleName == "Citizen" || role[role.length - 1].roleName == "Volunteer" || role[role.length - 1].roleName == "Cadre") {

                                self.disableFields = true;
                                self.showGrade = false;
                                self.hideVolunteerID = (self.user.volunteerCodeNumber != null) ? false : true;
                                self.hideVolunteerCategory = (self.user.volunteerCategoryId == 0) ? true : false;
                                self.hideVolunteerLead = (self.user.volunteerLeadId == 0) ? true : false;
                                self.trackInterest = function(interest) {
                                    self.hideInterestedAreas = (interest == 1) ? false : true;
                                }
                                if (self.user.citizen.interestedAsVolunteer == 0) {
                                    self.hideInterestedAreas = true;
                                }
                            }

                            if (role[role.length - 1].roleName == "Office Manager" || role[role.length - 1].roleName == "Office Executive" || role[role.length - 1].roleName == "MP") {
                                self.disableFields = false;
                                self.showGrade = true;
                            }



                        });

                        self.user = {};

                        self.user = resp.data;


                        self.user.interestedAreas = resp.data.volunteerInterestedAreas[0].interestId;
                        self.user.volunteerCategoryId = resp.data.volunteerCategory.voluteerCatergoryId;
                        self.user.volunteerLeadId = resp.data.volunteerLeadId;

                    });


                }





            }
        ]);

    });
