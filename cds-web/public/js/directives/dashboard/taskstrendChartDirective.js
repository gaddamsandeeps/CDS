 define(['directives/directiveModule'], function(directiveModule) {
     directiveModule.directive('taskstrendChartDirective', ['dashboardService',
             function(dashboardService) {

                 return {
                     restrict: "A",
                     link: function(scope, elem, attrs) {

                         var trendList,
                             lineData = [],
                             tasksLabels = [];

                         console.log(scope.userRole);
                         dashboardService.getTasksByTrend(scope.userRole, function(resp) {
                             console.log(resp);

                             trendList = resp.data;

                             for (var i = 0; i < trendList.length; i++) {
                                 tasksLabels.push(trendList[i].monthName);
                                 lineData.push(trendList[i].count);
                             }



                             scope.lineLabels = tasksLabels;
                             scope.lineSeries = ['Monthwise Task Report'];
                             scope.lineData = [
                                 lineData,
                             ];
                             scope.lineLegend = true;
                             scope.lineOptions = {
                                 legend: true,
                                 bezierCurve: true,
                                 //bezierCurveTension: 0.9,
                             };
                             scope.lineColours = ['#C6781C'];
                             scope.onClick = function(points, evt) {
                                 console.log(points, evt);
                             };


                         });

                     }
                 }
             }
         ]

     );


 });
