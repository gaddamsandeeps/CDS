 define(['directives/directiveModule'], function(directiveModule) {
     directiveModule.directive('membershipTrendChartDirective', ['dashboardService',
             function(dashboardService) {

                 return {
                     restrict: "A",
                     link: function(scope, elem, attrs) {

                         var trendList,
                             lineData = [],
                             labels = [];

                         dashboardService.getMembershipTrend(function(resp) {
                             trendList = resp.data;

                             console.log(resp.data);


                             var cadreCount = [],
                                 volunteerCount = [];

                             for (var i = 0; i < trendList.length; i++) {
                                 labels.push(trendList[i].monthName);
                                 cadreCount.push(trendList[i].cadreTotal);
                                 volunteerCount.push(trendList[i].volunteerTotal);

                             }

                             scope.labels = labels;
                             scope.series = ['Volunteers', "Cadres"];

                             /*                       Mock data for cadre volunteer count.  
                                                      scope.data = [
                                                          [1,5,5,1,5,15,5,8,8,5,6,1], [1,6,5,4,5,5,5,5,8,4,7,3]
                                                      ];

                             */
                             scope.data = [
                                 volunteerCount, cadreCount
                             ];
                             scope.legend = true;
                             scope.colours = ['#FDE561', '#859E6C'];
                             scope.options = {
                                 legend: true,
                                 bezierCurve: true
                             };
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
