
 

define(['controllers/controllerModule','jquery'], function (controllerModule,$) {


	 controllerModule.controller('homeController', ["$scope", "$window", "$state", function( $scope, $window, $state ){

	 	$scope.$on('userAuthenticated', function(event, args) {
		    if(args === "Admin"){
		    	$window.location.href = "/admin";
		    }
		});

	 	 	/*Activity gallery settings*/
	 	this.activitiesCarouselconfig = {
	 			  dots: false,
			      infinite: true,
			      speed: 0,
			      fade: true,
			      cssEase: 'ease',
			      autoplay:false,
			      arrows:true,
			      mouseOutStop : false,
			      customNav : true,
			      prevBtnSelector : "#prevAct",
			      nextBtnSelector : "#nextAct"
	 	};
	}]);

});

