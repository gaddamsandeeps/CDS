define(['controllers/controllerModule', 'formValidation', 'validators/addtaskValidators', 'errorMessages/addtaskErrors', 'jquery', "messageHandler"], function(controllerModule, formValidation, validationMap, errorJson, $, messageHandler) {

    controllerModule.controller('adminController', ["$rootScope", '$state', '$http', "appUrlService", "cdsService", '$scope', '$location',
        function($rootScope, $state, $http, appUrls, cdsService, $scope, $location) {

            var self = this;
            
            this.items = [{
                    path: '/dataconfig',
                    title: 'Data Configuration'
                },{
                    path: '/usermgmt',
                    title: 'User Management'
                }, {
                    path: '/servicecenter',
                    title: 'Service Centre Management'
                }];

            this.isActive = function(item) {
                if (item.path == $location.path()) {
                    return true;
                }
                return false;
            }
        }
    ]);

});
