'use strict';

angular.module('App', [
        'App.home',
        'App.atelier',
        'App.savoirfaire',
        'App.galerie',
        'App.formation',
        'App.contact',

        'ui.router',
        'ngAnimate',
        'ngSanitize',

        'directives.menu',

        'animations.app',

        'services.Api'
    ])
    .config(function($locationProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise('/');

    })
    .controller('AppCtrl', function($scope, $rootScope, Api) {
        var app = this;

        app.language = 'fr';

        Api.getAll();

        app.changeLanguage = function(language){
            if(app.language === language) return;

            app.language = language;
            Api.setLanguage(language);
            Api.getAll(true)
                .then(function(data){
                    $rootScope.$emit('APP_LANGUAGE_CHANGE', language);
                });
        };

        app.stopEventPropagation = function(e){
            e.stopPropagation();
        };
    });
