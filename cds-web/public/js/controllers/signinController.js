
 

define(['controllers/controllerModule','jquery','formValidation', 'validators/signinValidators', 'errorMessages/signinErrors'], function (controllerModule,$,formValidation, validationMap, errorJson) {

	 controllerModule.controller('signinController', ['$state','$http',"appUrlService","cdsService",'$scope',"roleService", "$window", function($state,$http,appUrlService,cdsService,$scope,roleService, $window){		
	 	var self = this;
	 		self.orgId = "2";
	 		self.isNotValid = false;	
	 	 
	 		/*Vaalidation configuration*/

	 	 var config = {
            initiate: true,
            blurValidation: false,
            htmlValidation: false,
            submitValidForm: false,
            runCallBack: false,
        };	


        var formStack = formValidation.init("#loginForm", validationMap, errorJson, config);
        $scope.$on("clearErrors", function(){
        	formStack.clearErrorClass(formStack,false);
        	self.isNotValid = false;
        });

	 
		this.signin = function(){
			$scope.$broadcast("clearServiceErrors");

			if (formStack.isValid) {
			$http.post(appUrlService.signin, self.user)
			.success(function(resp){												

				if(resp.status == "success"){

					var defRole = roleService.getTopRole(resp.data.user.appRoles);
					console.log(defRole);
					if(defRole == "Citizen"){
						$window.location.href = "/profile";		
					} else if(defRole == "Admin"){
						$window.location.href = "/admin";		
					} else{
						$window.location.href = "/dashboard";	
					}

				}else{					
					self.user={};					
					self.isNotValid = true;
					$("#globalErrorContainer").html("Username or Password is invalid");
				}				
			})
			.error(function(){
				
			});			
		  }
		}
	}]);

});

