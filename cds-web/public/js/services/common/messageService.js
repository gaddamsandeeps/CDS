
define(['services/serviceModule'], function(serviceModule) {
    serviceModule.factory('messageService', ['$http',
        function($http) {
       

            return {

                getInitialState: function(role) {

                    switch (role) {
                        case "citizen":
                            return "citizen";
                            break;
                        default :
                            return "default";    
                    }
                }

              

            };
        }
    ]);
});