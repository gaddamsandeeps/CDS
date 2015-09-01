define(['directives/directiveModule','jquery'], function (directiveModule,$) {
	
	directiveModule.directive('navDropdownDirective', ["$location","$rootScope", function($location, $rootScope){	
			return {	
					restrict: "A",			
					link: function(scope, elem, attrs) {				
							  $(".my-account").on("click", function(e){
							       e.stopPropagation();
						        	$(".login-user-info").slideToggle();
						    	});

							    $("body").on("click", function(){
							       $(".login-user-info").slideUp(); 
							    });
					
					}
				}
			

	}]);




});