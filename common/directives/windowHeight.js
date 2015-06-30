'use strict';

angular.module('directives.windowHeight', [])

	.directive('windowHeight', function(){

        return {

            restrict: 'A',

            scope: {
                ratio: '=windowHeight'
            },

            link: function(scope, element, attrs){

                var style = function(){
                    element[0].style.minHeight = window.innerHeight * scope.ratio + 'px';
                };

                style();
                window.addEventListener('resize', style);

            }
        }
    });
