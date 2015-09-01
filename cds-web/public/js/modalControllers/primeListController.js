define(['controllers/controllerModule', 'notifications'], function(controllerModule, notifications) {

    controllerModule.controller('primeListController', ["$scope", "$modalInstance", "$rootScope", "taskService", function($scope, $modalInstance, $rootScope, taskService) {


        $scope.showNoRecordsMsg = false;
        $scope.addtask_cadre_search = notifications.addtask_cadre_search;
        $scope.addtask_cadre_title = notifications.addtask_cadre_title;

        var queryString = $rootScope.queryString;
        taskService.getPrimeIds(queryString, function(resp) {

             $scope.primeIdList = resp.data.tasks;
            if (!$scope.primeIdList.length) {
                $scope.showNoRecordsMsg = true;
            }
        });


        $scope.ok = function(selectedprime) {
            
            $modalInstance.close(selectedprime);

        };

        $scope.cancel = function() {
            $scope.showNoRecordsMsg = false;
            $modalInstance.dismiss("cancel");
        };

    }]);

});
