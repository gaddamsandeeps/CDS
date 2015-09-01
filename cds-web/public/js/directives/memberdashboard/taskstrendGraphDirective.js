 define(['directives/directiveModule'], function(directiveModule) {
     directiveModule.directive('taskstrendGraphDirective', ['dashboardService',
             function(dashboardService) {

                 return {
                     restrict: "A",

                 }
             }
         ]

     );

 });
