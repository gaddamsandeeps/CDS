 define(['directives/directiveModule', 'messageHandler', 'notifications'], function(directiveModule, messageHandler, notifications) {
     directiveModule.directive('imagePreviewDirective', ["registerService", "appUrlService", "$timeout",
             function(registerService, appUrls, $timeout) {
                 return {
                     restrict: "A",
                     link: function(scope, elem, attrs) {
                         var acceptedFormats = ['jpg', 'jpeg', 'png'];
                         var imgMsgTracker = new messageHandler.msgTracker({
                             containerId: "imgErrWrapper",
                             className: "img-status",
                             timer : 200
                         });

                         scope.initiateUpload = false;
                         scope.showBrowseBtn = true;

                         elem.find("#browseImg").on("click",function() {
                             $("#profileHandler").trigger("click");
                         });

                         var fileObj = {};

                         scope.setProfileImage = function(fileInput) {
                             fileObj = fileInput.files[0];                                                          
                             
                             if(!validateFormat(fileObj)){
                                return;
                             }
                             
                             var reader = new FileReader();
                             reader.onloadend = function(e) {
                                 showUploadedItem(e.target.result);
                                 scope.initiateUpload = true;
                             };
                             reader.readAsDataURL(fileObj);
                         }


                         function validateFormat(fileObj) {

                             var fExt = fileObj.name.substr(fileObj.name.lastIndexOf('.') + 1);
                             if (acceptedFormats.indexOf(fExt) == -1) {
                                 imgMsgTracker.showError(notifications.invalid_img_format_msg);
                                 return false;
                             } else {
                                 imgMsgTracker.hideStatus();
                                 return true;
                             }
                         }




                         function showUploadedItem(imgSrc) {
                             $("#previewHolder").attr("src", imgSrc);
                         }



                         scope.submitProfileImageForm = function(e) {
                             e.preventDefault();

                             var formFileObj = new FormData();
                             formFileObj.append("photograph", fileObj);

                             if (scope.initiateUpload) {
                                 imgMsgTracker.hideStatus();
                                 scope.showBrowseBtn = false;
                                 scope.showLoader = true;
                                 var imageUploadPromise = $.ajax({
                                     xhr: function() {
                                         var xhr = new window.XMLHttpRequest();

                                         xhr.upload.addEventListener("progress", function(evt) {
                                             console.log(evt.loaded);
                                             if (evt.lengthComputable) {

                                                 scope.$apply(function() {
                                                     var percentComplete = (evt.loaded / evt.total) * 100;
                                                     scope.uploadPercentage = scope.uploadStatusMsg = percentComplete + "%";
                                                 });
                                             }
                                         }, false);

                                         xhr.upload.addEventListener("load", function(evt) {

                                         });
                                         return xhr;
                                     },
                                     type: "POST",
                                     url: appUrls.updateProfileImage,
                                     data: formFileObj,
                                     processData: false,
                                     contentType: false

                                 }).success(function(resp, status, headers, config) {
                                    $timeout(function() {
                                             window.location.href = "/profile";
                                         }, 2000);

                                 }).error(function() {

                                 });
                             } else {
                                 imgMsgTracker.showError(notifications.choose_new_img);
                             }

                         }

                     }
                 }
             }
         ]

     );


 });