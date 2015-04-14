'use strict';

angular.module('App.formation', [
        'ui.router'
    ])
    .config(function($stateProvider) {

        $stateProvider
            .state('formation', {
                url: '/formations-conferences',
                views: {
                    'main': {
                        templateUrl: 'app/formation/formation.html',
                        controller: 'FormationCtrl',
                        controllerAs: 'formation'
                    }
                }
            });
    })
    .controller('FormationCtrl', function($scope) {

    });
