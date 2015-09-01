define(['controllers/controllerModule', 'formValidation', 'validators/familyValidators', 'errorMessages/familyErrors', 'jquery', "messageHandler", 'notifications'],

    function(controllerModule, formValidation, validationMap, errorJson, $, messageHandler, notifications) {

        controllerModule.controller('familyController', ['$rootScope', '$state', '$http', "appUrlService", "cdsService", '$scope', 'registerService', "$sessionStorage", "appModalService",

            function($rootScope, $state, $http, appUrls, cdsService, $scope, registerService, $sessionStorage, appModalService) {

                var self = this,
                    FormStatus,
                    dataJson = {};
                self.isNotValidForm = false;

                var cdsSession = $sessionStorage.cds = $sessionStorage.cds || {};
                var reqMethod = "POST";
                var reqURL = appUrls.saveFamily;

                var currentUserId = cdsSession.currentUserId || "";

                handleGetFamily(currentUserId);

                var config = {
                    initiate: true,
                    blurValidation: false,
                    htmlValidation: false,
                    submitValidForm: false,
                    runCallBack: false,
                };

                registerService.getEducationOptions(function(resp) {
                    $scope.educationOptions = resp.data;
                });

                var formStack = formValidation.init("#familyRegistrationForm", validationMap, errorJson, config);
                self.watchForm = function() {
                    $scope.$watch('self.user', function(newVal) {
                        FormStatus = $scope.family.$dirty;
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
                this.backview = function(e) {
                    e.preventDefault();
                    $state.go("root.profile.editprofile.volunteer");
                }

                this.editChild = function(e, child) {
                    e.preventDefault();
                    var index = self.user.childData.indexOf(child);
                    if (index !== -1) {
                        // Updating
                        var childId = child.relationId;
                        var childrenArray = $scope.children;

                        if (childrenArray.length > 0) {

                            for (var i = 0; i < childrenArray.length; i++) {

                                if (childrenArray[i].relationId === childId) {
                                    $scope.contextChild = angular.copy(childrenArray[i]);
                                    voterModal = appModalService.init("familyChild.html", "childOverlayController", $scope, {
                                        class: "cadre-overlay"
                                    })();
                                }
                            }
                        }
                    } else {
                        //  Adding
                        $scope.contextChild = "";
                        voterModal = appModalService.init("familyChild.html", "childOverlayController", $scope, {
                            class: "cadre-overlay"
                        })();
                    }

                    voterModal.result.then(function(objChild) {
                        var relationId = objChild.relationId;
                        console.log(objChild);
                        if (index > -1) {
                            // Updating
                            self.user.childData[index] = objChild;
                        } else {
                            //  Adding
                            self.user.childData.push(objChild);
                        }
                    }, function() {
                        console.log('Something wrong!');
                    });

                }



                this.save = function() {

                    console.log(this.user);

                    if (formStack.isValid) {
                        if ($scope.relationId !== undefined) {
                            reqMethod = "PUT";
                            reqURL = appUrls.updateFamily
                        }
                        var spouseObj = {};

                        spouseObj.firstName = self.user.spouseData.firstName;
                        spouseObj.lastName = self.user.spouseData.lastName;
                        spouseObj.middleName = self.user.spouseData.middleName;
                        spouseObj.gender = self.user.spouseData.gender;
                        spouseObj.educationId = self.user.spouseData.education.educationId || "";

                        if (spouseObj.gender == 'M') {
                            spouseObj.relationType = "Husband";
                        } else {
                            spouseObj.relationType = "Wife";
                        }
                        spouseObj.marriageDate = self.user.spouseData.marriageDate;
                        spouseObj.dateOfBirth = self.user.spouseData.dateOfBirth;

                        spouseObj.userId = currentUserId;
                        spouseObj.relationId = $scope.relationId;

                        $http({
                            method: reqMethod,
                            url: reqURL,
                            data: spouseObj
                        }).success(function(resp, status, headers, config) {
                            if (resp.status == "success") {
                                messageHandler.showInfoStatus(notifications.family_successfulSave, ".status-message-wrapper");
                                setTimeout(function() {
                                    messageHandler.clearMessageStatus();
                                    FormStatus = false;
                                    $state.go('root.profile.editprofile.cadre');
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
                }

                function handleGetFamily(userId) {
                    registerService.getFamilyInfo(userId, function(resp) {
                        dataJson = resp.data;
                        self.user = {};
                        self.user.childData = [];
                        self.user.spouseData = {};
                        self.user.spouseData.gender = "O";
                        self.user.spouseData.education = {};
                        /*To show primary field*/
                        if (dataJson.length < 2 || !dataJson.length) {
                            // self.user.childData = [{}];
                        }

                        if (resp.status == "success") {
                            self.users = resp.data;

                            for (var i = 0; i < self.users.length; i++) {

                                if (self.users[i].relationType == "Wife" || self.users[i].relationType == "Husband") {
                                    $scope.relationId = self.users[i].relationId;
                                    self.user.spouseData = self.users[i];
                                } else {
                                    if (self.users[i].gender === "M") {
                                        self.users[i].gender = "Male";
                                    } else if (self.users[i].gender === "F") {
                                        self.users[i].gender = "Female";
                                    } else {
                                        self.users[i].gender = "Not to be disclosed";
                                    }
                                    self.user.childData.push(self.users[i]);
                                }
                            };
                            $scope.children = self.user.childData;

                        }

                    });

                }

            }
        ]);

    });
