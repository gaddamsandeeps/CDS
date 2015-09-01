 define(['directives/directiveModule'], function(directiveModule) {
     directiveModule.directive('selfTasksDirective', ['dashboardService', "$state", "$location",
             function(dashboardService, $state, $location) {

                 return {
                     restrict: "A",
                     link: function(scope, elem, attrs) {

                         var griddata = [];

                         dashboardService.getMyTasks(function(resp) {
                             var tasks = resp.data.tasks;
                             for (var i = 0; i < tasks.length; i++) {
                                 var temp = {};
                                 temp["Id"] = tasks[i].taskCode;
                                 temp["Name"] = tasks[i].taskName;
                                 temp["Target Date"] = tasks[i].taskWorkAllocation.toDate;
                                 temp["Status"] = tasks[i].taskWorkAllocation.status;
                                 // temporarily disabling this field as we are not capturing the data from edit page
                                 // temp["Completion"] = tasks[i].taskWorkAllocation.completedPercent;
                                 temp["Age"] = tasks[i].taskAge;
                                 temp["Assigned By"] = tasks[i].createdByFName;
                                 temp["taskId"] = tasks[i].taskId;
                                 griddata.push(temp);
                             }
                         });


                         scope.getRowId = function(grid, row) {
                             // console.log(grid);
                             console.log(row);
                             return row.entity["Id"];
                         }

                         scope.viewSelectedTask = function(grid, row) {
                             window.location.href = '/tasks#/viewTasks/' + row.entity["taskId"];
                             return;
                         }
                         scope.gridOptions = {

                             paginationPageSizes: [5, 20, 30],
                             paginationPageSize: 5,
                             columnDefs: [{
                                     name: 'Id',
                                     cellTemplate: "<a class='row-link' ng-click='grid.appScope.viewSelectedTask(grid,row)'>{{grid.appScope.getRowId(grid,row)}}</a>"
                                 }, {
                                     name: 'Name'
                                 }, {
                                     name: 'Target Date'
                                 }, {
                                     name: 'Status'
                                 },
                                 // temporarily disabling this field as we are not capturing the data from edit page
                                 // {
                                 //     name: 'Completion'
                                 // }, 
                                 {
                                     name: 'Age'
                                 }, {
                                     name: 'Assigned By'
                                 }
                             ],
                             data: griddata
                         };
                     }
                 }
             }
         ]

     );


 });
