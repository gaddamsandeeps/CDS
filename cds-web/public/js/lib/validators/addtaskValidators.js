define(['validation'], function(validation){
	return {
		assignedToCitizenName: {
			required: true,
			key_error_msgs:true
		},
		taskCategoryId: {
			required: true,
			key_error_msgs:true
		},
		priorityId: {
			required: true,
			key_error_msgs:true
		},
		taskDescription: {
			required: true,
			key_error_msgs: true
		},
		toDate: {
			required: true,
			key_error_msgs: true
		},
		location: {
			required: true,
			key_error_msgs: true
		}
	}
});