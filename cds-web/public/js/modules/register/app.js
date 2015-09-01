/*global define*/
 

define(['uiRouter',
	"ngStorage",
	'services/common/serviceLoader',
	'services/registerService',
	'services/common/appModalService',	
	"controllers/registerController",
	"directives/resourceDirective",
	"directives/datePickerDirective",
	"controllers/headerController",
	"modalControllers/registerOverlayController",
	"angularBootstrap",
	"bootstrap",
	"ngFlow",
	"directives/imagePreviewDirective"], function () {
    var app = angular.module('CDSREGISTER', ['ui.router','serviceModule',"controllerModule","directiveModule","ngStorage","ui.bootstrap","flow"]);
    return app;
});
