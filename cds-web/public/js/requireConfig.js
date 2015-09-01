require.config({

    paths: {

        "appHome": "modules/home/app",
        "configHome": "modules/home/config",

        "appSignin": "modules/signin/app",
        "configSignin": "modules/signin/config",

        "appForgotpwd": "modules/forgotpwd/app",
        "configForgotpwd": "modules/forgotpwd/config",

        "appRegister": "modules/register/app",
        "configRegister": "modules/register/config",

        "appCalendar": "modules/calendar/app",
        "configCalendar": "modules/calendar/config",

        "appInbox": "modules/inbox/app",
        "configInbox": "modules/inbox/config",

        "appTasks": "modules/tasks/app",
        "configTasks": "modules/tasks/config",

        "appDashboard": "modules/dashboard/app",
        "configDashboard": "modules/dashboard/config",

        "appProfile": "modules/profile/app",
        "configProfile": "modules/profile/config",

        "editprofile": "modules/editprofile/app",
        "configeditprofile": "modules/editprofile/config",

        "appRequests": "modules/requests/app",
        "configRequests": "modules/requests/config",

        "appAdmin":"modules/admin/app",
        "configAdmin": "modules/admin/config",

        /*Services, Controllers & directives*/
        "angular": 'lib/angular',
        'angularRoute': 'lib/angular-route',
        'angularAnimate': 'lib/angular-animate',
        'angularResource': 'lib/angular-resource',
        "services": "services",
        "directives": "directives",
        "controllers": "controllers",
        "uiRouter": "lib/angular-ui-router",
        "jquery": "lib/jquery",
        "underscore": "lib/min/underscore-min",
        "ngDialog": "lib/ngDialog",
        "validation": "lib/cdsValidator",
        "formValidation": "lib/formValidation",
        "core": "lib/jqueryui/core",
        "widget": "lib/jqueryui/widget",
        "tooltip": "lib/jqueryui/tooltip",
        "autocomplete": "lib/jqueryui/autocomplete",
        "datepicker": "lib/jqueryui/datepicker",
        "position": "lib/jqueryui/position",
        "inputTooltip": "lib/inputTooltip",
        "menu": "lib/jqueryui/menu",
        "uiRouterStyles": "lib/ui-router-styles",
        "validators": "lib/validators",
        "errorMessages": "lib/errorMessages",
        "ngStorage": "lib/ngStorage",
        "ngFlow" : "lib/ng-flow-standalone",
        /*Foundation*/
        "slick": "lib/slick",
        "simplyscroll": "lib/jquery.simplyscroll",
        "gallery": "lib/jqueryGallery",

        /*Dashboard*/

        "angularDashboard": "lib/dashboard/angular-dashboard",
        "dataModel": "lib/dashboard/datamodel",
        "angularCookies": "lib/dashboard/angular-cookies",

        "angularSanitize": "lib/dashboard/angular-sanitize",
        "angularNvd3": "lib/dashboard/angularjs-nvd3-directives",
        "d3": "lib/dashboard/d3.v3.min",
        "nvd3": "lib/dashboard/nv.d3",
        "bootstrap": "lib/bootstrap.min",
        "angularBootstrap": "lib/dashboard/ui-bootstrap-tpls",
        "angularSortable": "lib/dashboard/sortable",
        "jqueryUI": "lib/dashboard/jquery-ui",
        "angularWidgets": "lib/dashboard/angular-widgets",
        "angularTable": "lib/dashboard/angular-table",
        "pnotify": "lib/dashboard/pnotify.core",
        "angularPnotify": "lib/dashboard/angular-pnotify",
        "visibly": "lib/dashboard/visibly",
        "visibilityCore": "lib/dashboard/visibility.core",
        "widgetOptions": "lib/dashboard/widgetOptions",
        "foundation": "lib/foundation.min",
        "chartJs": "lib/charts/chart",
        "angularCharts": "lib/charts/angular-chart",

        "angularTouch": "lib/uiGrid/angular-touch",
        "angularGrid": "lib/uiGrid/ui-grid",
        "accordion": "lib/jqueryui/accordion",

        "sortable": "lib/jqueryui/sortable",
        "mouse": "lib/jqueryui/mouse",
        "evPointer": "utils/evPointer",
        "messageHandler": "lib/messageHandler",
        "notifications" : "i18n/notifications"
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        'angularResource': {
            exports: 'resource',
        },
        'underscore': {
            exports: '_'
        }
    }
});
