'use strict';

angular.module('App.galerie', [
        'ui.router',
        'ngAnimate',

        'directives.timeline',
        'directives.onWheel',
        'directives.fullFrame',
        'directives.gallery'
    ])
    .config(function($stateProvider) {

        $stateProvider
            .state('galerie', {
                url: '/realisations',
                views: {
                    'main': {
                        templateUrl: 'app/galerie/galerie.html',
                        controller: 'GalerieCtrl',
                        controllerAs: 'glr'
                    }
                }
            });
    })
    .controller('GalerieCtrl', function($scope) {

        var glr = this;

        glr.posts = [
            {
                title: 'Photo 1',
                url: 'assets/images/IMG_9470.jpg'
            },
            {
                title: 'Photo 2',
                url: 'assets/images/IMG_9520.jpg'
            },
            {
                title: 'Photo 1',
                url: 'assets/images/IMG_9543.jpg'
            },
            {
                title: 'Photo 1',
                url: 'assets/images/IMG_9574.jpg'
            },
            {
                title: 'Photo 1',
                url: 'assets/images/IMG_9650.jpg'
            },
            {
                title: 'Photo 1',
                url: 'assets/images/texture.jpg'
            }
        ];

    });
