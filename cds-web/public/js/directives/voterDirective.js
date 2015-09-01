 

define(['directives/directiveModule', 'autocomplete'], function(directiveModule) {
    directiveModule.directive('autocompleteVoterDirective', ["registerService",
            function(registerService) {

                function addressStringifier(addressArray,userInput) {
                    var addressObjArray = [];

                    for (var i = 0; i < addressArray.length; i++) {
                        var addressObj = {};
                        var addressString = "";
                        addressString = addressArray[i].constituency;
                        addressObj.label = addressString;
                        addressObj.fieldValueObj = generateParamObject(addressString);
                        addressObj.model = addressArray[i].treeDataId;
                        addressObj.value = userInput;
                        addressObjArray.push(addressObj);
                    };
                    return addressObjArray;
                }



                function generateParamObject(objString){                    
                    objString = objString || "";
                    var keysArray = objString.split(",");
                    var keysObj = {};                    
                    for(var i=0; i<keysArray.length; i++){
                        var splitArray = keysArray[i].split(":");
                        keysObj[splitArray[0]]=splitArray[1];
                    }
                    return keysObj;
                }

                return {
                    restrict: "A",
                    link: function(scope, elem, attrs) {

                     scope.voterNodeObj = {};
                     scope.voterCtrl.user = {};



                        $("#searchIcon").on("click", function(e) {
                            e.stopPropagation();

                            var userInput = $(elem).find('input').val().trim();

                                registerService.getConstituencyInfo(userInput, function(resp) {
                                    var addressMap = addressStringifier(resp.data, userInput);

                                    enableAutoComplete(elem, addressMap);
                                });

                           
                        });

                        $('body').not("#searchIcon").on("click", function() {
                            
                            var autoCompleteInstance = $(elem).find("input").autocomplete("instance");
                            
                            if (autoCompleteInstance) {
                                $(elem).find("input").autocomplete("close");
                                $(elem).find("input").autocomplete("disable");
                            }

                        });


                        function enableAutoComplete(elem, addressMap) {

                            var autoCompleteInstance = $(elem).find("input").autocomplete("instance");
                            if (autoCompleteInstance) {
                                $(elem).find("input").autocomplete("enable");
                            }

                            $(elem).find("input").autocomplete({
                                appendTo: "#autoCompleteContainer",
                                source: addressMap,
                                select: function(e, data) {
                                    scope.$apply(function(){
                                        scope.voterCtrl.user.treeDataId = data.item.model;
                                        scope.voterNodeObj = data.item.fieldValueObj;
                                    });
 


                                }
                            }).focus(function() {
                                $(this).autocomplete('search', $(this).val())
                            });

                            $(elem).find("input").trigger('focus');
                        }

                    }
                }
            }
        ]

    );


});