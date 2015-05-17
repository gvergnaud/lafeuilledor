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
                            savoirs: function(Api){
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
    .controller('SfCtrl', function($scope, $rootScope, $state, $timeout, savoirs) {

        var sf = this;

        sf.loaded = false;
        sf.baseline = 'Découvrez le savoir-faire de La Feuille d\'Or';
        sf.bg = '../../wordpress/wp-content/uploads/2015/05/IMG_9535-2000x1333.jpg';
        sf.savoirs = savoirs;
        sf.current = 0;

        $timeout(function(){
            sf.loaded = true;
        }, 200);

        sf.openDetails = function(slug){
            sf.detailsOpen = true;
            $timeout(function(){
                $state.go('savoirfaire.savoir', {slug: slug});
            }, 500);
        };

        $rootScope.$on('$stateChangeSuccess', function($event, nextState){
            if (nextState.name === 'savoirfaire' && sf.detailsOpen){
                $timeout(function(){
                    sf.detailsOpen = false;
                }, 1000);
            }
        });

        sf.next = function(){
            sf.current += 1;
            sf.openDetails(sf.savoirs[sf.current].slug);
        };

        sf.prev = function(){
            sf.current -= 1;
            sf.openDetails(sf.savoirs[sf.current].slug);
        };

    });
