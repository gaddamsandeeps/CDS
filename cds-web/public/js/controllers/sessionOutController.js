
 

define(['controllers/controllerModule','jquery'], function (controllerModule,$) {

	 controllerModule.controller('sessionOutController', ['$state','$http',"appUrlService","cdsService",'$scope',"roleService", "$window","appModalService", 
	 	function($state,$http,appUrlService,cdsService,$scope,roleService, $window,appModalService){		
	 	var self = this,

	 	sessionOutoverlayConfig = {
	 		class : "sessionout-overlay",
	 		backdrop : "static",
	 		keyboard : false
	 	}
	 	


	 	 cadreModal = appModalService.init("sessionOutOverlay.html","sessionOutOverlayController", $scope,sessionOutoverlayConfig )();





	}]);

});

