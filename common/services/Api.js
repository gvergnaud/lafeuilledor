'use strict';

angular.module('services.Api', [
        'Constants'
    ])
    .factory('Api', function($q, $http, SERVER) {
        // Service logic

        var _data= {
            menu: false,
            histoire: false,
            savoirFaire: false,
            realisations: false,
            conferences: false,
            formations: false
        };

        var _language = 'fr';

        // Public API here
        var Api = {


            setLanguage: function(language){
                switch (language){
                    case 'fr':
                        _language = 'fr';
                        break;

                    case 'en':
                        _language = 'en';
                        break;
                }
            },

            getLanguage: function(){
                return _language;
            },

            getHistoire: function(){

                var deferred = $q.defer(),
                    histoire = [];

                if(!_data.histoire){

                    $http.get(SERVER.API + '/posts?type=histoire')
                        .success(function(data){


                            angular.forEach(data, function(story){
                                histoire.push({
                                    slug: story.slug,
                                    name: story.meta.name,
                                    date: story.meta.date,
                                    lieu: story.meta.lieu,
                                    image: story.meta.image,
                                    title: (_language === 'fr') ? story.title : story.meta.en_title,
                                    content: (_language === 'fr') ? story.meta.content : story.meta.en_content,
                                    baseline: (_language === 'fr') ? story.meta.baseline : story.meta.en_baseline
                                });
                            });


                            _data.histoire = histoire;
                            deferred.resolve(histoire);
                        })
                        .error(function(data, status){
                            deferred.reject(data);
                        });
                }else{
                    deferred.resolve(_data.histoire);
                }

                return deferred.promise;
            },

            getSavoirFaire: function(){
                var deferred = $q.defer(),
                    savoirFaire = [];

                if(!_data.savoirFaire){

                    // $http.get(SERVER.API + '/posts?type=savoir_faire')
                    $http.get('savoir-faire.json')
                        .success(function(data){


                            angular.forEach(data, function(savoir){
                                savoirFaire.push({
                                    slug: savoir.slug,
                                    image: savoir.meta.image,
                                    title: (_language === 'fr') ? savoir.title : savoir.meta.en_title,
                                    content: (_language === 'fr') ? savoir.meta.content : savoir.meta.en_content,
                                    baseline: (_language === 'fr') ? savoir.meta.baseline : savoir.meta.en_baseline
                                });
                            });

                            _data.savoirFaire = savoirFaire;
                            deferred.resolve(savoirFaire);
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
                var deferred = $q.defer(),
                    realisations = [];

                if(!_data.realisations){

                    // $http.get(SERVER.API + '/posts?type=realisations')
                    $http.get('realisations.json')
                        .success(function(data){


                            angular.forEach(data, function(realisation){
                                realisations.push({
                                    slug: realisation.slug,
                                    date: realisation.meta.date,
                                    pictures: realisation.meta.pictures,
                                    cover: realisation.meta.cover,
                                    title: (_language === 'fr') ? realisation.title : realisation.meta.en_title,
                                    description: (_language === 'fr') ? realisation.meta.description : realisation.meta.en_description
                                });
                            });


                            _data.realisations = realisations;
                            deferred.resolve(realisations);
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
                var deferred = $q.defer(),
                    conferences = [];

                if(!_data.conferences){

                    // $http.get(SERVER.API + '/posts?type=conference')
                    $http.get('conferences.json')
                        .success(function(data){


                            angular.forEach(data, function(conference){
                                conferences.push({
                                    slug: conference.slug,
                                    image: conference.meta.image,
                                    title: (_language === 'fr') ? conference.title : conference.meta.en_title,
                                    description: (_language === 'fr') ? conference.meta.description : conference.meta.en_description,
                                    level: (_language === 'fr') ? conference.meta.level : conference.meta.en_level,
                                    duree: (_language === 'fr') ? conference.meta.duree : conference.meta.en_duree
                                });
                            });


                            _data.conferences = conferences;
                            deferred.resolve(conferences);
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
                var deferred = $q.defer(),
                    formations = [];

                if(!_data.formations){

                    // $http.get(SERVER.API + '/posts?type=formation')
                    $http.get('conferences.json')
                        .success(function(data){


                            angular.forEach(data, function(formation){
                                formations.push({
                                    slug: formation.slug,
                                    image: formation.meta.image,
                                    title: (_language === 'fr') ? formation.title : formation.meta.en_title,
                                    description: (_language === 'fr') ? formation.meta.description : formation.meta.en_description,
                                    level: (_language === 'fr') ? formation.meta.level : formation.meta.en_level,
                                    duree: (_language === 'fr') ? formation.meta.duree : formation.meta.en_duree
                                });
                            });


                            _data.formations = formations;
                            deferred.resolve(formations);
                        })
                        .error(function (data, status){
                            deferred.reject(data);
                        });
                }else{
                    deferred.resolve(_data.formations);
                }

                return deferred.promise;
            },


            getMenu: function(){
                var deferred = $q.defer(),
                    menu = {};

                if(!_data.menu){

                    $http.get(SERVER.API + '/posts?type=menu')
                        .success(function(data){

                            menu.atelier = (_language === 'fr') ? data[0].meta.atelier : data[0].meta.en_atelier;
                            menu.savoir_faire = (_language === 'fr') ? data[0].meta.savoir_faire : data[0].meta.en_savoir_faire;
                            menu.galerie = (_language === 'fr') ? data[0].meta.galerie : data[0].meta.en_galerie;
                            menu.transmission = (_language === 'fr') ? data[0].meta.transmission : data[0].meta.en_transmission;
                            menu.contact = data[0].meta.contact;


                            _data.menu = menu;
                            deferred.resolve(menu);
                        })
                        .error(function (data, status){
                            deferred.reject(data);
                        });
                }else{
                    deferred.resolve(_data.menu);
                }

                return deferred.promise;
            },


            getAll: function(){

                var deferred = $q.defer();

                $q.all([
                    this.getHistoire(),
                    this.getSavoirFaire(),
                    this.getRealisations(),
                    this.getFormations(),
                    this.getConferences(),
                    this.getMenu()
                ]).then(function(){
                    deferred.resolve(_data);
                });

                return deferred.promise;
            }

        };

        return Api;
    });
