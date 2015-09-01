define(['controllers/controllerModule', 'formValidation', 'validators/addressValidators', 'errorMessages/addressErrors', "messageHandler", 'notifications'],
    function(controllerModule, formValidation, validationMap, errorJson, messageHandler, notifications) {

        controllerModule.controller('addressController', ['$state', '$http', "registerService", "appUrlService", "cdsService", "$scope", "$sessionStorage", "$rootScope", "appModalService",
            function($state, $http, registerService, appUrls, cdsService, $scope, $sessionStorage, $rootScope, appModalService) {
                var self = this,
                    FormStatus,
                    dataJson = {};
                self.user = {};
                self.user.postalAddressId = "";
                self.hideAddrFields = true;

                $scope.voterNodeObj = {};
                var cdsSession = $sessionStorage.cds = $sessionStorage.cds || {};

                handleUserEdit(cdsSession.currentUserId);

                this.searchAddress = function(addrsearchtext) {

                    $rootScope.addrsearchtext = addrsearchtext;
                    addressModal = appModalService.init("addressSearchTemplate.html", "addressSearchController", $rootScope, {
                        class: "cadre-overlay"
                    })();
                    addressModal.result.then(function(seladdr) {
                        self.user.postalAddressId = seladdr.fieldValueObj.postalAddressId;
                        self.voterNodeObj = seladdr.fieldValueObj;
                        self.hideAddrFields = false;
                    });
                }
                self.watchForm = function() {
                    $scope.$watch('self.user', function(newVal) {
                        FormStatus = $scope.address.$dirty;
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

                function handleUserEdit(userId) {
                    self.hideAddrFields = !self.user.postalAddressId;
                    registerService.getAddressInfo(userId, function(resp) {
                        self.user.iaddressarray = [];
                        self.user.postalAddress = {};
                        self.user.iaddressarray.push({});
                        self.showSubAddressInfo = false;

                        if (resp.status == "success") {
                            if (resp.data.length) {
                                self.voterNodeObj = resp.data[0].postalAddress;
                            }

                            self.showSubAddressInfo = true;
                            dataJson = resp.data;
                            self.user.iaddressarray = [];
                            self.user.postalAddress = {};
                            self.user.postalAddressId = resp.data[0].postalAddress.postalAddressId;

                            self.hideAddrFields = false;
                            for (var i = 0; i < dataJson.length; i++) {
                                if (!dataJson[i].nriAddress) {
                                    self.user.iaddressarray.push(dataJson[i]);
                                } else {
                                    self.user.naddressarray.push(dataJson[i]);
                                }
                            }

                            self.addressObj = self.user.iaddressarray[0];
                        }
                    });
                }

                var config = {
                    initiate: true,
                    blurValidation: false,
                    htmlValidation: false,
                    submitValidForm: false,
                    runCallBack: false,
                };

                var formStack = formValidation.init("#addressRegistrationForm", validationMap, errorJson, config);

                this.save = function() {

                    messageHandler.clearMessageStatus();

                    if (formStack.isValid) {
                        if (!self.user.postalAddressId) {
                            messageHandler.showErrorStatus("Please assign postal address by searching with pincode", ".status-message-wrapper");
                            setTimeout(function() {
                                messageHandler.clearMessageStatus();
                            }, 3000);
                            return;
                        }

                        var requestObj = [];
                        requestObj[0] = self.addressObj || {};
                        requestObj[0].postalAddress = {};
                        requestObj[0].postalAddress.postalAddressId = self.user.postalAddressId;
                        requestObj[0].nriAddress = false;
                        var addressReq = {};
                        addressReq.data = requestObj;
                        addressReq.userId = cdsSession.currentUserId;


                        $http({
                            method: "PUT",
                            url: appUrls.updateResidentialAddress,
                            data: addressReq
                        }).success(function(resp, status, headers, config) {

                            if (resp.status === "success") {

                                messageHandler.showInfoStatus(notifications.address_successfulSave, ".status-message-wrapper");
                                setTimeout(function() {
                                    messageHandler.clearMessageStatus();
                                    FormStatus = false;
                                    $state.go('root.profile.editprofile.volunteer');
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

            }
        ]);

    });
