'use strict';

angular.module('directives.menu', [])
    .directive('menu', function($state){

        return {

            restrict: 'E',

            link: function(scope, element, attrs){

            }
        };
    })
    .directive('tab', function($rootScope){

        return {

            restrict: 'E',

            link: function(scope, element, attrs){

                function onStateChange(event, toState){
                    if(toState.name === attrs.uiSref){
                        element[0].classList.add('active');
                    }else{
                        element[0].classList.remove('active');
                    }
                }

                $rootScope.$on('$stateChangeSuccess', onStateChange);


                element.on('$destroy', function(){
                    console.log('destroy tab')
                    $rootScope.$on('$stateChangeSuccess', onStateChange);
                });

            }
        };

    });
