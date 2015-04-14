'use strict';

angular.module('App.galerie', [
        'ui.router'
    ])
    .config(function($stateProvider) {

        $stateProvider
            .state('galerie', {
                url: '/realisations',
                views: {
                    'main': {
                        templateUrl: 'app/galerie/galerie.html',
                        controller: 'GalerieCtrl',
                        controllerAs: 'galerie'
                    }
                }
            });
    })
    .controller('GalerieCtrl', function($scope) {

    });
