/*global define*/
 

define(['uiRouter',
	"ngStorage",
	'services/common/serviceLoader',
	'services/common/appModalService',	
	"controllers/forgotpwdController",
	"controllers/headerController",
	"angularBootstrap",
	"bootstrap",
	"ngFlow"], function () {
    var app = angular.module('CDSFORGOTPWD', ['ui.router','serviceModule',"controllerModule","ngStorage","ui.bootstrap","flow"]);
    return app;
});
