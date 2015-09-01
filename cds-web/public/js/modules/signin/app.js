/*global define*/
 

define(['uiRouter',
	"ngStorage",
	'uiRouterStyles',
	'services/common/serviceLoader',
	'controllers/signinController',
	"controllers/headerController",
	"services/common/appModalService",
	"modalControllers/sessionOutOverlayController",
	"angularBootstrap",
	"controllers/sessionOutController",
	"bootstrap"	], function () {
    var app = angular.module('CDSSIGNIN', ['ui.router','uiRouterStyles','serviceModule','controllerModule',"ngStorage","ui.bootstrap"]);
    return app;
});
