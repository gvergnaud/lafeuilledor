'use strict';

angular.module('directives.onWheel', [])
    .directive('onWheel', function(){

      var _thisScroll = 100,
          _lastScroll = 0;

        return {

            restrict: 'A',

            link: function(scope, element, attrs){

                var onWheel = function(e){

                    _thisScroll = new Date().getTime();

                    if ((_thisScroll - _lastScroll) > 50) {

                        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

                        if (delta < 0) {
                            scope.$apply(function() {
                                scope.$eval(attrs.down);
                            });
                        } else {
                            scope.$apply(function() {
                                scope.$eval(attrs.up);
                            });
                        }

                    }

                    _lastScroll = new Date().getTime();

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
                element.on('DOMMouseScroll', onWheel);
                angular.element(window).on('keydown', onKeydown);

                element.on('$destroy', function(){
                    angular.element(window).off('keydown', onKeydown);
                    element.off('mousewheel', onWheel);
                    element.off('wheel', onWheel);
                });
            }
        };
    });
