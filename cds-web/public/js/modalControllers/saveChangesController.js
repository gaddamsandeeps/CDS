define(['controllers/controllerModule', "messageHandler"], function(controllerModule, messageHandler) {

    controllerModule.controller('saveChangesController', ["$scope", "$http", "$modalInstance", "callerScope", "$rootScope", "appUrlService", "$timeout",

        function($scope, $http, $modalInstance, callerScope, $rootScope, appUrlService, $timeout) {

            $scope.ok = function() {
                $modalInstance.close();
            }
            $scope.cancel = function() {
                $modalInstance.dismiss("cancel");
            }

        }
    ]);

});
