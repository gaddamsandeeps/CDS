/*global define*/
 

define(['appSignin'], function (app) {


app.run(["$rootScope", "$state","$location","roleService","cdsService",function($rootScope,$state,$location,roleService,cdsService){
       $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){           
        });

}]);

app.config(["$stateProvider", "$urlRouterProvider",function($stateProvider, $urlRouterProvider){
 
    $urlRouterProvider
    .otherwise('');
    

    /*****Non authenticated views*****/

    $stateProvider
    .state('root',{        
         abstract: true,
         url : "",
         views: {
            'header': {
                templateUrl: 'views/common/bootstrap/header.html',
                controller : "headerController as headerCtrl"
            },
            'footer': {
                templateUrl: 'views/common/bootstrap/footer.html'                
            }
        }
    })

    .state('root.signin',{
        url: '',
        views: {           
            'content@': {
                templateUrl: 'views/nonauth/bootstrap/signin.html',
                controller : "signinController as signinCtrl"
            }
        },
        secured : false
    })
    .state('root.forgotpassword',{
        url: '/forgotpassword',
        views: {           
            'content@': {
                templateUrl: 'views/nonauth/forgot-password.html',
            }
        },
        secured : false
    })
    .state('root.nullsession',{
        url: '/statusnull-nosession',
        views: {           
            'content@': {
                templateUrl: 'views/nonauth/session-out.html',
                controller : "sessionOutController as sessionOutCtrl"   
            }
        },
        secured : false
    })

}]);

});
