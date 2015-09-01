 

define(['directives/directiveModule', 'autocomplete'], function(directiveModule) {
    
  

    directiveModule.directive('autocompleteAddressDirective', ["registerService",
      
            function(registerService) {         

                var availableTags = [{

                    "value": "502001",
                    "label": "Hyderabad, madhapur, 502001",
                    "vvv": "Hyderabad, madhapur, 502001"
                }, {
                    "value": "Bangalore",
                    "label": "Hyd, patacheru, 502002"
                }, {

                    "value": "Mumbai",
                    "label": "Hyd, xxx, 502001"
                }];


                function addressStringifier(addressArray) {
                    var addressObjArray = [];

                    for (var i = 0; i < addressArray.length; i++) {
                        var addressObj = {};
                        var addressString = "";
                        addressString = addressArray[i].officeName+","+addressArray[i].district + "," + addressArray[i].divisionName + "," + addressArray[i].regionName + "," + addressArray[i].taluk + "," + addressArray[i].circleName + "," + addressArray[i].pincodeNumber;
                        addressObj.value = addressArray[i].pincodeNumber;
                        addressObj.label = addressString;
                        addressObj.fieldValueObj = addressArray[i];
                        addressObj.model = addressArray[i].postalAddressId;
                        addressObjArray.push(addressObj);

                    };

                    return addressObjArray;

                }

                return {
                    restrict: "A",
                    link: function(scope, elem, attrs) {

                        scope.addressCtrl.user = scope.addressCtrl.user || {};
                        scope.voterNodeObj = {};
                        scope.addressCtrl.user.postalAddress = {};


                        $("#searchIcon").on("click", function(e) {
                            e.stopPropagation();
                            var userInput = $(elem).find('input').val();
                            var isPincode = Boolean(Number(userInput));

                            if ((isPincode && userInput.length == 6)) {

                                registerService.getAddress(userInput, function(resp) {                                    
                                    var addressMap = addressStringifier(resp.data);
                                    enableAutoComplete(elem, addressMap);

                                });
                            }  
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
                                        console.log(data);
                                        console.log(scope);
                                        scope.addressCtrl.user.postalAddressId = data.item.model;
                                        scope.addressCtrl.voterNodeObj = data.item.fieldValueObj;
                                        console.log(scope.addressCtrl.user.postalAddressId);
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