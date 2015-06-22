'use strict';

angular.module('App.atelier', [
        'ui.router',
        'ngAnimate',

        'App.atelier.clients',

        'animations.atelier',

        'directives.timeline',
        'directives.onWheel',
        'directives.fullFrame',
        'directives.textClip',
        'directives.zigouigoui',

        'services.Api',

        'filters.index'
    ])
    .config(function($stateProvider) {

        $stateProvider
            .state('atelier', {
                url: '/atelier',
                views: {
                    'main': {
                        resolve: {
                            histoire: function(Api){
                                return Api.getHistoire();
                            }
                        },
                        templateUrl: 'app/atelier/atelier.html',
                        controller: 'AtelierCtrl',
                        controllerAs: 'atlr'
                    }
                }
            });
    })
    .controller('AtelierCtrl', function($scope, $rootScope, $state, Api, histoire) {

        var atlr = this;

        function computeData(histoire){
            atlr.history = histoire.sort(function(a, b){
                return a.date - b.date;
            });
        }

        atlr.current = 0;

        computeData(histoire);

        atlr.isAnimate = false;
        atlr.transitionDuration = 1000;

        atlr.changeCurrent = function(direction){
            if(!atlr.isAnimate &&  $state.current.name === 'atelier'){
                atlr.isAnimate = true;

                setTimeout(function(){
                    atlr.isAnimate = false
                }, atlr.transitionDuration);

                if(direction === 'up'){
                    if( atlr.current !== 0 ){
                        $rootScope.$emit('TIMELINE_SCROLL_UP');
                        atlr.current -= 1;
                    }
                }else if(direction === 'down'){
                    if( atlr.current !== atlr.history.length - 1 ){
                        $rootScope.$emit('TIMELINE_SCROLL_DOWN');
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
        };

        atlr.getColor = function(){
            if(atlr.current === 0 || atlr.current === 2 ||atlr.current === 4){
                // beige theme
                return '#515151';
            }

            else if(atlr.current === 3 || atlr.current === 5){
                // saumon theme
                return '#e6dcd1';
            }

            else if(atlr.current === 1){
                // dark theme
                return '#e6dcd1';
            }
        }


        $rootScope.$on('APP_LANGUAGE_CHANGE', function() {
            Api.getHistoire().then(computeData);
        });
    });
