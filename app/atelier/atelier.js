'use strict';

angular.module('App.atelier', [
        'ui.router',
        'ngAnimate',

        'animations.atelier',

        'directives.timeline',
        'directives.onWheel',

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
    .controller('AtelierCtrl', function($scope) {

        var atlr = this;

        atlr.current = 0;

        atlr.history = [
            {
                title: '1980',
                baseline: 'rencontre entre pascalou et la grande vatone',
                content: 'Sous un beau soleil d\'été à la bibliothèque nationale, cette chère pascalou, nouvelle au bataillon des relieurs classiques, tombe sur la grande vatone, fervant défenseur de l\'écusson du coir doré. Une grande histoire née...',
                date: 1980,
                lieu: 'Bibliothèque Nationnale',
                name: 'rencontre'
            },
            {
                title: 'La Feuille d\'Or',
                baseline: 'Une feuille tombe, Une nouvelle histoire <3',
                content: 'Une nouvelle feuille se pose sur l\'asphalte de la rue de la tour d\'auvergne. Ce n\'est pourtant pas l\'automne, mais le printemps du livre, et les reliures y bourgeonne...',
                date: 1989,
                lieu: 'Paris',
                name: 'fondation'
            },
            {
                title: 'Bla, bla bla',
                baseline: 'blabla b la blla bllalblblbl',
                content: 'blblblb blzler blze zlallaqzl al alze azela zel alze alze lazeazel ae le zseseofse fselfslallq dqsl dlzdk qdlqlzdl qzldsllsqe flslfsl slfl fslelfslsf lsefsl flslsf lsfls flllflf ll sdf',
                date: 9000,
                lieu: 'BLcity',
                name: 'bl'
            }
        ];


        atlr.isAnimate = false;
        atlr.transitionDuration = 500;

        atlr.changeCurrent = function(direction){

            if(!atlr.isAnimate){

                atlr.isAnimate = true;

                setTimeout(function(){
                    atlr.isAnimate = false
                }, atlr.transitionDuration);

                if(direction.up){
                    if( atlr.current !== 0 ){
                        atlr.current -= 1;
                    }
                }else if(direction.down){
                    if( atlr.current !== atlr.history.length - 1 ){
                        atlr.current += 1;
                    }
                }
            }
        };

        atlr.up = function(){
            atlr.changeCurrent({up: true});
        };

        atlr.down = function(){
            atlr.changeCurrent({down: true});
        }

    });
