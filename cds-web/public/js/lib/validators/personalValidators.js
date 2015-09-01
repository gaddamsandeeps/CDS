// form specific.


//To map validation functions[public] to validate-key which in return 
//generates additional function with name of Validate-key  on methods object in validation module.

define(['validation'], function(validation) {

    return {
        signupFirstName: {
            required : true,
            maxCharacters: 25,
            alphabets : true,
            key_error_msgs: true
           
        },
        signupMiddleName: {
            required : false,
            maxCharacters: 25,
            alphabets : true,
            key_error_msgs: true          
        },
		signupLastName: {
            required : true,
            maxCharacters: 25,
            alphabets : true,
            key_error_msgs: true          
        },
        userName : {
            required : false,
            minCharacters: 6,
            maxCharacters: 16,
            alphaNumericPerid: true,
            key_error_msgs: true
        },
		dob:{
            required : true,
			date:true,
			key_error_msgs:true
		},     
		aadharId:{
            required : false,
            numeric : true,
			minCharacters: 12,
            maxCharacters: 12,
			key_error_msgs:true
		},
        userMobile:{
            required : true,
            numeric : true,
            minCharacters: 10,
            maxCharacters: 10,
            key_error_msgs: true     
        },
        userPhone:{
            required : false,
            numeric : true,
            minCharacters: 11,
            maxCharacters: 11,
            key_error_msgs: true                 
        },
        userEmail: {
            required : false,
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
			required:true,			
			key_error_msgs:true
		},
        userPassword : {
            required : true,
            minCharacters: 6,
            key_error_msgs:true
        }
    }

});