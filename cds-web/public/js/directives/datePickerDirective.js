
define(['directives/directiveModule','datepicker'], function (directiveModule) {
	directiveModule.directive('datePickerDirective', ["cdsService",function(cdsService){	
		var age;
		return {	
			restrict: "A",
			scope:{
				dob :'=datePickerDirective',
				futureDateDisabled : "=",
				pastDateDisabled : "="
			},		
			link: function(scope, elem, attrs) {						
				var maxDate = scope.futureDateDisabled? 0 : null;
				var minDate = scope.pastDateDisabled? 0 : null;

				$(elem).datepicker({
                    dateFormat:'dd/mm/yy',
					yearRange: "-100:+5",
					maxDate : maxDate,
					minDate : minDate, 
					changeMonth: true,
					changeYear: true,
                    onSelect:function (date) {					                   	
                    	scope.$apply(function(){
                    		scope.dob = date;
                    		$(elem).trigger("change");                    		
                    	});
						var selectedDate =$(elem).val().split('/'), 
							birthDate = new Date(selectedDate[2],selectedDate[1],selectedDate[0]),
							today = new Date(),
							diff =  today - birthDate,
							age = Math.floor(diff/31536000000);								
							cdsService.age = age;													                		
                    }
                });

                
				$("#ui-datepicker-div").addClass("datePickerCustom");
			}
		}		
	}]);
	
});

