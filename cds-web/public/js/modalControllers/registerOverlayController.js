define(['controllers/controllerModule'], function(controllerModule) {

        controllerModule.controller('registerOverlayController', ["$scope", "$modalInstance", "$rootScope", "callerScope", "$window", "appUrlService", "cdsService",
                function($scope, $modalInstance, $rootScope, callerScope, $window, appUrlService, cdsService) {
                    // i18n messages
                    $scope.overlay_title = callerScope.overlay_title;
                    $scope.overlay_sucess_msg = callerScope.overlay_sucess_msg;
                    $scope.img_upload_succ_msg = callerScope.upload_sucess_msg;

                    var userType = callerScope.userType;
                    $scope.currentProfileImage = callerScope.currentProfileImage || "img-placeholder.jpg";
                    $scope.display = function() {

                        $window.location.href = "/profile";
                    }    

                     $scope.cancel = function() {
                            $modalInstance.dismiss('cancel');
                            if (callerScope.component == "register") {
                                $window.location.href = "/profile";
                            }
                        }

                    }]);
            

        });