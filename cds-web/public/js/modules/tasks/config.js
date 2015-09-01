/*global define*/
 

define(['appTasks'], function (app) {


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

    .state('root.tasks',{
        url: '',
        views: {           
            'content@': {
                templateUrl: 'views/auth/tasks/bootstrap/task.html',
                controller : "taskController as taskCtrl" 
            }
        },
        secured : false
    })

    .state('root.viewTasks',{
        url: '/viewTasks/:taskId',        
        views: {           
            'content@': {
                templateUrl: 'views/auth/tasks/bootstrap/viewTasks.html',
                controller : "viewTaskController as viewTaskCtrl"
            }
        },
        secured : false
    })

    .state('root.addTask',{
        url: '/addTask',
        views: {           
            'content@': {
                templateUrl: 'views/auth/tasks/bootstrap/addTask.html',
                controller : "taskController as taskCtrl"
            }
        },
        secured : false
    })
    .state('root.teamTasks',{
        url: '/teamTasks',
        views: {           
            'content@': {
                templateUrl: 'views/auth/tasks/bootstrap/teamTask.html',
                controller : "taskController as taskCtrl"
            }
        },
        secured : false
    })
    .state('root.allTasks',{
        url: '/allTasks',
        views: {           
            'content@': {
                templateUrl: 'views/auth/tasks/bootstrap/allTasks.html',
                controller : "taskController as taskCtrl"
            }
        },
        secured : false
    })
    .state('root.supervisorviewAllTasks',{
        url: '/supervisorviewAllTasks',
        views: {           
            'content@': {
                templateUrl: 'views/auth/tasks/bootstrap/supervisorviewAllTasks.html',
                controller : "taskController as taskCtrl"
            }
        },
        secured : false
    })


}]);

});
