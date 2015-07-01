'use strict';

angular.module('directives.bindScreenWidth', [])

	.directive('bindScreenWidth', function($rootScope){

        return {

            restrict: 'A',

            link: function(scope, element, attrs){

                function getWidth(){
                    scope.screenWidth = window.innerWidth;
                    if(!$rootScope.$$phase){
                        scope.$apply();
                    }
                };

                getWidth();
                window.onresize = getWidth;
            }
        }
    });
