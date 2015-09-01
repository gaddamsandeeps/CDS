 define(['directives/directiveModule'], function(directiveModule) {
     directiveModule.directive('notificationsDirective', ["$rootScope", "dashboardService", "appModalService",
             function($rootScope, dashboardService, appModalService) {


                 var dataJSON = {};
                 dataJSON.notificationList = [];
                 dashboardService.getNotifications(function(resp) {
                     for (var i = 0; i < resp.data.inboxs.length; i++) {

                         var notificationObj = {};
                         notificationObj.subject = resp.data.inboxs[i].subject;
                         notificationObj.Date = resp.data.inboxs[i].creationdate;
                         notificationObj.inboxId = resp.data.inboxs[i].inboxId;
                         dataJSON.notificationList.push(notificationObj);
                     };

                 });



                 return {
                     restrict: "A",
                     link: function(scope, elem, attrs) {

                         scope.notifications = [];

                         dashboardService.getNotifications(function(resp) {

                             scope.notifications = resp.data.inboxs;
                             

                         });

                         var griddata = [];


                         scope.getNotificationDetails=function (inboxId) {
                            scope.inboxId = inboxId;
                             dashboardService.getNotificationDetails(inboxId, function(resp) {
                                //TODO the overlay view part
                                var verificationModal = appModalService.init("notificationdetails.html", "notificationDetailsController", scope, {
                                     class: "cadre-overlay"
                                 })();

                                 verificationModal.result.then(function(selObj) {

                                 }, function() {

                                 });

                             });

                         }

                         // scope.renderVerifyModel = function(grid, row) {
                         //    getNotificationDetails(row.entity.inboxId);
                         // }

                         // scope.getNotificationSubjectText = function(grid, row) {   
                         //    return row.entity.subject;    
                         // }

                         // scope.gridOptions = {
                         //     paginationPageSizes: [5, 20, 30],
                         //     paginationPageSize: 5,
                         //     columnDefs: [{
                         //         name: 'subject',
                         //         cellTemplate: "<a class='row-link' ng-click='grid.appScope.renderVerifyModel(grid,row)'>{{grid.appScope.getNotificationSubjectText(grid,row)}}</a>"
                         //     }, {
                         //         name: 'Date'
                         //     }],
                         //     data: dataJSON.notificationList
                         // };   

                     }                  
                 }
             }
         ]

     );


 });
