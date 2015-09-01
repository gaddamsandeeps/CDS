
 

define(['controllers/controllerModule'], function (controllerModule) {

	controllerModule.controller('viewController', ["$http","$stateParams","appUrlService", function ($http,stateParams,appUrlService) {
		
		var currentId = stateParams.id;
    var self = this;
		
  $http.get(appUrlService.getUserView,{

        params : {
          userId : currentId
        }

    } ).success(function(resp){
        self.user = resp.data;
        console.log(resp);

    });




		var userMockData = [ {
      "citizenId": "1",
      "firstName": "Roop",
      "lastName": "Padala",
      "gender": "M",
      "phoneNumber": "2323331221",
      "email": "rpadala@nisum.com",
      "skype": "rpadala",
      "age": "27",
      "photo": "",
      "roles": "Citizen,Cadre,Volunteer"
    },
    {
      "citizenId": "2",
      "firstName": "Ramesh",
      "lastName": "Polishetti",
      "gender": "M",
      "phoneNumber": "8297251955",
      "email": "rpolishetti@nisum.com",
      "skype": "rpolishetti",
      "age": "27",
      "photo": "",
      "roles": "Citizen,Cadre,Volunteer"
    },
    {
      "citizenId": "3",
      "firstName": "Shiva",
      "lastName": "Audam",
      "gender": "M",
      "phoneNumber": "3432344432",
      "email": "saudam@nisum.com",
      "skype": "saudam",
      "age": "27",
      "photo": "",
      "roles": "Citizen,Cadre,Volunteer"
    }];


  /*  this.user = returnCurrentUser(userMockData,currentId); 

		function returnCurrentUser(userArray, id){
			for(var i=0; i<userArray.length; i++){
				if(id == userArray[i].citizenId){
					return userArray[i];
				}
			}
		}

*/






	}]);

	

		

	

});

