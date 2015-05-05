'use strict';

angular.module('App.galerie', [
        'ui.router',
        'ngAnimate',

        'App.galerie.single',

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
                        resolve: {
                            realisations: function(Api){
                                return Api.getRealisations();
                            }
                        },
                        templateUrl: 'app/galerie/galerie.html',
                        controller: 'GalerieCtrl',
                        controllerAs: 'glr'
                    }
                }
            });
    })
    .controller('GalerieCtrl', function($scope, realisations) {

        var glr = this;

        glr.posts = realisations;

        // glr.posts = [
        //     {
        //         title: 'Photo 1',
        //         description: 'lorem blablabla... voilavoila',
        //         url: 'assets/images/IMG_9470.jpg'
        //     },
        //     {
        //         title: 'Photo 2',
        //         description: 'lorem blablabla... voilavoila',
        //         url: 'assets/images/IMG_9520.jpg'
        //     },
        //     {
        //         title: 'Photo 1',
        //         description: 'lorem blablabla... voilavoila',
        //         url: 'assets/images/IMG_9543.jpg'
        //     },
        //     {
        //         title: 'Photo 1',
        //         description: 'lorem blablabla... voilavoila',
        //         url: 'assets/images/IMG_9574.jpg'
        //     },
        //     {
        //         title: 'Photo 1',
        //         description: 'lorem blablabla... voilavoila',
        //         url: 'assets/images/IMG_9650.jpg'
        //     },
        //     {
        //         title: 'Photo 1',
        //         description: 'lorem blablabla... voilavoila',
        //         url: 'assets/images/texture.jpg'
        //     }
        // ];


        glr.config = {
            nbCol: 3,
            margin: 15,
            width: 300
        };

        angular.element(window).on('resize', function(){
            glr.config.width = (window.innerWidth < 3 * (glr.config.margin + glr.config.width)) ? window.innerWidth /3 : glr.config.width;
        });

    });
