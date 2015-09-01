define(['controllers/controllerModule', 'formValidation', 'validators/personalValidators', 'errorMessages/personalErrors', 'jquery', "messageHandler", 'notifications'],

    function(controllerModule, formValidation, validationMap, errorJson, $, messageHandler, notifications) {

        controllerModule.controller('personalController', ['$state', '$location', '$http', "appUrlService", "cdsService", '$scope', 'registerService', "$stateParams", "$sessionStorage", "appModalService", "$rootScope",
            function($state, $location, $http, appUrls, cdsService, $scope, registerService, $stateParams, $sessionStorage, appModalService, $rootScope) {

                var cdsSession = $sessionStorage.cds = $sessionStorage.cds || {};

                this.showLoader = false;
                this.showImage = true;

                var self = this,
                    FormStatus,
                    dataJson = {};


                self.isNotValidForm = false;

                handleUserEdit(cdsSession.currentUserId);

                $('#left-nav-mobile').change(function() {
                    $state.go('root.register.work');
                });

                registerService.getEducationOptions(function(resp) {
                    $scope.educationOptions = resp.data;
                });

                var self = this;

                self.watchForm = function() {
                    $scope.$watch('self.user', function(newVal) {
                        FormStatus = $scope.personal.$dirty;
                        console.log($scope.personal.$dirty);

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
                // $scope.$on('$locationChangeStart', function(event, next, current) {
                //     console.log(event);
                //     console.log(next);
                //     console.log(current);
                // });
                var config = {
                    initiate: true,
                    blurValidation: false,
                    htmlValidation: false,
                    submitValidForm: false,
                    runCallBack: false,
                };


                var formStack = formValidation.init("#personalRegistrationForm", validationMap, errorJson, config);

                $scope.$on("clearErrors", function() {
                    formStack.clearErrorClass(formStack, false);
                    self.isNotValid = false;
                });

                var fileObj = {};

                $(".mock-browse").on("click", function() {
                    $('#profilePhoto').trigger("click");
                });

                $('#profilePhoto').on('change', prepareUpload);

                function prepareUpload(event) {
                    var pathValue = $(this).val().replace("C:\\fakepath\\", "");
                    $(".mock-input").val(pathValue);
                    fileObj.name = event.target.name;
                    fileObj.value = event.target.files[0];
                }

                this.getGender = function(val) {
                    if (val == "F") {
                        cdsSession.gender = "female";
                    } else {
                        cdsSession.gender = "";
                    }
                }

                this.getAge = function(userDate) {

                    var selectedDate = userDate.split('/'),
                        birthDate = new Date(selectedDate[2], selectedDate[1], selectedDate[0]),
                        today = new Date(),
                        diff = today - birthDate,
                        age = Math.floor(diff / 31536000000);
                    cdsSession.age = age;
                    return age;
                }

                this.save = function() {

                    self.user.userId = cdsSession.currentUserId;

                    if (formStack.isValid) {

                        $http({
                            method: "PUT",
                            url: appUrls.updatePersonalInfo,
                            data: self.user
                        }).success(function(resp, status, headers, config) {

                            if (resp.status === "success") {
                                messageHandler.showInfoStatus(notifications.personal_successfulSave, ".status-message-wrapper");
                                setTimeout(function() {
                                    messageHandler.clearMessageStatus();
                                    cdsService.isMarried = self.user.maritalStatus;
                                    FormStatus = false;
                                    $state.go('root.profile.editprofile.work');
                                }, 3000);

                            } else {
                                messageHandler.showErrorStatus(resp.data.message, ".status-message-wrapper");
                                setTimeout(function() {
                                    messageHandler.clearMessageStatus();
                                }, 3000);
                            }

                        }).error(function(resp, status, headers, config) {
                            messageHandler.showErrorStatus(notifications.submissionError, ".status-message-wrapper");
                            setTimeout(function() {
                                messageHandler.clearMessageStatus();
                            }, 3000);
                        });

                        self.isNotValidForm = false;
                    } else {

                        self.isNotValidForm = true;
                    }

                };

                function handleUserEdit(currentUserId) {
                    self.showImage = false;
                    self.user = {};
                    registerService.getPersonalInfo(currentUserId, function(resp) {

                        $scope.dataJson = dataJson = resp.data;
                        self.user.firstName = dataJson.firstName;
                        self.user.middleName = dataJson.middleName;
                        self.user.lastName = dataJson.lastName;
                        self.user.loginId = dataJson.loginId;
                        self.user.aadharId = dataJson.aadharId;
                        self.user.gender = dataJson.gender;
                        self.user.dateOfBirth = dataJson.dateOfBirth;
                        self.user.mobileNumber = dataJson.mobileNumber;
                        self.user.phoneNumber = dataJson.phoneNumber;
                        self.user.emailId = dataJson.emailId;
                        self.user.skypeId = dataJson.skypeId;
                        self.user.maritalStatus = dataJson.maritalStatus || "Single";
                        self.user.educationId = dataJson.education.educationId;
                        cdsSession.isMarried = cdsService.isMarried = self.user.maritalStatus;
                        cdsSession.gender = dataJson.gender;
                        cdsSession.age = self.getAge(self.user.dateOfBirth);

                    });
                }

            }
        ]);

    });
