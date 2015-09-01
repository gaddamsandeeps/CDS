define(['controllers/controllerModule', 'formValidation', 'validators/cadreValidators', 'errorMessages/cadreErrors', 'jquery', "messageHandler", 'notifications'],
    function(controllerModule, formValidation, validationMap, errorJson, $, messageHandler, notifications) {

        controllerModule.controller('cadreController', ['$state', '$http', "appUrlService", '$scope', 'registerService', "cdsService", "$sessionStorage", "$rootScope", "appModalService",


            function($state, $http, appUrls, $scope, registerService, cdsService, $sessionStorage, $rootScope, appModalService) {



                var cdsSession = $sessionStorage.cds = $sessionStorage.cds || {},
                    config,
                    dataJson = {},
                    formStack,
                    FormStatus,
                    self = this;

                self.user = {};
                self.user.cadre = {};
                self.isNotValidForm = false;

                handleGetCadre(cdsSession.currentUserId);

                config = {
                    initiate: true,
                    blurValidation: false,
                    htmlValidation: false,
                    submitValidForm: false,
                    runCallBack: false,
                };
                formStack = formValidation.init("#cadreRegistrationForm", validationMap, errorJson, config);

                registerService.getPartyPositionsOptions(function(resp) {
                    $scope.partyPositionsOptions = resp.data;

                });
                registerService.getPerformanceGradeOptions(function(resp) {
                    $scope.performanceGradeOptions = resp.data;
                });
                registerService.getBloodGroupOptions(function(resp) {
                    $scope.BloodGroupOptions = resp.data;
                });

                self.user = {};

                this.backview = function(e) {
                    e.preventDefault();
                    $state.go("root.profile.editprofile.family");
                }
                self.watchForm = function() {
                    $scope.$watch('self.user', function(newVal) {
                        FormStatus = $scope.cadre.$dirty;
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
                    self.user.userId = cdsService.getUserId();
                    if (formStack.isValid) {
                        self.user.userId = cdsSession.currentUserId;
                        $http({
                            method: dataJson.reqMethod,
                            url: dataJson.reqURL,
                            data: self.user
                        }).success(function(resp, status, headers, config) {
                            if (resp.status === "success") {
                                if (self.user.userId) {
                                    messageHandler.showInfoStatus(notifications.cadre_successfulSave, ".status-message-wrapper");
                                    setTimeout(function() {
                                        messageHandler.clearMessageStatus();
                                        FormStatus = false;
                                        $state.go("root.profileLookup", {
                                            citizenId: self.user.userId
                                        });
                                    }, 3000);
                                } else {
                                    messageHandler.showInfoStatus(notifications.cadre_successfulSave, ".status-message-wrapper");
                                    setTimeout(function() {
                                        messageHandler.clearMessageStatus();
                                        FormStatus = false;
                                        $state.go('root.profile');
                                    }, 3000);
                                }
                            } else {
                                messageHandler.showErrorStatus(resp.data.message, ".status-message-wrapper");
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

                        self.isNotValidForm = false;
                    } else {
                        self.isNotValidForm = true;

                    }
                }


                function handleGetCadre(userId) {

                    registerService.getCadreInfo(userId, function(resp) {
                        dataJson = resp.data;

                        if (dataJson.cadreId) {
                            dataJson.reqMethod = "PUT";
                            dataJson.reqURL = appUrls.updateCadre;
                        } else {
                            dataJson.reqMethod = "POST";
                            dataJson.reqURL = appUrls.saveCadre;
                        }
                        cdsService.getUserSession(function(resp) {

                            role = resp.data.user.appRoles;


                            if (role[role.length - 1].roleName == "Citizen" || role[role.length - 1].roleName == "Volunteer" || role[role.length - 1].roleName == "Cadre") {
                                console.log(resp.data);
                                self.disableFields = true;
                                self.showGrade = false;
                                self.hidePositionField = (self.user.cadre.positionId != "") ? false : true;
                                self.hideResponsibilityField = (self.user.cadre.partyResponsibility != null) ? false : true;
                            }
                            if (role[role.length - 1].roleName == "Office Manager" || role[role.length - 1].roleName == "Office Executive" || role[role.length - 1].roleName == "MP") {

                                self.disableFields = false;
                                self.showGrade = true;
                            }
                            if (role[role.length - 1].roleName == "Citizen" || role[role.length - 1].roleName == "Volunteer") {
                                self.cadreFields = false;
                                self.hideFields = true;
                                self.hideMembershipID = true;
                                self.trackInterest = function(interest) {
                                    self.hideFields = (interest == 1) ? false : true;
                                }
                                if (self.user.interestedAsCadre == 1) {
                                    self.hideFields = false;
                                }
                                self.trackMembership = function(membership) {
                                        self.hideMembershipID = (membership == 1) ? false : true;
                                    }
                                    // self.hidePositionField = (self.user.cadre.positionId != "") ? false : true;
                                    // self.hideResponsibilityField = (self.user.cadre.partyResponsibility != null) ? false : true;

                            } else {
                                self.hideFields = true;
                                self.cadreFields = true;
                            }

                        });

                        self.user.cadre = {};
                        self.user.interestedAsCadre = "1";

                        if (dataJson.citizen) {
                            self.user.healthInsurance = dataJson.citizen.healthInsurance;
                            self.user.lifeInsurance = dataJson.citizen.lifeInsurance;
                            self.user.bloodGroupId = dataJson.citizen.bloodGroup.bloodGroupId;
                            self.user.interestedAsCadre = dataJson.citizen.interestedAsCadre;
                        }
                        self.user.cadre.haveMembership = dataJson.haveMembership;
                        self.user.cadre.positionId = dataJson.partyDesigination.positionId || "";
                        self.user.cadre.partyMembershipId = dataJson.partyMembershipId;
                        self.user.cadre.partyResponsibility = dataJson.partyResponsibility;
                        self.user.cadre.performanceGradeId = dataJson.performanceGradeId;

                    });
                }
            }
        ]);

    });
