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

        $timeout(function(){
            sf.loaded = true;
        }, 200);

        $rootScope.$on('$stateChangeSuccess', function($event, nextState){
            if (nextState.name === 'savoirfaire' && sf.detailsOpen){
                $timeout(function(){
                    sf.detailsOpen = false;
                }, 1000);
            }
        });


        var slugArray = savoirs.map(function(savoir){
            return savoir.slug;
        });
        var isOpening = false;

        sf.current = 0;
        sf.detailsOpen = ($state.current.name !== 'savoirfaire');

        sf.openDetails = function(slug){
            if (!isOpening) {

                isOpening = true;
                $timeout(function(){
                    isOpening = false;
                }, 1000);

                sf.detailsOpen = true;

                sf.current = slugArray.indexOf(slug);

                $timeout(function(){
                    $state.go('savoirfaire.savoir', {slug: slug});
                }, 500);
            }
        };



        sf.next = function(){
            if(!sf.detailsOpen) return;

            if(slugArray[sf.current + 1]){
                sf.openDetails(slugArray[sf.current + 1]);
            }
            else{
                sf.openDetails(slugArray[0]);
            }
        };

        sf.prev = function(){
            if(!sf.detailsOpen) return;

            if(slugArray[sf.current - 1]){
                sf.openDetails(slugArray[sf.current - 1]);
            }
            else{
                sf.openDetails(slugArray[slugArray.length - 1]);
            }
        };

    });
