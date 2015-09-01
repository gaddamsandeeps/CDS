 

define(['directives/directiveModule'], function(directiveModule) {
    directiveModule.directive('checkRegStatus', ["cdsService",
            function(cdsService) {

                return {
                    restrict: "E",
					scope:true,
                    link: function(scope, elem, attrs) {
							
							if(cdsService.isRegistered){
								console.log("is registered");
								$(elem).addClass("success");
							}
							
						
				
                    }
                }
            }
        ]






    );






});