'use strict';

angular.module('App.home', [
        'ui.router'
    ])
    .config(function($stateProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    'main': {
                        templateUrl: 'app/home/home.html',
                        controller: 'HomeCtrl',
                        controllerAs: 'home'
                    }
                }
            });
    })
    .controller('HomeCtrl', function($scope) {

    });
