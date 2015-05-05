'use strict';

angular.module('App.galerie.single', [
        'ui.router',
        'ngAnimate',

        'directives.fullFrame',
    ])
    .config(function($stateProvider) {

        $stateProvider
            .state('galerie.single', {
                url: '/:slug',
                views: {
                    'single': {
                        resolve: {
                            realisations: function(Api){
                                return Api.getRealisations();
                            }
                        },
                        templateUrl: 'app/galerie/single/single.html',
                        controller: 'SingleCtrl',
                        controllerAs: 'sgl'
                    }
                }
            });
    })
    .controller('SingleCtrl', function($scope, realisations, $stateParams) {

        var sgl = this;

        var post = realisations.filter(function(realisation){
            return realisation.slug === $stateParams.slug;
        });

        sgl.post = post[0];

    });
