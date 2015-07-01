'use strict';

angular.module('directives.textClip', [])
    .directive('textClip', function(){

        return {

            restrict: 'E',

            scope: {
                imageUrl: '@',
                content: '@',
                textSize: '@',
                imageWidth: '@',
                imageHeight: '@',
            },

            templateUrl: 'common/directives/partials/textClip.html',

            link: function(scope, element, attrs){

            }
        };
    })
    .directive('ngY', function (){

        return {

            restrict: 'A',

            scope: {
                ngY: '='
            },

            link: function(scope, element, attrs){
                scope.$watch('ngY', function(newValue){
                    if(newValue){
                        element[0].setAttribute('y', newValue);
                    }else{
                        element[0].setAttribute('y', 0);
                    }
                });
            }
        }
    })
