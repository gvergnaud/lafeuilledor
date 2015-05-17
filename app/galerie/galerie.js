'use strict';

angular.module('App.galerie', [
        'ui.router',
        'ngAnimate',

        'App.galerie.single',

        'directives.timeline',
        'directives.onWheel',
        'directives.fullFrame',
        'directives.gallery',

        'filters.slice'
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
    .controller('GalerieCtrl', function($scope, $rootScope, $state, $timeout, realisations) {

        var glr = this;

        glr.posts = [];

        $timeout(function(){
            glr.posts = realisations;
            glr.nbTabs = Math.ceil(glr.posts.length / glr.config.postsPerPage);
        }, 200);

        glr.config = {
            nbCol: 3,
            margin: 15,
            width: 300,
            postsPerPage: 6
        };

        glr.current = 0;

        glr.isThumbnailsOpen = $state.current.name === 'galerie';

        glr.direction = 'down';
        glr.isAnimate = false;
        glr.transitionDuration = 1000;

        glr.changeCurrent = function(direction){
            if(!glr.isAnimate && glr.isThumbnailsOpen){
                glr.isAnimate = true;

                setTimeout(function(){
                    glr.isAnimate = false
                }, glr.transitionDuration);

                if(direction === 'up'){
                    if( glr.current !== 0 ){
                        $rootScope.$emit('GALLERY_RESTART');
                        $rootScope.$emit('TIMELINE_SCROLL_UP');
                        glr.current -= 1;
                    }
                }else if(direction === 'down'){
                    if( glr.current !== glr.nbTabs - 1){
                        $rootScope.$emit('GALLERY_RESTART');
                        $rootScope.$emit('TIMELINE_SCROLL_DOWN');
                        glr.current += 1;
                    }
                }
            }
        };

        glr.up = function(){
            glr.direction = 'up';
            $timeout(function () {
                glr.changeCurrent('up');
            }, 50);
        };

        glr.down = function(){
            glr.direction = 'down';
            $timeout(function () {
                glr.changeCurrent('down');
            }, 50);
        };



        angular.element(window).on('resize', function(){
            var nbCol = (window.innerWidth > 1000) ? 3 : ((window.innerWidth > 700) ? 2 : 1);
            if (glr.config.nbCol !== nbCol)
                glr.config.nbCol = nbCol;
        });

    });
