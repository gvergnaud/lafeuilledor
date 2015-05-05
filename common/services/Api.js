'use strict';

angular.module('services.Api', [
        'Constants'
    ])
    .factory('Api', function($q, $http, SERVER) {
        // Service logic

        var _data= {
            histoire: false,
            savoirFaire: false,
            realisations: false,
            conferences: false,
            formations: false
        };

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

                var deferred = $q.defer();

                if(!_data.histoire){

                    $http.get(Api.url + '/posts?type=histoire')
                        .success(function(data){
                            _data.histoire = data;
                            deferred.resolve(data);
                        })
                        .error(function (data, status){
                            deferred.reject(data);
                        });
                }else{
                    deferred.resolve(_data.histoire);
                }

                return deferred.promise;
            },

            getSavoirFaire: function(){
                var deferred = $q.defer();

                if(!_data.savoirFaire){

                    $http.get(Api.url + '/posts?type=savoir_faire')
                        .success(function(data){
                            _data.savoirFaire = data;
                            deferred.resolve(data);
                        })
                        .error(function (data, status){
                            deferred.reject(data);
                        });
                }else{
                    deferred.resolve(_data.savoirFaire);
                }

                return deferred.promise;
            },

            getRealisations: function(){
                var deferred = $q.defer();

                if(!_data.realisations){

                    // $http.get(Api.url + '/posts?type=realisations')
                    $http.get('realisations.json')
                        .success(function(data){
                            _data.realisations = data;
                            deferred.resolve(data);
                        })
                        .error(function (data, status){
                            deferred.reject(data);
                        });
                }else{
                    deferred.resolve(_data.realisations);
                }

                return deferred.promise;
            },

            getConferences: function(){
                var deferred = $q.defer();

                if(!_data.conferences){

                    $http.get(Api.url + '/posts?type=conference')
                        .success(function(data){
                            _data.conferences = data;
                            deferred.resolve(data);
                        })
                        .error(function (data, status){
                            deferred.reject(data);
                        });
                }else{
                    deferred.resolve(_data.conferences);
                }

                return deferred.promise;
            },

            getFormations: function(){
                var deferred = $q.defer();

                if(!_data.formations){

                    $http.get(Api.url + '/posts?type=formation')
                        .success(function(data){
                            _data.formations = data;
                            deferred.resolve(data);
                        })
                        .error(function (data, status){
                            deferred.reject(data);
                        });
                }else{
                    deferred.resolve(_data.formations);
                }

                return deferred.promise;
            },

            getAll: function(){

                var deferred = $q.defer(),
                    resolved = {};

                function resolve(name) {
                    resolved[name] = true;
                    if (resolved.histoire && resolved.savoirFaire && resolved.realisations && resolved.formations && resolved.conferences) {
                        deferred.resolve(_data);
                    }
                }

                this.getHistoire().then(function(){
                    resolve('histoire');
                });

                this.getSavoirFaire().then(function(){
                    resolve('savoirFaire');
                });

                this.getRealisations().then(function(){
                    resolve('realisations');
                });

                this.getFormations().then(function(){
                    resolve('formations');
                });

                this.getConferences().then(function(){
                    resolve('conferences');
                });

                return deferred.promise;
            }

        };

        return Api;
    });
