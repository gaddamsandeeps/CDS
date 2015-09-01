define(['controllers/controllerModule', 'jquery', 'notifications', "underscore"], function(controllerModule, $, notifications, _) {

    controllerModule.controller('memberdashboardController', ["$stateParams", '$state', '$http', "appUrlService", "cdsService", '$scope', "roleService", "$window", "$sessionStorage", "appModalService", 'memberdashboardService',
        function($stateParams, $state, $http, appUrlService, cdsService, $scope, roleService, $window, $sessionStorage, appModalService, memberdashboardService) {

            var self = this,
                currentCitizenId = $stateParams.citizenId,
                children = [],
                regConfModalConfig = {
                    keyboard: true,
                    class: "registration-confirm-overlay",
                    backdrop: true
                },
                cdsSession = $sessionStorage.cds = $sessionStorage.cds || {};
            $scope.register_title = notifications.register_title;
            $scope.register_thanksmsg = notifications.register_thanksmsg;
            $scope.register_successmsg = notifications.register_successmsg;
            $scope.currentProfileImage = "img-placeholder.jpg";
            cdsService.getProfileInfo(currentCitizenId, initiateProfile);


            function initiateProfile(resp) {


                if (resp.data) {

                    if (resp.data.gender == "M") {
                        resp.data.gender = "MALE";
                    } else if (resp.data.gender == "F") {

                        resp.data.gender = "FEMALE"
                    } else {
                        resp.data.gender = "NOT TO BE DISCLOSED";
                    }


                    self.user = resp.data;

                    $scope.currentProfileImage = resp.data.photograph;

                }
                //cdsSession.currentUserId = $stateParams.citizenId;
                var revChartData = {},
                    taskageParams = {};
                revChartData.labels = [];
                revChartData.series = [];
                revChartData.data = [];
                taskageParams.criteria = "self";
                taskageParams.userId = currentCitizenId;

                console.log($stateParams);
                console.log($scope.userRole);

                var respObj = {};
                respObj.currentCitizenId = currentCitizenId;
                respObj.userRole = $scope.userRole;

                memberdashboardService.getTasksByAge(taskageParams, function(resp) {

                    chartData = resp.data;

                    if (chartData.length) {
                        var sortedChartArray = _.sortBy(chartData, "priorityId");

                        for (var i = 0; i < sortedChartArray.length; i++) {
                            revChartData.series.push(sortedChartArray[i].priorityName);
                            var dataArray = [];
                            for (var k = 0; k < sortedChartArray[i].taskAgeRangeCounts.length; k++) {
                                dataArray.push(sortedChartArray[i].taskAgeRangeCounts[k].count);
                            }
                            revChartData.data.push(dataArray);
                        }

                        for (var j = 0; j < sortedChartArray[0].taskAgeRangeCounts.length; j++) {
                            revChartData.labels.push(sortedChartArray[0].taskAgeRangeCounts[j].range);
                        }

                        $scope.barLabels = revChartData.labels;
                        $scope.barSeries = revChartData.series;
                        $scope.barData = revChartData.data;
                        $scope.barLegend = true;
                        $scope.barColours = [{

                            fillColor: "rgba(198, 120, 28, 0.9)",
                            highlightFill: "rgba(198, 120, 28, 1)",


                        }, {
                            fillColor: "rgba(49,105,181,0.9)",
                            highlightFill: "rgba(49,105,181,1)",

                        }, {
                            fillColor: "rgba(140,182,66,0.9)",
                            highlightFill: "rgba(140,182,66,1)",

                        }];

                    }


                });
                var trendList,
                    lineData = [],
                    tasksLabels = [],
                    trendParams = {};
                trendParams.userId = currentCitizenId;
                trendParams.type = "assignedtome";

                memberdashboardService.getTasksByTrend(trendParams, function(resp) {
                    console.log(resp);

                    trendList = resp.data;

                    for (var i = 0; i < trendList.length; i++) {
                        tasksLabels.push(trendList[i].monthName);
                        lineData.push(trendList[i].count);
                    }



                    $scope.lineLabels = tasksLabels;
                    //$scope.lineSeries = ['Monthwise Task Report'];
                    $scope.lineData = [
                        lineData,
                    ];
                    //$scope.lineLegend = true;
                    $scope.lineOptions = {
                        legend: true,
                        bezierCurve: true,
                        //bezierCurveTension: 0.9,
                    };
                    $scope.lineColours = ['#C6781C'];

                });
                var donutData = [];
                memberdashboardService.getTaskState(trendParams, function(resp) {
                    console.log(resp);
                    donutData[0] = resp.data.assignedCount;
                    donutData[1] = resp.data.inprogressCount;
                    donutData[2] = resp.data.holdCount;
                    $scope.donutLabels = ["Assigned", "In-progress", "Hold Count"];
                    $scope.donutData = donutData;
                    $scope.donutLegend = true;
                    $scope.donutColours = ["#F0AD4E", "#4C8AC7", "#86AD39"];
                });


            }



            self.showImageUpdateOverlay = function() {

                var registerModel = appModalService.init("registerOverlay.html", "registerOverlayController", $scope, regConfModalConfig)();

            }



        }
    ]);

});
