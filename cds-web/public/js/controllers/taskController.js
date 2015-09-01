define(['controllers/controllerModule', 'formValidation', 'validators/addtaskValidators', 'errorMessages/addtaskErrors', 'jquery', "messageHandler"], function(controllerModule, formValidation, validationMap, errorJson, $, messageHandler) {

    controllerModule.controller('taskController', ["$rootScope", '$state', '$http', "appUrlService", "cdsService", '$scope', "taskService", "appModalService",
        function($rootScope, $state, $http, appUrls, cdsService, $scope, taskService, appModalService) {

            var self = this;
                self.isNotValidForm = false;
                
            var taskcat,
                stateName = $state.current.name;

            switch(stateName){
                case "root.tasks" :
                    taskcat = "mytasks";
                    break;
                case "root.teamTasks" :
                    taskcat = "teamtasks";
                    break;
                case "root.allTasks" :
                    taskcat = "allTasks";
                    break;
                case "root.supervisorviewAllTasks" :
                    taskcat = "supervisortasks";
                    break;
            }

            var config = {
                initiate: true,
                blurValidation: false,
                htmlValidation: false,
                submitValidForm: false,
                runCallBack: false,
            };
            this.hideSearch = true;
            this.toggleSearch = function() {

                this.hideSearch = (this.hideSearch == true) ? false : true;
            }
            cdsService.getUserSession(function(userData) {
                $scope.userData = userData;
                var appRoles = userData.data.user.appRoles;
                // To display username ONLOAD in Add New Task PAGE, Assign To field
                self.assignedToCitizenName = userData.data.user.citizen.firstName + "" + userData.data.user.citizen.lastName;

                var topRole, rolesArray = [];
                appRoles = appRoles || [];

                for (var i = 0; i < appRoles.length; i++) {
                    rolesArray.push(appRoles[i].roleName);
                }

                if (rolesArray.indexOf("MP") > -1) {
                    $scope.topRole = "MP";
                }
            });
            self.user = {};

            self.user.taskWorkAllocation = {};
            self.user.taskWorkAllocation.citizenId = $rootScope.assignedCitizenName;
            self.user.comments = {};
            self.user.comments.commentType = "Public";


            taskService.getTaskStatuses(function(resp) {
                $scope.taskStatus = resp.data;
            });

            taskService.getTaskCategories(function(resp) {
                $scope.taskCategoryOptions = resp.data;
            });

            taskService.getTaskPriorities(function(resp) {
                $scope.taskPriorities = resp.data;
            });

            this.showCadresList = function(queryString) {
                $rootScope.queryString = queryString;
                cadreModal = appModalService.init("cadreList.html", "cadreListController", $rootScope, {
                    class: "cadre-overlay"
                })();

                cadreModal.result.then(function(selObj) {
                    self.assignedToCitizenName = selObj.value;
                    self.user.taskWorkAllocation.citizenId = selObj.id;
                }, function() {
                    self.assignedToCitizenName = "";
                    self.user.taskWorkAllocation.citizenId = null;
                });

            }
            this.showPrimeIdList = function(queryString) {
                $rootScope.queryString = queryString;
                primeModal = appModalService.init("primeIdList.html", "primeListController", $rootScope, {
                    class: "cadre-overlay"
                })();
                primeModal.result.then(function(selectedprime) {
                    self.user.taskWorkAllocation.taskPrimeCode = selectedprime.taskCode;
                    self.user.parentTaskId = selectedprime.taskId;
                }, function() {
                    self.user.taskWorkAllocation.taskPrimeCode = "";
                    self.user.parentTaskId = null;
                });
            }

            var taskReqObject = {
                limit: 3,
                page: 1
            };
            $scope.maxSize = 5;

            this.setPagenationItems = function( resp ){
                $scope.itemsperPage = 3;
                $scope.totalItems = resp.data.pageInfo.totalNoOfRecords;
                self.currentPage = resp.data.pageInfo.currentPage;
            }

            this.taskSearch = function(taskObj, filterObj) {
                if (taskObj === "mytasks") {
                    taskService.getMyTasks(filterObj, function(resp) {
                        self.setPagenationItems(resp);
                        $scope.myTaskLists = resp.data.tasks;
                    });
                }
                if (taskObj === "teamtasks") {
                    taskService.getTeamTasks(filterObj, function(resp) {
                        self.setPagenationItems(resp);
                        $scope.teamTasks = resp.data.tasks;
                    });
                }
                if (taskObj === "allTasks") {
                    taskService.getAllTasks(filterObj, function(resp) {
                        self.setPagenationItems(resp);
                        $scope.allTasks = resp.data.tasks;
                    });
                }
                if (taskObj === "supervisortasks") {
                    taskService.getsupervisorAllTasks(filterObj, function(resp) {
                        self.setPagenationItems(resp);
                        $scope.supervisorTaskLists = resp.data.tasks;
                    });
                }
            }
           
            this.taskSearch(taskcat, taskReqObject);

            this.pageChanged = function(currentPage){
                taskReqObject.page = currentPage;
                this.taskSearch(taskcat, taskReqObject);
            }

            this.newTask = function() {
                $state.go('root.addTask');
            };
            this.viewTask = function(params) {
                $state.go('root.viewTasks', {
                    "taskId": params
                });
            };
            this.viewTeamTasks = function() {
                $state.go('root.teamTasks');
            };
            this.viewAllTasks = function() {
                $state.go('root.allTasks');
            }
            this.supervisorviewAllTasks = function() {
                $state.go('root.supervisorviewAllTasks');
            }
            this.deleteTask = function(params) {
                taskService.deleteTask(params, function(resp) {
                    console.log(resp);
                });
            }

            var formStack = formValidation.init("#myTaskForm", validationMap, errorJson, config);
            this.save = function() {

                if (formStack.isValid) {
                    if (self.user.comments != undefined) {
                        var commentsObj = angular.copy(self.user.comments);
                        commentsObj.commentTo = 104;
                        var commentsArray = [];

                        commentsArray.push(commentsObj);
                        self.user.comments = commentsArray;
                    }

                    if (self.user.taskWorkAllocation.citizenId === undefined) {

                        self.user.taskWorkAllocation.citizenId = $scope.userData.data.user.appUserId;
                    }

                    $http({
                        url: appUrls.saveTaskInfo,
                        method: "POST",
                        data: self.user
                    }).success(function(resp, textStatus, jqXHR) {
                        if (resp.status === "success") {
                            messageHandler.showErrorStatus(errorJson.successfulSave, ".status-message-wrapper");
                            setTimeout(function() {
                                messageHandler.clearMessageStatus();
                            }, 3000);
                            $state.go("root.tasks");
                        } else {
                            messageHandler.showErrorStatus(errorJson.submissionError, ".status-message-wrapper");
                            setTimeout(function() {
                                messageHandler.clearMessageStatus();
                            }, 3000);
                        }
                    }).error(function(jqXHR, textStatus, errorThrown) {
                        messageHandler.showErrorStatus(errorJson.submissionError, ".status-message-wrapper");
                        setTimeout(function() {
                            messageHandler.clearMessageStatus();
                        }, 3000);
                    })
                } else {
                    self.isNotValidForm = true;
                }
            };

            this.filterSearch = function(taskObj) {

                var filterObj = {
                    agerange : ""
                };

                filterObj = taskReqObject;
                filterObj.q = this.searchQ;
                filterObj.page = 1;
                
                (this.minAge !== undefined) ? filterObj.agerange = this.minAge + "-" + this.maxAge: delete filterObj.agerange;
                // (filterObj.agerange !== '-') ? filterObj.agerange = filterObj.agerange: delete filterObj.agerange;
                (this.user.fromDate !== undefined) ? filterObj.fromDate = this.user.fromDate: false;
                (this.user.toDate !== undefined) ? filterObj.toDate = this.user.toDate: false;

                if (typeof this.selectedPriorityTypes !== undefined) {
                    var str = this.getSelectedFromObject(this.selectedPriorityTypes).toString();
                    (str) ? filterObj.priority = str: false;
                }

                if (typeof this.selectedStatusTypes !== undefined) {
                    var str = this.getSelectedFromObject(this.selectedStatusTypes).toString();
                    (str) ? filterObj.status = str: false;
                }
                this.taskSearch(taskObj, filterObj);
            };

            this.getSelectedFromObject = function(obj) {
                if (obj) {
                    var keys = Object.keys(obj);
                    var filtered = keys.filter(function(key) {
                        return obj[key]
                    });
                    return filtered;
                } else {
                    return "";
                }

            }

            this.resetSerach = function(taskObj) {
                this.searchQ = this.user.fromDate = this.user.toDate = this.minAge = this.maxAge = undefined;
                this.selectedPriorityTypes = this.selectedStatusTypes = undefined;
                taskReqObject = "";
                taskReqObject = {limit: 3, page: 1};
                this.taskSearch(taskcat, taskReqObject);
            }

        }
    ]);

});