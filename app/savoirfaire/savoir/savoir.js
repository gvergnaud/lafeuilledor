'use strict';

angular.module('App.savoirfaire.savoir', [
        'ui.router',
        'directives.fullFrame',
        'directives.arrows'
    ])
    .config(function($stateProvider) {

        $stateProvider
            .state('savoirfaire.savoir', {
                url: '/:slug',
                views: {
                    'savoir': {
                        resolve: {
                            savoirs: function(Api){
                                return Api.getSavoirFaire();
                            }
                        },
                        templateUrl: 'app/savoirfaire/savoir/savoir.html',
                        controller: 'SavoirCtrl',
                        controllerAs: 's'
                    }
                }
            });
    })
    .controller('SavoirCtrl', function($scope, $stateParams, savoirs) {

        var s = this;

        var savoir = savoirs.filter(function(savoir){
            return savoir.slug === $stateParams.slug;
        });

        s.savoir = savoir[0];

    });
