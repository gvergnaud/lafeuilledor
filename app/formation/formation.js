'use strict';

angular.module('App.formation', [
        'ui.router',

        'App.formation.opened',

        'directives.fullFrame',
        'services.Api',
        'animations.formation'
    ])
    .config(function($stateProvider) {

        $stateProvider
            .state('formation', {
                url: '/transmission-du-savoir',
                views: {
                    'main': {
                        resolve: {
                            conferences: function(Api){
                                return Api.getConferences();
                            },
                            formations: function(Api){
                                return Api.getFormations();
                            },
                        },
                        templateUrl: 'app/formation/formation.html',
                        controller: 'FormationCtrl',
                        controllerAs: 'fc'
                    }
                }
            });
    })
    .controller('FormationCtrl', function($scope, $rootScope, $state,  Api, conferences, formations) {

        var fc = this;

        fc.conferences = conferences;
        fc.formations = formations;

        fc.detailsOpen = ($state.current.name !== 'formation');

        $rootScope.$on('$stateChangeSuccess', function(e, state){
            fc.detailsOpen = (state.name !== 'formation');
        });

        $rootScope.$on('APP_LANGUAGE_CHANGE', function(){

            fc.headerTitle = (Api.getLanguage() === 'fr') ? 'Transmettre un savoir-faire à l\'international' : '';

            Api.getConferences().then(function(conferences){
                fc.conferences = conferences;
            });
            Api.getFormations().then(function(formations){
                fc.formations = formations;
            });
        });
    });
