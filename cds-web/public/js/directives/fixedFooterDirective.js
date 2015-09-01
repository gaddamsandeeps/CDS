
 

define(['directives/directiveModule','jquery'], function (directiveModule,$) {
	directiveModule.directive('fixedFooterDirective', ["$location","$rootScope", function($location, $rootScope){	
		
		return {	
			restrict: "A",			
			link: function(scope, elem, attrs) {				
				function setFixedFooter(){
					var sectionHt = $('#appSection').outerHeight()+$('#appHeader').outerHeight()+20; 
					var ctWindowHt = $(window).height();
					var footerHeight = $('#appFooter').outerHeight();
					var diffHeight = ctWindowHt - footerHeight;
					if (sectionHt<diffHeight){ 
					    $(elem).css('bottom', '0');
					    $(elem).css({'display':'block', "position" : "absolute","width" : "100%"});
					}else{					    
					    $(elem).css({'display':'block', "position" : "static", "width" : "100%"});
					}
				}	
				setFixedFooter();
			 	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){   
			 		setFixedFooter();
				});
			}
		}		
	}]);
	
});

