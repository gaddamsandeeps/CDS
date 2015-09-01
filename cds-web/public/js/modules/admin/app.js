/*global define*/


define([
    'uiRouter',
    "ngStorage",
    'services/common/serviceLoader',
    "services/taskService",
    "controllers/requestController",
    "controllers/viewTaskController",
    "controllers/headerController",
    "controllers/adminController",
    "controllers/userMgmtController",
    "controllers/admin/dataconfigController",
    "controllers/serviceCenterMgmtController",
    "directives/autoCompleteDirective",
    "directives/navDropdownDirective",
    "directives/datePickerDirective",
    "angularBootstrap",
    "services/common/appModalService",
    "modalControllers/cadreListController",
    "bootstrap"
], function() {
    var app = angular.module('CDSADMIN', ['ui.router', 'serviceModule', "controllerModule", "directiveModule", "ui.bootstrap", "ngStorage"]);
    return app;
});
