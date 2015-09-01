define(['controllers/controllerModule',"messageHandler"], function (controllerModule, messageHandler) {

	 controllerModule.controller('notificationDetailsController', ["$scope","$http","$modalInstance","callerScope","$rootScope","dashboardService","appUrlService","$timeout",

	 	function($scope,$http, $modalInstance,callerScope,$rootScope,dashboardService,appUrlService, $timeout){
			var inboxId = callerScope.inboxId;

	 		dashboardService.getNotificationDetails(inboxId, function(resp) { 
	 			$scope.subject = resp.data.subject;                               									 			
				$scope.notificationBody = resp.data.body;
				$scope.footer = resp.data.footerString;   
            });

  			$scope.cancel = function () {	
               	$modalInstance.dismiss("cancel");
			 }

	}]);

});

