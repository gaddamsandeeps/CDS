/*global define*/


define(['appAdmin'], function(app) {


    app.run(["$rootScope", "$state", "$location", "roleService", "cdsService", function($rootScope, $state, $location, roleService, cdsService) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

        });

    }]);

    app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .otherwise('');


        /*****Non authenticated views*****/

        $stateProvider
            .state('root', {
                abstract: true,
                url: "",
                views: {
                    'header': {
                        templateUrl: 'views/common/bootstrap/header.html',
                        controller: "headerController as headerCtrl"
                    },
                    'footer': {
                        templateUrl: 'views/common/bootstrap/footer.html'
                    }
                }
            })

        .state('root.admin', {
                url: '',
                views: {
                    'content@': {
                        templateUrl: 'views/auth/admin/adminHome.html',
                        controller: "adminController as adminCtrl"
                    }
                },
                secured: false
            })
            .state('root.admin.dataconfig', {
                url: '/dataconfig',
                views: {
                    'subSection': {
                        templateUrl: 'views/auth/admin/dataconfig.html',
                        controller: 'dataconfigController as dataconfigCtrl'
                    }
                }
            })
            .state('root.admin.usermgmt', {
                url: '/usermgmt',
                views: {
                    'subSection': {
                        templateUrl: 'views/auth/admin/userManagement.html',
                        Controller: 'userMgmtController as userMgmtCtrl'
                    }
                }
            })
            .state('root.admin.servicecenter', {
                url: '/servicecenter',
                views: {
                    'subSection': {
                        templateUrl: 'views/auth/admin/serviceCenter.html',
                        Controller: 'serviceCenterMgmtController as serviceCenterMgmtCtrl'
                    }
                }
            })

    }]);

});
