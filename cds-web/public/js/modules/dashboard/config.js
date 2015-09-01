
define(['appDashboard'], function (app) {


app.config(["$stateProvider", "$urlRouterProvider",function($stateProvider, $urlRouterProvider){
 
    $urlRouterProvider
    .otherwise('');
    
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
                templateUrl: 'views/common/bootstrap/footer.html',
                controller : "footerController as footerCtrl"                
            }
        }
    })
    .state('root.dashboard',{
        url: '',
        views: {           
            'content@': {
                templateUrl: 'views/auth/dashboard.html',
                controller : "dashboardController as dashboardCtrl"
            }
        },
        secured : false
    })

}]);

});
