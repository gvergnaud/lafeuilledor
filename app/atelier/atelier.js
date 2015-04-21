'use strict';

angular.module('App.atelier', [
        'ui.router',
        'ngAnimate',

        'animations.atelier',

        'directives.timeline',
        'directives.onWheel',
        'directives.fullFrame',
        'directives.textClip',

        'filters.index'
    ])
    .config(function($stateProvider) {

        $stateProvider
            .state('atelier', {
                url: '/atelier',
                views: {
                    'main': {
                        templateUrl: 'app/atelier/atelier.html',
                        controller: 'AtelierCtrl',
                        controllerAs: 'atlr'
                    }
                }
            });
    })
    .controller('AtelierCtrl', function($scope, $rootScope) {

        var atlr = this;

        atlr.current = 0;

        atlr.history = [
            {
                title: '1980',
                baseline: 'rencontre entre pascalou et la grande vatone',
                content: 'Sous un beau soleil d\'été à la bibliothèque nationale, cette chère pascalou, nouvelle au bataillon des relieurs classiques, tombe sur la grande vatone, fervant défenseur de l\'écusson du coir doré. Une grande histoire nait...',
                date: 1980,
                lieu: 'Bibliothèque Nationnale',
                name: 'rencontre',
                bg: 'assets/images/IMG_9520.jpg'
            },
            {
                title: '1990',
                baseline: 'Une feuille tombe, Une nouvelle histoire <3',
                content: 'Une nouvelle feuille se pose sur l\'asphalte de la rue de la tour d\'auvergne. Ce n\'est pourtant pas l\'automne, mais le printemps du livre, et les reliures y bourgeonnent...',
                date: 1989,
                lieu: 'Paris',
                name: 'fondation',
                bg: 'assets/images/IMG_9470.jpg'

            },
            {
                title: 'Now !?',
                baseline: 'la formation niga',
                content: 'et bein maintenant, la famille ça va, inchala, sisi trankil, mais bon l temps passe vite, les enfants sont grand, la vie est court, mais bon on se plein pas, on a trop de gold tout façon donc easylife.',
                date: 2007,
                lieu: 'BLcity',
                name: 'formation',
                bg: 'assets/images/IMG_9650.jpg'
            },
            {
                title: 'Now !?',
                baseline: 'la formation niga',
                content: 'et bein maintenant, la famille ça va, inchala, sisi trankil, mais bon l temps passe vite, les enfants sont grand, la vie est court, mais bon on se plein pas, on a trop de gold tout façon donc easylife.',
                date: 2015,
                lieu: 'BLcity',
                name: 'formation',
                bg: 'assets/images/IMG_9650.jpg'
            }
        ];


        atlr.isAnimate = false;
        atlr.transitionDuration = 1000;

        atlr.changeCurrent = function(direction){

            if(!atlr.isAnimate){
                atlr.isAnimate = true;


                setTimeout(function(){
                    atlr.isAnimate = false
                }, atlr.transitionDuration);

                if(direction === 'up'){
                    if( atlr.current !== 0 ){
                        $rootScope.$emit('ATELIER_SCROLL_UP');
                        atlr.current -= 1;
                    }
                }else if(direction === 'down'){
                    if( atlr.current !== atlr.history.length - 1 ){
                        $rootScope.$emit('ATELIER_SCROLL_DOWN');
                        atlr.current += 1;
                    }
                }
            }
        };

        atlr.up = function(){
            atlr.changeCurrent('up');
        };

        atlr.down = function(){
            atlr.changeCurrent('down');
        }

    });
