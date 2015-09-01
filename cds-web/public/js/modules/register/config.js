/*global define*/
 


define(['appRegister'], function (app) {

  
app.run(["$rootScope","$state","$location","roleService","cdsService",function($rootScope, $state,$location,roleService,cdsService){

       $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){                       
    
        });

}]);

app.config(["$stateProvider", "$urlRouterProvider",function($stateProvider, $urlRouterProvider){
    $urlRouterProvider
    .otherwise('/');
    


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

    .state('root.register',{
        url: '',
        views: {           
            'content@': {
                templateUrl: 'views/nonauth/bootstrap/register.html',
                controller : "registerController as registerCtrl"
               
            }
        },
        secured : false
    })

}]);

});
