 define(['controllers/controllerModule', 'formValidation', 'validators/registrationValidators', 'errorMessages/registrationErrors', 'notifications'], function(controllerModule, formValidation, validationMap, errorJson, notifications) {

     controllerModule.controller('registerController', ['$scope', "$http", "registerService", "cdsService", "appUrlService", "roleService", "$window", "appModalService",


         function($scope, $http, registerService, cdsService, appUrlService, roleService, $window, appModalService) {

             this.showLoader = false;
             this.showImage = true;
             var self = this;
             self.user = {};
             self.user.orgId = 2;
             self.user.sourceOfRegistration = "ONLINE";
             self.isValidUsername = true;
             self.isValidEmail = true;
             self.isValidMobileNo = true;
             self.isNotValid = false;
             self.hideCadreRole = true;
             self.user.membershipType = 0;
             self.hideAreasOfInterest = true;
             self.user.gender = "O";
             var regConfModalConfig = {
                 keyboard: false,
                 class: "registration-confirm-overlay",
                 backdrop: "static"
             };

             $scope.component = "register";
             $scope.overlay_title = notifications.reg_img_update_title;
             $scope.overlay_sucess_msg = notifications.reg_success_msg;
             $scope.upload_sucess_msg = notifications.img_upload_succ_msg;

             registerService.getInterestedAreasOptions(function(resp) {
                 self.InterestedAreas = resp.data;
             });

             self.user.volunteerInterestedAreas = [];

             self.setInterestArea = function() {
                 for (var i = 0; i < self.selectedInterests.length; i++) {
                     var interestArea = {};
                     interestArea["interestId"] = self.selectedInterests[i].interestId;
                     self.user.volunteerInterestedAreas.push(interestArea);
                 }
             }

             self.isValidForm = function() {
                 if (self.isValidUsername && self.isValidEmail && self.isValidMobileNo) {
                     return true;
                 }
                 return;
             }

             var config = {
                 initiate: true,
                 blurValidation: false,
                 htmlValidation: false,
                 submitValidForm: false,
                 runCallBack: false,
             };

             var formStack = formValidation.init("#registrationForm", validationMap, errorJson, config);


             $scope.$on("clearErrors", function() {
                 formStack.clearErrorClass(formStack, false);
                 self.isNotValid = false;
             });


             self.getGender = function(val) {
                 if (val == "F") {
                     cdsService.gender = "female";
                 } else {
                     cdsService.gender = "";
                 }
             }


             self.trackMembershipType = function(selectedId) {
                 if (selectedId == "2") {
                     self.hideCadreRole = false;
                     self.user.cadreType = "NEW";

                 } else {
                     self.user.cadreType = "";
                     self.hideCadreRole = true;

                 }
                 self.hideAreasOfInterest = (selectedId != "0") ? false : true;

             }
             self.trackCadreType = function() {
                 self.user.membershipType = 2;
             }


             self.save = function() {


                 $scope.$broadcast("clearServiceErrors");

                 if (formStack.isValid && self.isValidForm()) {
                     var requestObj = {};
                     if ((self.user.membershipType == "0") || (self.user.membershipType == "1")) {
                         delete self.user.cadreType;
                     }
                     $http({
                         method: "POST",
                         url: appUrlService.quickReg,
                         data: self.user
                     }).success(function(resp, status, headers, config) {

                         if (resp.status == "success") {

                             $scope.userType = self.user.cadreType;

                             var registerModel = appModalService.init("registerOverlay.html", "registerOverlayController", $scope, regConfModalConfig)();


                         } else {

                         }
                     }).error(function(data, status, headers, config) {


                     });


                 } else {
                     self.isNotValid = true;
                 }
             };

             function handleUserEdit() {
                 self.showImage = false;
                 var currentUserId = sessionObj.userId;
                 registerService.getPersonalInfo(currentUserId, function(resp) {
                     self.user = resp.data;

                 });
             }

         }
     ]);

 });
