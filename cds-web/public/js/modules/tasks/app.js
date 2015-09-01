/*global define*/


define([
    'uiRouter',
    "ngStorage",
    'services/common/serviceLoader',
    "services/taskService",
    "controllers/taskController",
    "controllers/viewTaskController",
    "controllers/headerController",
    "directives/autoCompleteDirective",
    "directives/navDropdownDirective",
    "directives/datePickerDirective",
    "angularBootstrap",
    "services/common/appModalService",
    "modalControllers/cadreListController",
    "modalControllers/primeListController",
    "bootstrap",
    "directives/attachmentsPreviewDirective",
    "services/registerService"
], function() {
    var app = angular.module('CDSTASKS', ['ui.router', 'serviceModule', "controllerModule", "directiveModule", "ui.bootstrap", "ngStorage"]);
    return app;
});
