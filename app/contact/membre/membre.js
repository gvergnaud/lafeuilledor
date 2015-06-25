'use strict';

angular.module('App.contact.membre', [
        'ui.router',
    ])
    .config(function($stateProvider) {

        $stateProvider
            .state('contact.membre', {
                url: '/membre',
                views: {
                    'membre': {
                        templateUrl: 'app/contact/membre/membre.html',
                        controller: 'MembreCtrl',
                        controllerAs: 'mb'
                    }
                }
            });
    })
    .controller('MembreCtrl', function($scope, $rootScope, Api) {

        var mb = this;

        mb.list = [
            {
                name: 'La Chambre Syndicale Nationale de la Reliure, Brochure, Dorure',
                url: 'http://www.csnrbd.fr/'
            },
            {
                name: 'L’Association Pour la Promotion des Arts de la Reliure',
                url: ''
            },
            {
                name: 'Les Amis de la Reliure d’Art',
                url: ''
            },
            {
                name: 'Les Amis de la Bibliotheca Wittockiana : Musée de la Reliure et des Arts du Livre de Bruxelles',
                url: 'http://wittockiana.org/'
            },
            {
                name: 'Les Ateliers de Paris',
                url: 'www.ateliersdeparis.com'
            }
        ];

    });
