 

define(['directives/directiveModule'], function(directiveModule) {
    directiveModule.directive('cadreVerificationNewDirective', ["dashboardService", function(dashboardService) {

                var dataJSON = {};
                dataJSON.verificationList = [];                  
                dashboardService.getNewCadreVerifications(function(resp) {
                        

                        for(var i=0; i <resp.data.length; i++){
                            var verficationObj = {};
                            verficationObj.Name = resp.data[i].firstName;
                            verficationObj["Mobile No"] = resp.data[i].mobileNumber;
                            verficationObj.Date= resp.data[i].raisedDate;
                            verficationObj.Status = resp.data[i].status;
                            dataJSON.verificationList.push(verficationObj);
                        };

                 });

                
                return {
                    restrict: "A",                    
                    link: function(scope, elem, attrs) {

                        scope.renderVerifyModal = function(grid,row){
                         //   window.location.href = '/tasks#/viewTasks/'+row.entity["taskId"];
                            return;
                        }

                        scope.list = dataJSON.verificationList;
                         scope.gridOptions = {
                            paginationPageSizes: [8, 20, 30],
                            paginationPageSize: 8,
                            columnDefs: [{
                                name: 'Name'
                            }, {
                                name: 'Mobile No'
                            }, {
                                name: 'Date'
                            },
                            {
                                name: 'Status',
                                cellTemplate : "<a class='row-link' ng-click='grid.appScope.renderVerifyModal(grid,row)'>Verify</a>"
                            }                            
                            ],
                            data: dataJSON.verificationList
                        };

                    }
                }
            }
        ]

    );


});