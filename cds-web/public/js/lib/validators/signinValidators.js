define(['validation'], function(validation) {
	return {
		signInUsername: {
			required : true,
			key_error_msgs: true
		},
		signPassword: {
			required: true,
			key_error_msgs: true
		}
	}
});