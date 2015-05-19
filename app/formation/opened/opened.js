'use strict';

angular.module('App.formation.opened', [
        'ui.router',
        'services.Api'
    ])
    .config(function($stateProvider) {

        $stateProvider
            .state('formation.openedFormation', {
                url: '/formation/:slug',
                views: {
                    'formation': {
                        resolve: {
                            data: function(Api){
                                return Api.getFormations();
                            },
                            type: function(){
                                return 'formation';
                            }
                        },
                        templateUrl: 'app/formation/opened/opened.html',
                        controller: 'OpenedCtrl',
                        controllerAs: 'op'
                    }
                }
            })
            .state('formation.openedConference', {
                url: '/conference/:slug',
                views: {
                    'conference': {
                        resolve: {
                            data: function(Api){
                                return Api.getConferences();
                            },
                            type: function(){
                                return 'conference';
                            }
                        },
                        templateUrl: 'app/formation/opened/opened.html',
                        controller: 'OpenedCtrl'
                    }
                }
            });
    })
    .controller('OpenedCtrl', function($scope, $stateParams, data, type) {

        var post = data.filter(function(d){
            return d.slug === $stateParams.slug;
        });
        $scope.type = type;
        $scope.post = post[0];

    });
