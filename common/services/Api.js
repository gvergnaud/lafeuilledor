'use strict';


angular.module('services.Api', [
        'Constants'
    ])
    .factory('Api', function($q, $http, SERVER) {
        // Service logic

        // Public API here
        var Api = {

            get: function(){
                var deferred = $q.defer();

                $http.get(SERVER.WORDPRESS_API_URL + '/posts')
                    .success(function(posts){
                        deferred.resolve(posts);
                    });

                return deferred.promise;
            }
        };

        return Api;
    });
