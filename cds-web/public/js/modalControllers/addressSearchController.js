define(['controllers/controllerModule', 'notifications'], function(controllerModule, notifications) {

    controllerModule.controller('addressSearchController', ["$scope", "$modalInstance", "$rootScope", "registerService",
        function($scope, $modalInstance, $rootScope, registerService) {

            $scope.showNoRecordsMsg = false;

            var queryString = $rootScope.addrsearchtext;

            $scope.addrsearchtext = queryString;

            function addressStringifier(addressArray) {
                var addressObjArray = [];

                for (var i = 0; i < addressArray.length; i++) {
                    var addressObj = {};
                    var addressString = "";
                    addressString = addressArray[i].district + "," + addressArray[i].divisionName + "," + addressArray[i].regionName + "," + addressArray[i].taluk + "," + addressArray[i].circleName + "," + addressArray[i].pincodeNumber;
                    addressObj.value = addressArray[i].pincodeNumber;
                    addressObj.label = addressString;
                    addressObj.fieldValueObj = addressArray[i];
                    addressObj.model = addressArray[i].postalAddressId;
                    addressObjArray.push(addressObj);

                };

                return addressObjArray;

            }

            registerService.getAddress(queryString, function(resp) {
                console.log(resp);
                var myres = addressStringifier(resp.data);
                $scope.results = myres;
            });

            $scope.selectAddress = function(seladd) {
                console.log(seladd);
                $modalInstance.close(seladd);

            };

            $scope.cancel = function() {
                $scope.showNoRecordsMsg = false;
                $modalInstance.dismiss("cancel");
            };

        }
    ]);

});
