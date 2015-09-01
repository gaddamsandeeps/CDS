 define(['directives/directiveModule'], function(directiveModule) {
     directiveModule.directive('teamTasksDirective', ['dashboardService',
            function(dashboardService) {
                
                return {
                    restrict: "A",
                    link: function(scope, elem, attrs) {                      

                        var griddata = [];
                        
                        dashboardService.getTeamTasks(function(resp) {                                                  

                            var tasks = resp.data.tasks;
                            if(!tasks.length) return;
                            for (var i = 0; i < tasks.length; i++) {
                                var temp = {};
                                temp["Id"] = tasks[i].taskCode;
                                temp["Name"] = tasks[i].taskName;
                                temp["Target Date"] = tasks[i].taskWorkAllocation.toDate;
                                temp["Status"] = tasks[i].taskWorkAllocation.status;
                                temp["Completion"] = tasks[i].taskWorkAllocation.completedPercent;
                                temp["Age"] = tasks[i].taskWorkAllocation.age;
                                temp["Assigned By"] = tasks[i].createdByFName;
                                griddata.push(temp);
                            }
                        });

                        scope.gridOptions = {
                            paginationPageSizes: [5, 20, 30],
                            paginationPageSize: 5,
                            columnDefs: [{
                                name: 'Id'
                            }, {
                                name: 'Name'
                            }, {
                                name: 'Target Date'
                            },
                            {
                                name: 'Status'
                            }, {
                                name: 'Completion'
                            }, {
                                name: 'Age'
                            },
                            {
                                name: 'Assigned By'
                            }],
                            data: griddata
                        };
                    }
                }
            }
        ]

    );


});