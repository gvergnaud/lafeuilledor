'use strict';
angular.module('filters.index', [])
    .filter('index', function(){

        return function(array, index){

            return [array[index]];

        }

    });
