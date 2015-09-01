
 

define(['directives/directiveModule','slick',"jquery"], function (directiveModule,slick,$) {
	directiveModule.directive('slickGalleryDirective', function(){			
		return {	
			restrict: "A",
			scope:{
			config: "="						
			},			
			link: function(scope, elem, attrs) {

					var defConfig = {
			       		  dots: true,
						  infinite: true,
						  speed: 500,
						  fade: true,
						  cssEase: 'linear',
						  autoplay:true,
						  autoplaySpeed : 1500,
						  mouseOutStop : true,
						  customNav : false		
					};					
					var modConfig = $.extend(true,defConfig, scope.config);	
					var slider = $(elem).slick(modConfig);					

					if(defConfig.mouseOutStop){
						slider.on("mouseout",function(){			  		
			  	 			slider.slick('slickPlay');			 
			  			});
					}

					if(defConfig.customNav){

						$(modConfig.prevBtnSelector).on('click', function(e){
						  e.preventDefault();  
						  $(elem).slick('slickPrev');
						});

						$(modConfig.nextBtnSelector).on("click", function(e){
						  e.preventDefault();
						$(elem).slick('slickNext');
						});
					}

			}
		}		
	});	
});

