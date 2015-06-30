'use strict';

angular.module('App.contact', [
        'App.contact.membre',
        'ui.router'
    ])
    .config(function($stateProvider) {

        $stateProvider
            .state('contact', {
                url: '/contact',
                views: {
                    'main': {
                        templateUrl: 'app/contact/contact.html',
                        controller: 'ContactCtrl',
                        controllerAs: 'contact'
                    }
                }
            });
    })
    .controller('ContactCtrl', function($scope) {

    });
