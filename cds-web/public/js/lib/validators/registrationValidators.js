// form specific.


//To map validation functions[public] to validate-key which in return 
//generates additional function with name of Validate-key  on methods object in validation module.

define(['validation'], function(validation) {

    return {
        signupFirstName: {
            required : true,
            maxCharacters: 25,
            key_error_msgs: true
           
        },
        signupMiddleName: {
            required : false,
            maxCharacters: 25,
            key_error_msgs: true
          
        },
		signupLastName: {
            required : true,
            maxCharacters: 25,
            key_error_msgs: true
          
        },
        userName : {
            required : false,
            minCharacters: 6,
            maxCharacters: 16,
            alphaNumeric: true,
            key_error_msgs: true
        },
		dob:{
            required : true,
			date:true,
			key_error_msgs:true
		},     
		aadharId:{
            required : false,
			minCharacters: 5,
			key_error_msgs:true
		},
        userMobile:{
            required : true,
            regexMatch: /^[0-9]{10}$/,
            numeric: true,
            key_error_msgs: true     
        },
        userPhone:{
            required : false,
            minCharacters: 5,
            maxCharacters: 16,
            key_error_msgs: true                 
        },
        userEmail: {
            required : false,
            // regexMatch:/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            email: true,
            key_error_msgs: true
        },
        skypeId:{
            required : false,
            minCharacters: 5,
            maxCharacters: 16,
            key_error_msgs: true                
        },
		userQualification:{
			required:false,			
			key_error_msgs:true
		},
        userPassword : {
            required : true,
            minCharacters: 6,
            maxCharacters: 16,
            key_error_msgs:true
        }
    }

});