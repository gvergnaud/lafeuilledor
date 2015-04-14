'use strict';
angular.module('filters.index', [])
    .filter('index', function(){

        return function(array, index){

            var out = [];

            out.push(array[index]);

            return out;

        }

    });
