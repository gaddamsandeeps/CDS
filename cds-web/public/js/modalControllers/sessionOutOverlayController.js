define(['controllers/controllerModule'], function (controllerModule) {

	 controllerModule.controller('sessionOutOverlayController', ["$scope","$modalInstance","$rootScope","$state",
	 	function($scope, $modalInstance,$rootScope, $state){



			  $scope.cancel = function () {			  	
			  	$state.go("root.signin");	  	 			   			    
			    $modalInstance.dismiss("cancel");
			  };




	}]);

});

