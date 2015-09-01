 

define(['directives/directiveModule'], function(directiveModule) {
     directiveModule.directive('eventsBannerDirective', ['dashboardService',"$state","$location",
            function(dashboardService,$state,$location) {
                
                return {
                    restrict: "A",
                    link: function(scope, elem, attrs) {                      
                        
                        dashboardService.getMyTasks(function(resp) {                          
                            
                        });
               
                    }
                }
            }
        ]

    );


});