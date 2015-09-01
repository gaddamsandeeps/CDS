define(['controllers/controllerModule', 'formValidation', 'validators/workValidators', 'errorMessages/workErrors', 'jquery', "messageHandler", 'notifications'],

    function(controllerModule, formValidation, validationMap, errorJson, $, messageHandler, notifications) {

        controllerModule.controller('workController', ['$state', '$http', "appUrlService", "cdsService", '$scope', 'registerService', "$sessionStorage", "appModalService", "$rootScope",
            function($state, $http, appUrls, cdsService, $scope, registerService, $sessionStorage, appModalService, $rootScope) {

                var self = this,
                    FormStatus,
                    dataJson = {};

                var cdsSession = $sessionStorage.cds = $sessionStorage.cds || {};

                handleUserEdit(cdsSession.currentUserId);

                this.age = cdsSession.age;
                this.gender = cdsSession.gender;
                var config = {
                    initiate: false,
                    blurValidation: false,
                    htmlValidation: false,
                    submitValidForm: false,
                    runCallBack: false,
                };
                var formStack = formValidation.init("#workRegistrationForm", validationMap, errorJson, config);

                registerService.getOccupationOptions(function(resp) {
                    $scope.occupationOptions = resp.data;
                });

                registerService.getCareerAspirationOptions(function(resp) {
                    $scope.careerAspirationOptions = resp.data;
                });
                registerService.getSkillGapsOptions(function(resp) {
                    $scope.skillGapsOptions = resp.data;
                });
                self.watchForm = function() {
                    $scope.$watch('self.user', function(newVal) {
                        FormStatus = $scope.work.$dirty;
                        console.log($scope.work.$dirty);

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

                $scope.othershow = true;
                this.others = function(othersvalue) {
                    $scope.othershow = true;
                    var others = othersvalue - 1;
                    var careerAspirationId = $scope.careerAspirationOptions[$scope.careerAspirationOptions.length - 1].careerAspirationId;

                    if (othersvalue === careerAspirationId) {
                        $scope.othershow = false;
                    }
                }

                /*      registerService.getAreaOfImprovements(function(resp){               
                            $scope.areaOfImprovements = resp.data;          
                        });
                        */

                this.save = function() {

                    if (formStack.isValid) {
                        self.user.userId = cdsSession.currentUserId;
                        if (dataJson.additionalInfo) {
                            self.user.careerAspiration = self.user.userAdditionalInfo.careerAspiration;
                        }
                        $http({
                            method: "PUT",
                            url: appUrls.updateWorkInfo,
                            data: self.user
                        }).success(function(resp, status, headers, config) {

                            if (resp.status === "success") {

                                messageHandler.showInfoStatus(notifications.work_successfulSave, ".status-message-wrapper");
                                setTimeout(function() {
                                    messageHandler.clearMessageStatus();
                                    FormStatus = false;
                                    $state.go('root.profile.editprofile.voter');
                                }, 3000);


                            } else {
                                messageHandler.showErrorStatus(notifications.submissionError, ".status-message-wrapper");
                                setTimeout(function() {
                                    messageHandler.clearMessageStatus();
                                }, 3000);

                            }


                            console.log("success");



                        }).error(function(data, status, headers, config) {

                            messageHandler.showErrorStatus(errorJson.submissionError, ".status-message-wrapper");
                            setTimeout(function() {
                                messageHandler.clearMessageStatus();
                            }, 3000);


                        });
                    }
                }

                function handleUserEdit(currentUserId) {
                    self.user = {};
                    registerService.getWorkInfo(currentUserId, function(resp) {
                        dataJson = resp.data;
                        self.user.occupationId = dataJson.occupation.occupationId;
                        self.user.workingOrganization = dataJson.workingOrganization;
                        self.user.workingLocation = dataJson.workingLocation;

                        if (dataJson.additionalInfo && dataJson.additionalInfo.length) {
                            self.user.userAdditionalInfo = {};
                            self.user.userAdditionalInfo.careerAspirationId = dataJson.additionalInfo[0].careerAspirations.careerAspirationId;
                            if (dataJson.additionalInfo[0].careerAspirations.careerAspirationName === 'Others') {
                                $scope.othershow = false;
                            }
                            self.user.userAdditionalInfo.careerAspiration = dataJson.additionalInfo[0].careerAspiration;
                            self.user.userAdditionalInfo.skillGapsId = dataJson.additionalInfo[0].skillGaps.skillGapId;
                            self.user.userAdditionalInfo.skillLevel = dataJson.additionalInfo[0].skillLevel;
                            self.user.userAdditionalInfo.leadershipPotential = dataJson.additionalInfo[0].leadershipPotential;
                        }


                    });
                }


            }
        ]);

    });
