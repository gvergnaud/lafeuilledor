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

                element.on('mousewheel', onWheel);

                element.on('$destroy', function(){
                    element.off('mousewheel', onWheel);
                });
            }
        };
    });
