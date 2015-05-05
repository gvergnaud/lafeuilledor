'use strict';

angular.module('directives.onWheel', [])
    .directive('onWheel', function(){



        return {

            restrict: 'A',

            link: function(scope, element, attrs){

                var onWheel = function(e){
                    if(e.wheelDelta < 0){
                        scope.$apply(function(){
                            scope.$eval(attrs.down);
                        });
                    }
                    else{
                        scope.$apply(function(){
                            scope.$eval(attrs.up);
                        });
                    }
                };

                var onKeydown = function(e){
                    switch(e.which){
                        case 38 :
                            scope.$apply(function(){
                                scope.$eval(attrs.up);
                            });
                            break;

                        case 40 :
                            scope.$apply(function(){
                                scope.$eval(attrs.down);
                            });
                            break;
                    }
                };


                element.on('mousewheel', onWheel);
                angular.element(window).on('keydown', onKeydown);

                element.on('$destroy', function(){
                    angular.element(window).off('keydown', onKeydown);
                    element.off('mousewheel', onWheel);
                });
            }
        };
    });
