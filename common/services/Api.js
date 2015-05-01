'use strict';


angular.module('services.Api', [
        'Constants'
    ])
    .factory('Api', function($q, $http, SERVER) {
        // Service logic

        // Public API here
        var Api = {

            url: SERVER.API_FR,

            setLanguage: function(language){
                switch (language){
                    case 'fr':
                        Api.url = SERVER.API_FR;
                        break;

                    case 'en':
                        Api.url = SERVER.API_EN;
                        break;
                }
            },

            getHistoire: function(){
                return $http.get(Api.url + '/posts?type=histoire');
            },

            getSavoirFaire: function(){
                return $http.get(Api.url + '/posts?type=savoir_faire');
            },

            getRealisations: function(){
                return $http.get(Api.url + '/posts?type=realisations');
            }

            getConferences: function(){
                return $http.get(Api.url + '/posts?type=conference');
            },

            getFormations: function(){
                return $http.get(Api.url + '/posts?type=formation');
            },

        };

        return Api;
    });
