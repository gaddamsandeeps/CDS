// form specific.


//To map validation functions[public] to validate-key which in return 
//generates additional function with name of Validate-key  on methods object in validation module.

define(['validation'], function(validation) {
    return {
    	childFname: {
    		required: true,
    		alphabets:true,
    		maxCharacters:25,
    		key_error_msgs:true
    	},
    	childMname: {
    		required: false,
    		alphabets:true,
    		maxCharacters:25,
    		key_error_msgs:true
    	},
    	childLname: {
    		required: true,
    		alphabets:true,
    		maxCharacters:25,
    		key_error_msgs:true
    	},
    	cdob: {
    		required:false,
			// date: true,			
			key_error_msgs:true
    	},
		spouseFirstName:{
			required:true,
			maxCharacters:25,
			key_error_msgs:true
		},
		spouseMiddleName:{
			required:false,
			maxCharacters:25,
			key_error_msgs:true	
		},
		spouseLastName:{
			required:true,
			maxCharacters:25,
			key_error_msgs:true
		},
		marriageDate:{
			required:false,
			// date: true,
			key_error_msgs:true
		},
		spouseEducation:{
			required:false,			
			key_error_msgs:true
		},	
		dob: {
			required:false,
			// date: true,			
			key_error_msgs:true
		}        		
    }

});