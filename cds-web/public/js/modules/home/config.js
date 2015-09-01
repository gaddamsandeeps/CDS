/*global define*/
 

define(['appHome'], function (app) {

app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider",function($stateProvider, $urlRouterProvider, $locationProvider){
 
   /* $urlRouterProvider
    .otherwise('/');
   */ 

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

    /*Page id : CDS1*/

     .state('root.homeDot',{
        url: '',
        views: {           
            'content@': {
                templateUrl: 'views/nonauth/bootstrap/home.html',
                controller : "homeController as homeCtrl"                
            }
             
        },
        secured : false
    })

    .state('root.home',{
        url: '/',
        views: {           
            'content@': {
                templateUrl: 'views/nonauth/bootstrap/home.html',
                controller : "homeController as homeCtrl"                
            }
             
        },
        secured : false
    })
    .state('root.knowyourmp',{
        url: '/knowyourmp',
        views: {           
            'content@': {
                templateUrl: 'views/nonauth/bootstrap/knowyourmp.html'
            }
        },
        secured : false
    })
        .state('root.parliament',{
        url: '/parliament',
        views: {           
            'content@': {
                templateUrl: 'views/nonauth/bootstrap/parliament.html'
            }
        },
        secured : false
    })
        .state('root.aboutconstituency',{
        url: '/aboutconstituency',
        views: {           
            'content@': {
                templateUrl: 'views/nonauth/bootstrap/aboutconstituency.html'
            }
        },
        secured : false
    })
        .state('root.vision',{
        url: '/mission-vision',
        views: {           
            'content@': {
                templateUrl: 'views/nonauth/bootstrap/mission-vision.html'
            }
        },
        secured : false
    })
        .state('root.initiatives',{
        url: '/initiatives',
        views: {           
            'content@': {
                templateUrl: 'views/nonauth/bootstrap/initiatives.html'
            }
        },
        secured : false
    })
        .state('root.gallery',{
        url:'/gallery',
        views: {           
            'content@': {
                templateUrl: 'views/nonauth/bootstrap/gallery.html'
            }
        },
        secured : false
    })
        .state('root.contactus',{
        url: '/contactus',
        views: {           
            'content@': {
                templateUrl: 'views/nonauth/bootstrap/contactus.html'
            }
        },
        secured : false
    })

}]);

});
