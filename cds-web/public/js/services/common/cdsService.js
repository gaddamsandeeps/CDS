

define(['services/serviceModule'], function (serviceModule) {
	serviceModule.factory('cdsService', ['$http',"appUrlService",function($http, appUrlService){	
		
		var age,
			isRegistered,
			userId;
		
		return {
			age:age,
			setUserId:function(val){
				userId = val;
			},
			getUserId:function(){
				return userId;
			},
			getUserSession : function(cb){				

				 $http.get(appUrlService.getUserSession, {
				 	 params: {
				   		orgId: 2
				  	}
				 }).success(function(resp) {
				  cb(resp);				  
				 })
			},
			getProfileInfo : function(citizenId, cb){
				 $http.get(appUrlService.getProfileInfo, {
				 	params : {
				 		userId : citizenId
				 	}
				 }).success(function(resp) {
				  cb(resp);				  
				 })
			}
			
		};
	}]);
});

