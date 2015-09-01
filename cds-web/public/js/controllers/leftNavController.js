 
define(['controllers/controllerModule'], function (controllerModule) {

	 controllerModule.controller('leftNavController', ['$http','$location',"cdsService",'$rootScope', function($http,$location,cdsService,$rootScope){
		var self =this;
		this.items = [
			{path: '/edit/personal', title: 'Personal'},
			{path: '/edit/work', title:'Work Information'},
			{path: '/edit/voter', title: 'Voter Information'},
			{path: '/edit/address', title:'Residential Address'},
			{path: '/edit/volunteer',title:'Volunteer'},
			{path: '/edit/family',title:'Family'},
			{path: '/edit/cadre',title:'Cadre Information'}
		];
		
		this.isActive = function(item){
			if (item.path == $location.path()) {				
				return true;
			}
			return false;
		},		
		
		$rootScope.$on('$locationChangeSuccess', function(){			
			//self.isRegistered = cdsService.isRegistered;		
			
		});
	}]);

});

