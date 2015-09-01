 define(['directives/directiveModule'], function(directiveModule) {
     directiveModule.directive('mytasksGraphDirective', ['dashboardService',
             function(dashboardService) {

                 return {
                     restrict: "A",

                 }
             }
         ]

     );


 });
