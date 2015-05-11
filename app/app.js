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

        'directives.menu',

        'services.Api'
    ])
    .config(function($locationProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise('/');

    })
    .controller('AppCtrl', function($scope, Api) {
        var app = this;

        Api.setLanguage('en');
        Api.getAll().then(function(data){
            console.log(data);
        });
    });
