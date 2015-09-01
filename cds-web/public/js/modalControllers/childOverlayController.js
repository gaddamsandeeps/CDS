define(['controllers/controllerModule', 'formValidation', 'validators/familyValidators', 'errorMessages/familyErrors',
        'jquery', "messageHandler", 'notifications'
    ],

    function(controllerModule, formValidation, validationMap, errorJson, $, messageHandler, notifications) {

        controllerModule.controller('childOverlayController', ["$scope", "$modalInstance", "$rootScope", "callerScope",
            "registerService", "appUrlService", "$sessionStorage", "$http", "cdsService",

            function($scope, $modalInstance, $rootScope, callerScope, registerService,
                appUrls, $sessionStorage, $http, cdsService) {

                var child = callerScope.contextChild,
                cdsSession = $sessionStorage.cds = $sessionStorage.cds || {},
                currentUserId = cdsSession.currentUserId || "";

                registerService.getEducationOptions(function(resp) {
                    $scope.educationOptions = resp.data;
                });

                if (child.gender === "Male") {
                    child.gender = "M";
                } else if (child.gender === "Female") {
                    child.gender = "F";
                } else {
                    child.gender = "O";
                }
                $scope.child = child || {};
                $scope.child.gender = $scope.child.gender || "O";

                var formStack;
               
                $modalInstance.rendered.then(function() {

                    var config = {
                        initiate: true,
                        blurValidation: false,
                        htmlValidation: false,
                        submitValidForm: false,
                        runCallBack: true,
                        cb: $scope.ok
                    };

                    formStack = formValidation.init("#childFormEdit", validationMap, errorJson, config);
                });

                $scope.ok = function() {

                    if (formStack.isValid) {
                        var childObj = {},
                            reqMethod = "",
                            reqURL = "";

                        if ($scope.child.relationId !== undefined) {
                            reqMethod = "PUT";
                            reqURL = appUrls.updateFamily;

                            childObj.relationId = $scope.child.relationId;
                        } else {
                            reqMethod = "POST";
                            reqURL = appUrls.saveFamily;
                        }


                        childObj.userId = currentUserId;
                        childObj.relationType = "Kid";
                        childObj.firstName = $scope.child.firstName;
                        childObj.middleName = $scope.child.middleName;
                        childObj.lastName = $scope.child.lastName;
                        childObj.gender = $scope.child.gender;
                        childObj.dateOfBirth = $scope.child.dateOfBirth;
                        childObj.educationId = $scope.child.educationId || "";

                        $http({
                            method: reqMethod,
                            url: reqURL,
                            data: childObj
                        }).success(function(resp, status, headers, config) {
                            if (reqMethod === "POST") {
                                childObj.relationId = resp.data.relationId;
                            }
                            if (resp.data.gender === "M") {
                                childObj.gender = "Male";
                            } else if (childObj.gender === "F") {
                                childObj.gender = "Female";
                            } else {
                                childObj.gender = "Not to be disclosed";
                            }

                            childObj.dateOfBirth = resp.data.dateOfBirth;

                            // educationId 2
                            angular.forEach($scope.educationOptions, function(value, key) {
                                if (value.educationId === resp.data.educationId) {
                                    childObj.education = {};
                                    childObj.education.educationId = value.educationId;
                                    childObj.education.qualification = value.qualification;
                                }
                            });
                            $modalInstance.close(childObj);
                        }).error(function(data, status, headers, config) {
                            
                        });

                    }

                };

                $scope.cancel = function() {
                    $scope.showNoRecordsMsg = false;
                    $modalInstance.dismiss("cancel");
                };

            }
        ]);

    });