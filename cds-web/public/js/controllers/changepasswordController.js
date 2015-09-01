define(['controllers/controllerModule', 'formValidation', 'validators/changePasswordValidators', 'errorMessages/changePasswordErrors'], function(controllerModule, formValidation, validationMap, errorJson) {

    controllerModule.controller('changepasswordController', ['$scope', '$state', '$http', "$sessionStorage", "appModalService", 'cdsService', 'appUrlService',
        function($scope, $state, $http, $sessionStorage, appModalService, cdsService, appUrlService) {

            var self = this;
            self.hidesuccessMsg = true;
            self.hideForm = false;

            var config = {
                initiate: true,
                blurValidation: false,
                htmlValidation: false,
                submitValidForm: false,
                runCallBack: false,
            };

            var formStack = formValidation.init("#changepasswordForm", validationMap, errorJson, config);

            self.save = function() {
                $scope.$broadcast("clearServiceErrors");

                if (formStack.isValid) {
                    var pass = self.user.password;
                    $http.put(appUrlService.changePwd, {
                        params: {
                            password: pass
                        }
                    }).success(function(resp, status, headers, config) {
                        if (resp.status == "success") {
                            self.user.password = "";
                            self.user.newpassword = "";
                            console.log(resp);
                            self.hideForm = true;
                            self.successMsg = "Your password has been changed and sent to your mail successfully";
                            self.hidesuccessMsg = false;

                        } else {
                            self.successMsg = "failure";
                        }
                    }).error(function(data, status, headers, config) {
                        self.successMsg = "failure";
                    });


                } else {
                    self.isNotValid = true;
                }
            };





        }
    ]);
});
