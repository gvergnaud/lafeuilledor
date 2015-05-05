'use strict';
angular.module('filters.slice', [])
    .filter('slice', function() {
        return function(arr, step, current) {
            var start = step * current,
                end = start + step;

            return arr.slice(start, end);
        };
    });
