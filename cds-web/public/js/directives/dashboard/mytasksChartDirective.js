 define(['directives/directiveModule'], function(directiveModule) {
     directiveModule.directive('mytasksChartDirective', ['dashboardService',
             function(dashboardService) {

                 return {
                     restrict: "A",
                     link: function(scope, elem, attrs) {

                         var donutData = [];
                         dashboardService.getTaskState(function(resp) {
                             console.log(resp);
                             donutData[0] = resp.data.assignedCount;
                             donutData[1] = resp.data.inprogressCount;
                             donutData[2] = resp.data.holdCount;
                             scope.donutLabels = ["Assigned", "In-progress", "Hold Count"];
                             scope.donutData = donutData;
                             scope.donutLegend = true;
                             scope.donutColours = ["#F0AD4E", "#4C8AC7", "#86AD39"];
                         });

                     }
                 }
             }
         ]

     );


 });
