'use strict';

angular.module('directives.menu', [
    'ui.router'
])
    .directive('menu', function(){

        return {

            restrict: 'E',

            link: function(scope, element, attrs){

            }
        };
    })
    .directive('tab', function($rootScope, $state, Api){

        return {

            restrict: 'E',

            link: function(scope, element, attrs){

                function onStateChange(event, toState){
                    if($state.includes(attrs.uiSref)){
                        element[0].classList.add('active');
                    }else{
                        element[0].classList.remove('active');
                    }
                }

                function onLanguageChange(){

                }

                $rootScope.$on('$stateChangeSuccess', onStateChange);


                element.on('$destroy', function(){
                    $rootScope.$on('$stateChangeSuccess', onStateChange);
                });



            }
        };

    });
