'use strict';

angular.module('App.atelier.clients', [
        'ui.router',
    ])
    .config(function($stateProvider) {

        $stateProvider
            .state('atelier.clients', {
                url: '/clients',
                views: {
                    'clients': {
                        resolve: {
                            clients: function(Api){
                                return Api.getClients();
                            }
                        },
                        templateUrl: 'app/atelier/clients/clients.html',
                        controller: 'ClientsCtrl',
                        controllerAs: 'clts'
                    }
                }
            });
    })
    .controller('ClientsCtrl', function($scope, $rootScope, Api, clients) {

        var clts = this;

        function computeData(clients){
            clts.clientsDorure = clients.filter(function(client){
                return client.category === 'La dorure';
            });

            clts.clientsFormation = clients.filter(function(client){
                return client.category === 'La formation';
            });
        }

        computeData(clients);


        $rootScope.$on('APP_LANGUAGE_CHANGE', function() {
            Api.getClients(true).then(computeData);
        });
    });
