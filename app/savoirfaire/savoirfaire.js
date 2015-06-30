'use strict';

angular.module('App.savoirfaire', [
        'ui.router',
        'App.savoirfaire.savoir',
        'directives.fullFrame',
        'animations.savoirFaire'
    ])
    .config(function($stateProvider) {

        $stateProvider
            .state('savoirfaire', {
                url: '/savoir-faire',
                views: {
                    'main': {
                        resolve: {
                            savoirs: function(Api) {
                                return Api.getSavoirFaire();
                            }
                        },
                        templateUrl: 'app/savoirfaire/savoirfaire.html',
                        controller: 'SfCtrl',
                        controllerAs: 'sf'
                    }
                }
            });
    })
    .controller('SfCtrl', function($scope, $rootScope, $state, $timeout, Api, savoirs) {

        var sf = this;


        console.log($scope.app.state.name);
        console.log($scope);


        function computeData(savoirs){
            sf.savoirs = savoirs;

            sf.savoirsLeft = savoirs.filter(function(savoir) {
                return savoir.column === 'gauche';
            });

            sf.savoirsRight = savoirs.filter(function(savoir) {
                return savoir.column === 'droite';
            });
        }

        computeData(savoirs);


        sf.detailsOpen = $state.current.name !== 'savoirfaire';
        // sf.animClass = 'halfLeft';


        sf.openLeft = function(slug) {
            sf.detailsOpen = true;
            sf.animClass = 'halfLeft';
            $state.go('savoirfaire.savoir', {
                slug: slug
            });
        };

        sf.openRight = function(slug) {
            sf.detailsOpen = true;
            sf.animClass = 'halfRight';
            $state.go('savoirfaire.savoir', {
                slug: slug
            });
        };


        $rootScope.$on('APP_LANGUAGE_CHANGE', function() {
            Api.getSavoirFaire().then(computeData);
        });

        $rootScope.$on('$stateChangeSuccess', function($event, nextState) {
            if (nextState.name === 'savoirfaire' && sf.detailsOpen) {
                $timeout(function() {
                    sf.detailsOpen = false;
                }, 200);
            }
        });
    });
