define(['controllers/controllerModule', 'formValidation', 'validators/voterValidators', 'errorMessages/voterErrors', "messageHandler", 'notifications'],

    function(controllerModule, formValidation, validationMap, errorJson, messageHandler, notifications) {

        controllerModule.controller('voterController', ['$rootScope', '$state', '$http', "appUrlService", "cdsService", '$scope', 'registerService', "$sessionStorage", "appModalService",
            function($rootScope, $state, $http, appUrls, cdsService, $scope, registerService, $sessionStorage, appModalService) {

                var self = this,
                    FormStatus,
                    dataJson = {};

                var cdsSession = $sessionStorage.cds = $sessionStorage.cds || {};
                self.user = {};

                handleGetVoter(cdsSession.currentUserId);
                this.searchVoter = function(votersearchtext) {
                    $rootScope.votersearchtext = votersearchtext;


                    voterModal = appModalService.init("voterSearchTemplate.html", "voterSearchController", $rootScope, {
                        class: "cadre-overlay"
                    })();

                    voterModal.result.then(function(objString) {
                        $scope.treeDataId = objString.treeDataId;
                        objString = objString.string.substring(0, objString.string.length - 1);

                        var valuesArray = objString.split(",");
                        var keys = ["Country:", "State:", "District:", "Mandal:", "Village:", "MP Constituency:", "Assembly Constitueny:", "Pincode:"];
                        var finalObjArray = [];
                        for (var i = 0; i < valuesArray.length; i++) {
                            var myarry = {};
                            myarry.key = keys[i];
                            myarry.value = valuesArray[i];
                            finalObjArray.push(myarry);
                        }
                        self.user.searchconst = "";
                        $scope.voterNodeObj = finalObjArray;
                    }, function() {
                        console.log('selObj');
                    });
                }
                var config = {
                    initiate: true,
                    blurValidation: false,
                    htmlValidation: false,
                    submitValidForm: false,
                    runCallBack: false
                };
                var formStack = formValidation.init("#voterRegistrationForm", validationMap, errorJson, config);
                self.watchForm = function() {
                    $scope.$watch('self.user', function(newVal) {
                        FormStatus = $scope.voter.$dirty;
                    });
                }
                $scope.$on('$stateChangeStart', function(e, next, current) {
                    if (FormStatus == true) {
                        e.preventDefault();
                        saveModal = appModalService.init("saveChangesTemplate.html", "saveChangesController", $rootScope, {
                            class: "cadre-overlay"
                        })();
                        saveModal.result.then(function() {
                            messageHandler.clearMessageStatus();
                            FormStatus = false;
                            $state.go(next.name);
                        });
                    }
                });
                this.save = function() {
                    console.log($scope.treeDataId);
                    if (formStack.isValid) {
                        if (!$scope.treeDataId) {
                            messageHandler.showErrorStatus("Please assign constituency by searching with city or town", ".status-message-wrapper");
                            setTimeout(function() {
                                messageHandler.clearMessageStatus();
                            }, 3000);
                            return;
                        }
                        var reqObj = {};

                        reqObj.voterCardId = self.user.voterCardId;
                        reqObj.treeDataId = $scope.treeDataId;
                        reqObj.addressLine1 = self.user.addressLine1;
                        reqObj.addressLine2 = self.user.addressLine2;
                        reqObj.voterId = self.user.voterId;
                        reqObj.userId = cdsSession.currentUserId;
                        console.log(reqObj.treeDataId);
                        $http({
                            method: dataJson.reqMethod,
                            url: dataJson.reqURL,
                            data: reqObj
                        }).success(function(resp, status, headers, config) {

                            if (resp.status == "success") {

                                messageHandler.showInfoStatus(notifications.voter_successfulSave, ".status-message-wrapper");
                                setTimeout(function() {
                                    messageHandler.clearMessageStatus();
                                    FormStatus = false;
                                    $state.go('root.profile.editprofile.address');
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

                    }

                }


                function generateParamObject(objString) {
                    objString = objString || "";

                    if (objString !== "") {
                        var keysArray = objString.split(",");
                        var finalArray = [];
                        for (var i = 0; i < keysArray.length; i++) {
                            keysObj = {}
                            var splitArray = keysArray[i].split(":");
                            keysObj.key = splitArray[0] + ":";
                            keysObj.value = splitArray[1];
                            finalArray.push(keysObj);
                        }
                        return finalArray;
                    }
                }

                function handleGetVoter(userId) {
                    registerService.getVoterInfo(userId, function(resp) {
                        dataJson = resp.data;
                        console.log(dataJson);
                        $scope.treeDataId = dataJson.treeDataId;
                        if (dataJson.voterId) {
                            dataJson.reqMethod = "PUT";
                            dataJson.reqURL = appUrls.updateVoterInfo;
                        } else {
                            dataJson.reqMethod = "POST";
                            dataJson.reqURL = appUrls.saveVoterInfo;
                        }


                        self.user.addressLine1 = dataJson.addressLine1;
                        self.user.addressLine2 = dataJson.addressLine2;
                        self.user.voterCardId = dataJson.voterCardId;
                        self.user.voterId = dataJson.voterId;
                        self.user.treeDataId = dataJson.treeDataId;
                        $scope.voterNodeObj = generateParamObject(dataJson.consituency);
                    });
                }



            }
        ]);

    });
