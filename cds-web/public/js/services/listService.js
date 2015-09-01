define(['services/serviceModule'], function(serviceModule) {

	serviceModule.factory('listService', ['$http', 'appUrlService',
		function($http, appUrlService) {
			return {
				getUserList : function( obj, cb  ){

					$http.get(appUrlService.getUserList, {	
						params: obj
					}).success(function(data) {	
						cb(data);
					});
				},

				getUserTypes : function(cb){

					$http.get(appUrlService.getUserTypes, {
						params : {
							orgId : 2
						}	
					
					}).success(function(data) {	
						cb(data);
					});
				},


				deleteCitizen : function(userId, cb){

					$http.delete(appUrlService.deleteCitizen, {
						params : {
							userId : userId
						}	
					
					}).success(function(data) {	
						cb(data);
					});
				}


			}
		}]);

});


