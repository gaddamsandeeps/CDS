define(['controllers/controllerModule'], function(controllerModule) {

    controllerModule.controller('listController', ['$scope', '$state', '$http', 'listService', "$sessionStorage", "appModalService", 'cdsService',
        function($scope, $state, $http, listService, $sessionStorage, appModalService, cdsService) {

            var self = this,
                rolesList = [];

            this.minAge = 18;
            this.maxAge = 50;
            this.filter = false;
            this.showImage = true;
            var cadreDeleteOverlayModal;
            this.selected = {};
            var cdsSession = $sessionStorage.cds = $sessionStorage.cds || {};

            var selectedUsers;

            self.selectedUsers = selectedUsers = [];

            var that = this;

            
            self.hideCadreStats = true;
            cdsService.getUserSession(function(resp) {
                rolesList = resp.data.user.appRoles;
                for (var i = 0; i < rolesList.length; i++) {

                    if (rolesList[i].roleName == "MP") {
                        self.hideCadreStats = false;
                    } else {
                        self.hideCadreStats = true;
                    }

                }
            });

            var defSearchObj = {
                q: "",
                userType: "2,3,4",
                limit: 4,
                page: 1
            };

            $scope.maxSize = 6;
            this.render = function() {
                listService.getUserList(defSearchObj, function(resObj) {
                    $scope.itemsperPage = 4;
                    $scope.totalItems = resObj.data.pageInfo.totalNoOfRecords;
                    self.currentPage = resObj.data.pageInfo.currentPage;
                    that.userList = resObj.data.searchResults;
                });

                listService.getUserTypes(function(resp) {
                    self.userTypes = resp.data;
                });               
            };

            this.pageChanged = function(currentPage){
                defSearchObj.page = currentPage;
                this.render();
            }

            this.render();

            // this.search = function() {
            //     if (typeof this.searchQ == "undefined" || this.searchQ == "") return;
            //     this.selectedGender = this.selectedUserTypes = false;
            //     this.minAge = this.maxAge = "";

            //     listService.getUserList({
            //         q: this.searchQ,
            //         page: 1,
            //         userType: "2,3,4",
            //         limit: 50
            //     }, function(resObj) {
            //         that.userList = resObj.data.searchResults;

            //     });
            // };



            this.confirmDelete = function() {
                if (selectedUsers.length) {
                    self.selectedUsers = selectedUsers;
                    cadreDeleteOverlayModal = appModalService.init("cadreDeleteOverlay.html", "cadreDeleteController", self, {
                        class: "cadre-delete-overlay"
                    })();

                    cadreDeleteOverlayModal.result.then(function() {
                        defSearchObj.page = 1;
                        self.render();
                    }, function() {
                        console.log('Something wrong!');
                    });

                } else {


                }
            }


            this.editUserInfo = function(citizenId) {
                $state.go('root.profile.editprofile.personal', {
                    "userId": citizenId
                });
            }


            this.viewProfile = function(citizenId) {
                cdsSession.currentUserId = citizenId;
                $state.go('root.profileLookup', {
                    "citizenId": citizenId
                });
            }

            this.viewDetails = function(citizenId) {
                $state.go('root.profile.memberdashboard', {
                    "citizenId": citizenId
                });
            }

            this.enableDisableOption = function(citizenId) {

                if (selectedUsers.indexOf(citizenId) < 0) {
                    selectedUsers.push(citizenId);
                } else {
                    var currentEleIndex = selectedUsers.indexOf(citizenId);
                    selectedUsers.splice(currentEleIndex, 1);
                }

                console.log(selectedUsers);
                this.disableEdit = (selectedUsers.length > 1) ? "grey" : "";
            }



            this.editCurrentUser = function() {
                if (selectedUsers.length == 1) {
                    cdsSession.currentUserId = selectedUsers[0];
                    $state.go('root.profile.editprofile.personal');
                } else {
                    
                }
            }

            /*Show filter*/

            this.showFilter = function() {
                console.log("get log");
                this.filter = !this.filter;
            };



            this.filterSearch = function() {
                var filterObj = {
                    minAge : "",
                    maxAge : ""
                };
                filterObj = defSearchObj;

                filterObj.q = this.searchQ;
                filterObj.page = 1;

                (this.minAge !== "") ? filterObj.minAge = this.minAge: delete filterObj.minAge;
                (this.maxAge !== "") ? filterObj.maxAge = this.maxAge: delete filterObj.maxAge;

                if (typeof this.selectedUserTypes !== undefined) {
                    var str = this.getSelectedFromObject(this.selectedUserTypes).toString();
                    console.log(str);
                    (str !== "") ? filterObj.userType = str: delete filterObj.userType;
                }

                if (typeof this.selectedGender !== undefined) {
                    var str = this.getSelectedFromObject(this.selectedGender).toString();
                    (str) ? filterObj.gender = str: delete filterObj.gender;
                }

                listService.getUserList(filterObj, function(resObj) {
                    $scope.itemsperPage = 4;
                    $scope.totalItems = resObj.data.pageInfo.totalNoOfRecords;
                    self.currentPage = resObj.data.pageInfo.currentPage;
                    self.userList = resObj.data.searchResults;
                    self.filteredWith();
                    console.log("remove Loader");
                });

            };


            this.resetUserFilterSearch = function(e,userTypeScope){                            
                if(!e.currentTarget.checked){
                    self.selectedUserTypes[userTypeScope.appRoleId] = false;
                    self.filterSearch();
                }                  
            }


            this.resetGenderFilterSearch = function(e,gender){                            
                if(!e.currentTarget.checked){
                      self.selectedGender[gender] = false;
                      self.filterSearch();
                }                  
            }


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




            this.filteredWith = function() {

                this.selectedFilter = [];
                var minMaxAge = [];
                var selectedUserTypes = this.selectedUserTypes || {};

                var keys = Object.keys(selectedUserTypes);


                var selectedUserFilter = self.userTypes.filter(
                    function(user) {
                        if (selectedUserTypes[user.appRoleId]) {
                            return true;
                        }
                    }

                );



                var selectedGender = this.getSelectedFromObject(this.selectedGender) || [];


                selectedUserFilter = selectedUserFilter.map(function(user) {

                    return {
                        "filterName": user.appRoleName,
                        "filterObj": function() {

                            self.selectedUserTypes[user.appRoleId] = false;
                            self.filterSearch();

                        }
                    };

                });


                console.log(selectedUserFilter);




                console.log(selectedUserFilter);

                if (selectedGender.length) {

                    selectedGender = selectedGender.map(function(gender) {

                        return {
                            "filterName": self.getGender(gender),
                            "filterObj": function() {

                                self.selectedGender[gender] = false;
                                self.filterSearch();

                            }
                        };

                    });
                }


                if (this.minAge !== "" && this.maxAge !== "") {
                    minMaxAge.push({
                        "filterName": "Age " + this.minAge + " to " + this.maxAge,
                        "filterObj": function() {
                            console.log("minAge");
                            self.minAge = self.maxAge = "";
                            self.filterSearch();

                        }
                    });
                }

                this.selectedFilter = this.selectedFilter.concat(selectedUserFilter, selectedGender, minMaxAge);

            };

            this.getGender = function(gender) {
                return gender === 'M' ? "Male" : "Female";
            };


            this.resetSerach = function() {
                this.searchQ = "";
                this.selectedUserTypes = [];
                this.selectedGender = [];
                this.selectedFilter = [];
                defSearchObj.userType = "2,3,4";
                defSearchObj.q = "";
                defSearchObj.page = 1;
                (defSearchObj.maxAge) ? delete defSearchObj.maxAge : "";
                (defSearchObj.minAge) ? delete defSearchObj.minAge : "";
                this.render();
            }


        }
    ]);
});
