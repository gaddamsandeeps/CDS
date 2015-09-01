 define(['directives/directiveModule'], function(directiveModule) {
     directiveModule.directive('cadreVerificationsDirective', ["$rootScope", "dashboardService", "appModalService",
             function($rootScope, dashboardService, appModalService) {

                 var dataJSON = {};
                 dataJSON.verificationList = [];
                 dashboardService.getExistingCadreVerifications(function(resp) {
                     for (var i = 0; i < resp.data.length; i++) {

                         var verficationObj = {};
                         verficationObj.Name = resp.data[i].firstName;
                         verficationObj["Mobile No"] = resp.data[i].mobileNumber;
                         verficationObj.Date = resp.data[i].raisedDate;
                         verficationObj.Status = resp.data[i].status;
                         verficationObj.citizenId = resp.data[i].citizenId;
                         dataJSON.verificationList.push(verficationObj);
                     };

                 });

                 return {
                     restrict: "A",
                     link: function(scope, elem, attrs) {


                         function updateCadreStatus(citizenId, status) {

                            scope.currentUserId = citizenId;

                            if(status == "Verify"){

                             dashboardService.updateCadreStatus({
                                 userId: citizenId,
                                 type: "PICKED"
                             }, function(resp) {

                                 var verificationModal = appModalService.init("cadreVerificationForm.html", "cadreVerificationController", scope, {
                                     class: "cadre-overlay"
                                 })();

                                 verificationModal.result.then(function(selObj) {

                                 }, function() {

                                 });

                             });
                            }

                             if(status == "In Progress"){

                                  var verificationModal = appModalService.init("cadreVerificationForm.html", "cadreVerificationController", scope, {
                                     class: "cadre-overlay"
                                 })();
                             }

                         }


                         scope.list = dataJSON.verificationList;
                        

                         scope.renderVerifyModal = function(grid, row) {
                           
                                 updateCadreStatus(row.entity.citizenId,row.entity.Status );
                          
                         }

                         scope.getCadreStatusText = function(grid, row) {   
                            return row.entity.Status;    
                         }

                         scope.gridOptions = {
                             paginationPageSizes: [8, 20, 30],
                             paginationPageSize: 20,
                             columnDefs: [{
                                 name: 'Name'
                             }, {
                                 name: 'Mobile No'
                             }, {
                                 name: 'Date'
                             }, {
                                 name: 'Status',
                                 cellTemplate: "<a class='row-link' ng-click='grid.appScope.renderVerifyModal(grid,row)'>{{grid.appScope.getCadreStatusText(grid,row)}}</a>"
                             }],
                             data: dataJSON.verificationList
                         };

                     }
                 }
             }
         ]

     );


 });