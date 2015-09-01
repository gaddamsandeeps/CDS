define(['controllers/controllerModule', "underscore"], function(controllerModule, _) {

    controllerModule.controller('cadreDeleteController', ["$scope", "$modalInstance", "callerScope", "listService",
        function($scope, $modalInstance, callerScope, listService) {

            $scope.showNoRecordsMsg = false;


            $scope.selectedUsersLength = callerScope.selectedUsers.length;

            var selectedUsers = callerScope.selectedUsers.join();

            var defSearchObj = {
                q: "",
                userType: "2,3,4",
                limit: 4
            };
            $scope.ok = function() {
                listService.deleteCitizen(selectedUsers, function(resp) {
                    listService.getUserList(defSearchObj, function(resObj) {                       
                        for(var i=0; i<resObj.data.searchResults.length; i++){
                            resObj.data.searchResults[i].selected = false;
                        }

                        callerScope.userList = resObj.data.searchResults;

                    });
                    $modalInstance.close();
                });
            };

            $scope.cancel = function() {
                $modalInstance.dismiss("cancel");
            };

        }
    ]);

});