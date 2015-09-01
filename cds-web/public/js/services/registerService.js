define(['services/serviceModule'], function(serviceModule) {

    serviceModule.factory('registerService', ['$http', 'appUrlService',
        function($http, appUrlService) {
            return {

                checkUserNameExists: function(userName, cb, userAvailableMsg, userNotAvailableMsg) {
                    $http.get(appUrlService.getUserAvailability, {
                        params: {
                            userName: userName,
                            orgId: "2"
                        }
                    }).success(function(data) {
                        cb(data, userAvailableMsg, userNotAvailableMsg, "userName");
                    });
                },

                checkMobileNoExists: function(userMobile, cb, userAvailableMsg, userNotAvailableMsg) {

                    $http.get(appUrlService.getMobileAvailability, {
                        params: {
                            mobileNumber: userMobile,
                            orgId: "2"
                        }
                    }).success(function(data) {
                        cb(data, userAvailableMsg, userNotAvailableMsg, "mobileNo");
                    });
                },

                checkEmailExists: function(email, cb, userAvailableMsg, userNotAvailableMsg) {
                    $http.get(appUrlService.getEmailAvailability, {
                        params: {
                            email: email,
                            orgId: "2"
                        }
                    }).success(function(data) {
                        cb(data, userAvailableMsg, userNotAvailableMsg, "email");
                    });
                },


                getEducationOptions: function(cb) {

                    $http.get(appUrlService.getEducationOptions, {
                        params: {
                            orgId: 2
                        }

                    }).success(function(resp) {
                        cb(resp)
                    });
                },
                getOccupationOptions: function(cb) {
                    $http.get(appUrlService.getOccupationOptions, {
                        params: {
                            orgId: "2"
                        }

                    }).success(function(resp) {
                        cb(resp);
                    });
                },
                getInterestedAreasOptions: function(cb) {
                    $http.get(appUrlService.getInterestedAreasInfo, {
                        params: {
                            orgId: 2
                        }
                    }).success(function(resp) {
                        cb(resp);

                    });
                },
                getPartyPositionsOptions: function(cb) {
                    $http.get(appUrlService.getPartyPositionsInfo, {
                        params: {
                            orgId: 2
                        }
                    }).success(function(resp) {
                        cb(resp);

                    })
                },


                getAddress: function(userInput, cb) {

                    $http.get(appUrlService.getAddress, {
                        params: {
                            q: userInput,
                            orgId: 2
                        }
                    }).success(function(data) {
                        cb(data);
                    });
                },

                getConstituencyInfo: function(userInput, cb) {
                    $http.get(appUrlService.getConstituencyInfo, {
                        params: {
                            q: userInput,
                            orgId: 2
                        }
                    }).success(function(data) {
                        cb(data);
                    });

                },
                getVolunteerCategoryOptions: function(cb) {
                    $http.get(appUrlService.getVolunteerCategoryInfo, {
                        params: {
                            orgId: 2
                        }

                    }).success(function(resp) {
                        cb(resp);

                    })
                },
                getLeadOptions: function(cb) {
                    $http.get(appUrlService.getLeadInfo, {
                        params: {
                            orgId: 2
                        }
                    }).success(function(resp) {
                        cb(resp);

                    })
                },
                getPerformanceGradeOptions: function(cb) {
                    $http.get(appUrlService.getPerformanceGradeInfo, {
                        params: {
                            orgId: 2
                        }

                    }).success(function(resp) {
                        cb(resp);

                    })
                },
                getCareerAspirationOptions: function(cb) {
                    $http.get(appUrlService.getCareerAspirationOptions, {

                        params: {
                            orgId: 2
                        }

                    }).success(function(resp) {
                        cb(resp);
                    })
                },
                getSkillGapsOptions: function(cb) {
                    $http.get(appUrlService.getSkillGapsOptions, {
                        params: {
                            orgId: 2
                        }
                    }).success(function(resp) {
                        cb(resp);

                    })
                },
                getPersonalInfo: function(userId, cb) {
                    $http.get(appUrlService.getUserPersonalInfo, {
                        params: {
                            userId: userId
                        }
                    }).success(function(resp) {
                        cb(resp);
                    })
                },
                getWorkInfo: function(userId, cb) {

                    $http.get(appUrlService.getUserWorkInfo, {
                        params: {
                            userId: userId
                        }
                    }).success(function(resp) {
                        cb(resp);
                    })
                },
                getVoterInfo: function(userId, cb) {

                    $http.get(appUrlService.getUserVoterInfo, {
                        params: {
                            userId: userId
                        }
                    }).success(function(resp) {
                        cb(resp);
                    })
                },
                getAddressInfo: function(userId, cb) {
                    $http.get(appUrlService.getUserAddressInfo, {
                        params: {
                            userId: userId
                        }
                    }).success(function(resp) {
                        cb(resp);
                    })
                },
                getVolunteerInfo: function(userId, cb) {
                    $http.get(appUrlService.getUserVolunteerInfo, {
                        params: {
                            userId: userId
                        }

                    }).success(function(resp) {
                        cb(resp);
                    })
                },
                getFamilyInfo: function(userId, cb) {
                    $http.get(appUrlService.getUserFamilyInfo, {
                        params: {
                            userId: userId
                        }

                    }).success(function(resp) {
                        cb(resp);
                    })
                },
                getCadreInfo: function(userId, cb) {
                    $http.get(appUrlService.getUserCadreInfo, {
                        params: {
                            userId: userId
                        }
                    }).success(function(resp) {
                        cb(resp);
                    })
                },

                getAreaOfImprovements: function(cb) {
                    $http.get(appUrlService.getAreaOfImprovements, {}).success(function(resp) {
                        cb(resp);
                    })

                },
                getBloodGroupOptions: function(cb) {
                    $http.get(appUrlService.getBloodGroupsInfo, {
                        params: {
                            orgId: 2
                        }
                    }).success(function(resp) {
                        cb(resp);

                    })
                }





            }

        }
    ]);


});
