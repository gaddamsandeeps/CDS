 

define(['directives/directiveModule', 'autocomplete'], function(directiveModule) {
    directiveModule.directive('autoCompleteDirective', ["cdsService","taskService",
            function(cdsService,taskService) { 




                function cadreStringifier(cadreArray) {
                    var cadreObjArray = [];

                    for (var i = 0; i < cadreArray.length; i++) {
                        var cadreObj = {};
                        var cadreString = "";
                        cadreString = cadreArray[i].firstName+","+cadreArray[i].lastName+","+cadreArray[i].mobileNumber;
                        cadreObj.value = cadreArray[i].firstName+","+cadreArray[i].lastName;
                        cadreObj.label = cadreString;
                        cadreObj.fieldValueObj = cadreArray[i];
                        cadreObj.model = cadreArray[i].citizenId;                                             
                        cadreObjArray.push(cadreObj);
                    };
                    return cadreObjArray;
                }                    

                return {
                    restrict: "A",                    
                    link: function(scope, elem, attrs) {


                         console.log("ehello");

                         $("#searchIcon").on("click", function(e) {
                            e.stopPropagation();

                            var userInput = $(elem).find('input').val().trim();
                            console.log(userInput);
                            
                            taskService.getCadres(userInput, function(resp) {
                                console.log(resp);
                                var cadreMap = cadreStringifier(resp.data);
                                console.log(cadreMap);
                                enableAutoComplete(elem, cadreMap);
                            });
                            

                           
                        });
                         function enableAutoComplete(elem, cadreMap) {




                            var autoCompleteInstance = $(elem).find("input").autocomplete("instance");

                                console.log(autoCompleteInstance);

                            if (autoCompleteInstance) {
                                $(elem).find("input").autocomplete("enable");
                            }


                            console.log(cadreMap);

                            $(elem).find("input").autocomplete({
                                appendTo: "#autoCompleteContainer",
                                source: cadreMap,
                                select: function(e, data) {
                                    
                                    scope.$apply(function(){
                                        scope.taskCtrl.user.taskWorkAllocation.citizenId = data.item.model;                                        
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