 define(['directives/directiveModule', "underscore"], function(directiveModule, _) {
     directiveModule.directive('tasksageGraphDirective', ['dashboardService',
             function(dashboardService) {

                 return {
                     restrict: "A",
                     
                 }
             }
         ]

     );


 });
