define(['directives/directiveModule'], function(directiveModule) {
    directiveModule.directive('resourceDirective', ["registerService",
        function(registerService) {

            return {
                restrict: "A",

                link: function(scope, elem, attrs) {

                    scope.dataJson = {}
                    var self;

                    resetStatus();


                    function availableSuccessCb(resp, userAvailableMsg, userNotAvailableMsg, inputName) {
                        $(self).next(".loader-container").remove();
                        if (resp.status == "success") {
                            if (resp.data.status) {
                                if (resp.data.valid == false) {
                                    $(self).closest(".row").addClass("error-field");
                                    $(self).after("<span class='status-message error-state'>" + resp.data.message + "</span>");
                                    setValidity(inputName, false);
                                } else {
                                    $(self).closest(".row").removeClass("error-field");
                                    $(self).after("<span class='status-message'>" + resp.data.message + "</span>");
                                    setValidity(inputName, true);
                                }
                            } else {
                                $(self).closest(".row").removeClass("error-field");
                                $(self).after("<span class='status-message'>" + userAvailableMsg + "</span>");
                                setValidity(inputName, true);
                            }

                        } else {
                            $(self).closest(".row").addClass("error-field");
                            $(self).after("<span class='status-message error-state'>Something went wrong. Please try again.</span>");
                            setValidity(inputName, false);
                        }
                    }

                    function setValidity(inputField, result) {
                        if (inputField == "userName") {
                            scope.isValidUsername = result;
                        } else if (inputField == "email") {
                            scope.isValidEmail = result;
                        } else {
                            scope.isValidMobileNo = result;
                        }

                    }


                    function resetStatus() {

                        $(elem).closest(".row").find(".loader-container").remove();
                        $(elem).closest(".row").find(".status-message").remove();
                        $(elem).closest(".row").removeClass("error-field");

                    }

                    scope.$on("clearServiceErrors", function() {
                        console.log("called");
                        //$(".error-field").removeClass("error-field");
                        $(".status-message").remove();
                    });


                    $(elem).on("blur", ".loader-input", function() {

                        var curElemValue = $(this).val().trim();

                        console.log(curElemValue);
                        var userInput = $(elem).find(".loader-input").val().trim();
                        var inputName = $(elem).find(".loader-input").data("inputname");

                        if ((inputName == "userName" && curElemValue != scope.dataJson.loginId) || (inputName == "mobileNumber" && curElemValue != scope.dataJson.mobileNumber) || (inputName == "email" && curElemValue != scope.dataJson.emailId)) {

                            scope.$broadcast("clearErrors");
                            self = this;

                            resetStatus();

                            if (userInput) {
                                $(this).after("<span class='loader-container'><img src='images/cds-loader.gif'></span>");


                                var userAvailableMsg,
                                    userNotAvailableMsg;

                                if (inputName == "userName") {
                                    if (curElemValue.length < 6) {
                                        $(elem).closest(".row").addClass("error-field");
                                        $(elem).closest(".row").find(".loader-container").remove();
                                        $(elem).closest(".row").find(".error-content").html("Username should be minimum of 6 characters");
                                        return;
                                    }
                                    if (curElemValue.length > 16) {
                                        $(elem).closest(".row").addClass("error-field");
                                        $(elem).closest(".row").find(".loader-container").remove();
                                        $(elem).closest(".row").find(".error-content").html("Username should be less than 16 characters");
                                        return;
                                    }
                                    // userAvailableMsg = "Username is available.";
                                    // userNotAvailableMsg = "Username not available";
                                    registerService.checkUserNameExists(userInput, availableSuccessCb, userAvailableMsg, userNotAvailableMsg);
                                } else if (inputName == "mobileNumber") {
                                    // var reg = /^[0-9]{1,10}$/;
                                    // if (!reg.test(curElemValue)) {
                                    //     $(elem).closest(".row").addClass("error-field");
                                    //     $(elem).closest(".row").find(".loader-container").remove();
                                    //     $(elem).closest(".row").find(".error-content").html("Please enter numbers only.");
                                    //     return;
                                    // }
                                    // var mobileval = curElemValue.length === 10 ? true : false;
                                    // if (mobileval === false) {
                                    //     $(elem).closest(".row").addClass("error-field");
                                    //     $(elem).closest(".row").find(".loader-container").remove();
                                    //     $(elem).closest(".row").find(".error-content").html("Mobile number should be 10 digits.");
                                    //     return;
                                    // }
                                    // userAvailableMsg = "Mobile Number is available for registration.";
                                    // userNotAvailableMsg = "Mobile Number is not available for registration.";
                                    registerService.checkMobileNoExists(userInput, availableSuccessCb, userAvailableMsg, userNotAvailableMsg);
                                } else if (inputName == "email") {
                                    // var reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
                                    // if (!reg.test(curElemValue)) {
                                    //     $(elem).closest(".row").addClass("error-field");
                                    //     $(elem).closest(".row").find(".loader-container").remove();
                                    //     $(elem).closest(".row").find(".error-content").html("Please enter valid email id.");
                                    //     return;
                                    // }
                                    // userAvailableMsg = "Email is available for registration.";
                                    // userNotAvailableMsg = "Email is not available for registration.";
                                    registerService.checkEmailExists(userInput, availableSuccessCb, userAvailableMsg, userNotAvailableMsg);
                                }

                                $("#submitPersonalInfo").on("click", function() {
                                    resetStatus();
                                });
                            } else {
                                scope.$broadcast("clearErrors");
                            }
                        } else {

                            resetStatus();
                        }

                    });

                }
            }
        }
    ]);

});
