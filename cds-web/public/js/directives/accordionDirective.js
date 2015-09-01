
 

define(['directives/directiveModule','accordion'], function (directiveModule) {
	directiveModule.directive('accordionJq', ["cdsService",function(cdsService){			
		return {	
			restrict: "A",				
			link: function(scope, elem, attrs) {					
				$(elem).accordion({
					heightStyle: "content"
				});				
			}
		}		
	}]);
	
});

