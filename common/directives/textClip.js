'use strict';

angular.module('directives.textClip', [])
    .directive('textClip', function(){

        return {

            restrict: 'E',

            scope: {
                imageUrl: '@',
                content: '@',
                textSize: '@'
            },

            templateUrl: 'common/directives/partials/textClip.html',

            link: function(scope, element, attrs){

                console.log(scope);

            }
        };
    });
