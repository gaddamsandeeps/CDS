define(['services/serviceModule'], function(serviceModule) {
    serviceModule.factory('dashboardService', ['$http', 'appUrlService',
        function($http, appUrlService) {
            return {

                getMyTasks: function(cb) {
                    $http.get(appUrlService.getMyTasksList, {

                    }).success(function(resp) {
                        cb(resp)
                    });
                },
                getTeamTasks: function(cb) {
                    $http.get(appUrlService.getTeamTasks, {

                    }).success(function(resp) {
                        cb(resp);
                    });
                },

                getTasks: function(cb) {
                    $http.get(appUrlService.getTasksList, {


                    }).success(function(resp) {
                        cb(resp);
                    });
                },
                getTasksByAge: function(userRole, cb) {

                    console.log(userRole);

                    var criteria;
                    if (userRole === "Cadre") {
                        criteria = "self";
                    } else {
                        criteria = "All";
                    }


                    $http.get(appUrlService.getTasksByAge, {
                        params: {
                           
                            criteria: criteria                        }

                    }).success(function(resp) {
                        cb(resp);
                    });
                },
                getTasksByTrend: function(userRole, cb) {
                    var type;
                    if (userRole == "Cadre") {
                        type = "assignedtome";
                    } else {
                        type = "All";
                    }
                    $http.get(appUrlService.getTasksByTrend, {
                        params: {
                            
                            type: type
                        }

                    }).success(function(resp) {
                        cb(resp);
                    });
                },
                getTaskState: function(cb) {
                    $http.get(appUrlService.getTaskState, {
                        params: {
                            
                            type: 'assignedtome'
                        }

                    }).success(function(resp) {
                        cb(resp);
                    });
                },
                getAllCadreVerifications: function(cb) {
                    $http.get(appUrlService.getCadreVerifications, {
                        params: {
                            type: 'All'
                        }
                    }).success(function(resp) {
                        cb(resp);
                    });
                },
                getNewCadreVerifications: function(cb) {
                    $http.get(appUrlService.getCadreVerifications, {
                        params: {
                            type: 'newcadres'
                        }
                    }).success(function(resp) {
                        cb(resp);
                    });
                },
                getExistingCadreVerifications: function(cb) {
                    $http.get(appUrlService.getCadreVerifications, {
                        params: {
                            type: 'pendingverificationcadres'
                        }
                    }).success(function(resp) {
                        cb(resp);
                    });
                },
                getSelfCadreVerifications: function(cb) {
                    $http.get(appUrlService.getCadreVerifications, {
                        params: {
                            type: 'AssignedToMe'
                        }
                    }).success(function(resp) {
                        cb(resp);
                    });
                },
                getOfficeCadreVerifications: function(cb) {
                    $http.get(appUrlService.getCadreVerifications, {
                        params: {
                            type: 'ServiceCenter'
                        }
                    }).success(function(resp) {
                        cb(resp);
                    });
                },
                getNotifications: function(cb) {
                    $http.get(appUrlService.getNotifications, {
                        params: {
                            // subject: key
                        }
                    }).success(function(resp) {
                        cb(resp);
                    });

                },
                getNotificationDetails: function(msgId, cb) {
                    $http.get(appUrlService.getNotificationDetails, {
                        params: {
                            msgId: msgId
                        }
                    }).success(function(resp) {
                        cb(resp);
                    });
                },

                getCadreDetails: function(cb, userId) {
                    $http.get(appUrlService.getUserCadreInfo, {
                        params: {
                            userId: userId
                        }
                    }).success(function(resp) {
                        cb(resp);
                    })

                },

                getLeadCadres: function(cb) {

                    $http.get(appUrlService.getLeadCadres, {

                    }).success(function(resp) {
                        cb(resp);
                    })



                },

                updateCadreStatus: function(data, cb) {


                    $http({
                        url: appUrlService.updateCadreStatus,
                        method: "PUT",
                        data: data
                    }).success(function(resp, textStatus, jqXHR) {
                        cb(resp);
                    }).error(function(jqXHR, textStatus, errorThrown) {

                    })




                },

                getMembershipTrend: function(cb) {

                    $http.get(appUrlService.getMembershipTrend, {}).success(function(resp) {
                        cb(resp);
                    });


                }



            }

        }
    ]);
});
