
 

define(['directives/directiveModule','simplyscroll'], function (directiveModule,simplyscroll) {
	directiveModule.directive('verticalScrollDirective', function(){			
		return {	
			restrict: "A",					
			link: function(scope, elem, attrs) {
					$(elem).simplyScroll({
						customClass: 'vert',
						orientation: 'vertical',
						auto: true,
						autoMode: 'loop',
						frameRate: 24,
						speed: 1     	
			        });			
			}
		}		
	});
	
});

