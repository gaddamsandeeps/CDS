 

define(['directives/directiveModule'], function(directiveModule) {
    directiveModule.directive('cadreFollowupsDirective', ["dashboardService","uiGridConstants" ,function(dashboardService,uiGridConstants) {

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

                        scope.list = dataJSON.verificationList;
                         scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
                             if (col.filters[0].term) {
                                 return 'header-filtered';
                             } else {
                                 return '';
                             }
                         };
                         scope.gridOptions = {
                             enableFiltering: true,
                            paginationPageSizes: [8, 20, 30],
                            paginationPageSize: 8,
                            columnDefs: [{
                                name: 'Name',
                                field: 'Name',
                                headerCellClass: scope.highlightFilteredHeader,
                                 filter: {
                                         placeholder: 'Search'
                                     }

                            }, {
                                name: 'Mobile No',
                                 field: 'Mobile No',
                                     filter: {
                                         placeholder: 'Search',

                                     }
                            }, {
                                name: 'Date',
                                field: 'Date',
                                 sort: {
                                     direction: uiGridConstants.DESC,
                                     ignoreSort: true
                                 },
                                 filter: {
                                     placeholder: 'Search'
                                 }

                            },
                            {
                                name: 'Status',
                                field: 'Status',
                                enableFiltering: false,
                                cellTemplate : "<span class='row-status'> Party Membership ID pending</span>"
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