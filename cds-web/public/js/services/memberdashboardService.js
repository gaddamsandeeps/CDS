define(['services/serviceModule'], function(serviceModule) {
    serviceModule.factory('memberdashboardService', ['$http', 'appUrlService',
        function($http, appUrlService) {
            return {

                getTasks: function(cb) {
                    $http.get(appUrlService.getTasksList, {


                    }).success(function(resp) {
                        cb(resp);
                    });
                },
                getTasksByAge: function(taskageParams, cb) {


                    $http.get(appUrlService.getTasksByAge, {
                        params: {

                            userId:taskageParams.userId,
                            criteria: taskageParams.criteria

                        }

                    }).success(function(resp) {
                        cb(resp);
                    });
                },
                getTasksByTrend: function(trendParams, cb) {
                    
                    $http.get(appUrlService.getTasksByTrend, {
                        params: {
                            userId:trendParams.userId,
                            type: trendParams.type
                        }

                    }).success(function(resp) {
                        cb(resp);
                    });
                },
                getTaskState: function(trendParams,cb) {
                    $http.get(appUrlService.getTaskState, {
                        params: {

                            userId:trendParams.userId,
                            type: trendParams.type
                        }

                    }).success(function(resp) {
                        cb(resp);
                    });
                },

            }

        }
    ]);
});
