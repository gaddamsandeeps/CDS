 

define(['directives/directiveModule'], function(directiveModule) {
    directiveModule.directive('cadreVerificationSelfDirective', ["dashboardService", function(dashboardService) {

                var dataJSON = {};
                dataJSON.verificationList = [];                  
                dashboardService.getSelfCadreVerifications(function(resp) {
                        for(var i=0; i <resp.data.length; i++){
                            var verficationObj = {};
                            verficationObj.Name = resp.data[i].firstName;
                            verficationObj["Mobile No"] = resp.data[i].mobileNumber;
                            verficationObj.Date= resp.data[i].raisedDate;
                            verficationObj.Status = "Verify";
                            dataJSON.verificationList.push(verficationObj);
                        };

                 });
                
                return {
                    restrict: "A",                    
                    link: function(scope, elem, attrs) {
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
                                name: 'Status'
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