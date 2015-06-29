'use strict';

angular.module('App.contact.membre', [
        'ui.router',
    ])
    .config(function($stateProvider) {

        $stateProvider
            .state('contact.membre', {
                url: '/partenaires',
                views: {
                    'membre': {
                        resolve: {
                            partners: function(Api){
                                return Api.getPartners();
                            }
                        },
                        templateUrl: 'app/contact/membre/membre.html',
                        controller: 'MembreCtrl',
                        controllerAs: 'mb'
                    }
                }
            });
    })
    .controller('MembreCtrl', function($scope, $rootScope, Api, partners) {

        var mb = this;

        mb.partners = partners;

        $rootScope.$on('APP_LANGUAGE_CHANGE', function(){
            Api.getPartners()
                .then(function(partners){
                    mb.partners = partners;
                });
        });

    });
