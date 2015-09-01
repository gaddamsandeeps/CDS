define(['controllers/controllerModule', "messageHandler", 'formValidation', 'validators/cadreVerifyValidators', 'errorMessages/cadreVerifyErrors'], function(controllerModule, messageHandler, formValidation, validationMap, errorJson) {

    controllerModule.controller('cadreVerificationController', ["$scope", "$http", "$modalInstance", "callerScope", "$rootScope", "dashboardService", "registerService", "appUrlService", "$timeout",

        function($scope, $http, $modalInstance, callerScope, $rootScope, dashboardService, registerService, appUrlService, $timeout) {

            var formStack,
                currentUserId = callerScope.currentUserId;

            $scope.showApprovedStatus = false;
            //$scope.user = {};


            registerService.getPartyPositionsOptions(function(resp) {
                $scope.partyPositionsOptions = resp.data;
            });

            registerService.getPerformanceGradeOptions(function(resp) {
                $scope.performanceGradeOptions = resp.data;
                $scope.user = $scope.user || {};
                $scope.user.performanceGradeId = 7;
            });


            dashboardService.getLeadCadres(function(resp) {
                $scope.loopobj = resp.data;
                var myresp = angular.copy(resp.data);
                angular.forEach(resp.data, function(value, key) {
                    myresp[key].nameid = value.firstName + " " + "(" + value.cadre.partyMembershipId + ")";
                });
                $scope.leadCadres = myresp;
            });

            dashboardService.getCadreDetails(function(resp) {

                $scope.user = {};
                $scope.user.partyMembershipId = resp.data.partyMembershipId;
                $scope.user.positionId = resp.data.partyDesigination.positionId;
                $scope.user.partyResponsibility = resp.data.partyResponsibility;
                $scope.user.performanceGradeId = resp.data.performanceGradeId;
            }, currentUserId);

            $scope.hideLeadInfo = true;
            $scope.showLeadInfo = function(cid) {
                angular.forEach($scope.loopobj, function(value, key) {
                    if (cid.cadre.cadreId === value.cadre.cadreId) {
                        $scope.hideLeadInfo = false;
                        // $scope.leadInfoName = value.firstName;
                        $scope.leadMobileNum = value.mobileNumber;
                        if (value.aadharId !== undefined) {
                            $scope.leadAadhar = value.aadharId;
                        } else {
                            $scope.leadAadhar = "Not Available";
                        }
                    } else if (cid.cadre.cadreId === undefined) {
                        $scope.hideLeadInfo = true;
                    }
                });
            }
            $modalInstance.rendered.then(function() {
                var config = {
                    initiate: true,
                    blurValidation: false,
                    htmlValidation: false,
                    submitValidForm: false,
                    runCallBack: true,
                    cb: $scope.approve
                };

                formStack = formValidation.init("#cadreVerifyForm", validationMap, errorJson, config);
            })

            $scope.approve = function() {

                if (formStack.isValid) {
                    var reqObj = {};

                    reqObj.cadre = {};
                    reqObj.cadre.positionId = $scope.user.positionId || null;
                    reqObj.cadre.partyMembershipId = $scope.user.partyMembershipId;
                    reqObj.cadre.partyResponsibility = $scope.user.partyResponsibility;
                    reqObj.cadre.performanceGradeId = $scope.user.performanceGradeId;
                    reqObj.cadre.reportsTo = $scope.user.reportsTo.cadre.cadreId || null;
                    reqObj.interestedAsCadre = "1";
                    reqObj.userId = currentUserId;

                    $http({
                        url: appUrlService.approveAsCadre,
                        method: "PUT",
                        data: reqObj
                    }).success(function(resp, textStatus, jqXHR) {
                        if (resp.status == "success") {
                            messageHandler.showInfoStatus("User cadre status is approved successfully", ".cadre-status-message");
                            $timeout(function() {
                                $modalInstance.dismiss("cancel");
                            }, 900);
                        } else {
                            messageHandler.showErrorStatus("Something went wrong. Please try again.", ".cadre-status-message");
                        }

                    }).error(function(jqXHR, textStatus, errorThrown) {

                        messageHandler.showErrorStatus("Something went wrong. Please try again.", ".cadre-status-message");
                    })

                }

                // var cadreVerMsgTracker = new messageHandler.msgTracker({
                //     containerId: "#cadreErrContainer",
                //     className: "cadre-verification-msg"
                // });



                // if (!$("#membershipId").val()) {
                //     cadreVerMsgTracker.showError("Party Membership id is required field.");
                //     return;
                // }

                // if (!$scope.user.reportsTo) {
                //     cadreVerMsgTracker.showError("Please select Reporting Lead.");
                //     return;
                // }

                // cadreVerMsgTracker.clearStatus();

            }

            $scope.reject = function() {

                var reqObj = {};
                reqObj.userId = currentUserId;
                reqObj.comment = $scope.user.rejectComment;

                $http({
                    url: appUrlService.rejectCadre,
                    method: "PUT",
                    data: reqObj
                }).success(function(resp, textStatus, jqXHR) {
                    if (resp.status === "success") {

                        messageHandler.showInfoStatus("Current Cadre approval is rejected.", ".cadre-status-message");
                        $timeout(function() {
                            $modalInstance.dismiss("cancel");
                        }, 900);

                    } else {

                        messageHandler.showErrorStatus("Something went wrong. Please try again.", ".cadre-status-message");
                    }
                }).error(function(jqXHR, textStatus, errorThrown) {
                    messageHandler.showErrorStatus("Something went wrong. Please try again.", ".cadre-status-message");
                })

            }


            $scope.ok = function(value, id) {
                $modalInstance.close();
            };

            $scope.cancel = function() {


                var reqObj = {};
                reqObj.userId = currentUserId;
                reqObj.comment = $scope.user.rejectComment;

                dashboardService.updateCadreStatus({
                    userId: currentUserId,
                    type: "cancelled"
                }, function(resp) {

                    console.log(resp);

                    $modalInstance.dismiss("cancel");


                });

            }

        }
    ]);

});
