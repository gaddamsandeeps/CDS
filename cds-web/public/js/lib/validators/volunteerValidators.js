// form specific.


//To map validation functions[public] to validate-key which in return 
//generates additional function with name of Validate-key  on methods object in validation module.

define(['validation'], function (validation) {

    return {
        volunteerId: {
            required: false,
            minCharacters: 3,
            maxCharacters: 16,
            key_error_msgs: true
        },
        areaOfInterest: {
            required: false,
            key_error_msgs: true
        },
        volunteerCategory: {
            required: false,
            key_error_msgs: true
        },
        leadId: {
            required: false,
            key_error_msgs: true
        },
        performanceGrade: {
            required: false,
            key_error_msgs: true
        },

    }

});