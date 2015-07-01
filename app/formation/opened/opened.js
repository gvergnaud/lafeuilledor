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
    .controller('OpenedCtrl', function($scope, $rootScope, $stateParams, Api, data, type) {

        var post = data.filter(function(d){
            return d.slug === $stateParams.slug;
        });
        $scope.post = post[0];
        $scope.type = type;

        $rootScope.$on('APP_LANGUAGE_CHANGE', function(){
            switch (type) {
                case 'formation':
                    Api.getFormations().then(function(data){
                        var post = data.filter(function(d){
                            return d.slug === $stateParams.slug;
                        });
                        $scope.post = post[0];
                    });
                    break;
                case 'conference':
                    Api.getConferences().then(function(data){
                        var post = data.filter(function(d){
                            return d.slug === $stateParams.slug;
                        });
                        $scope.post = post[0];
                    });
                    break;

            }
        });

    });
