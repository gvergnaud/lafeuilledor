'use strict';

angular.module('App.savoirfaire', [
        'ui.router',
        'directives.textClip'
    ])
    .config(function($stateProvider) {

        $stateProvider
            .state('savoirfaire', {
                url: '/savoir-faire',
                views: {
                    'main': {
                        templateUrl: 'app/savoirfaire/savoirfaire.html',
                        controller: 'SfCtrl',
                        controllerAs: 'sf'
                    }
                }
            });
    })
    .controller('SfCtrl', function($scope) {

    });
