'use strict';

angular.module('directives.fullFrame', [])

	.directive('fullFrame', function(){

        return {

            restrict: 'A',

            link: function(scope, element, attrs){

                var parent = element.parent();

                var style = function(){

                    var parentHeight =  parent[0].offsetHeight,
                        parentWidth =  parent[0].offsetWidth,
                        elementHeight =  element[0].offsetHeight,
                        elementWidth =  element[0].offsetWidth;

                    element.css({
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    });

                    parent.css({
                        overflow: 'hidden'
                    });

                    if( (parentWidth / parentHeight) > (elementWidth / elementHeight) ){
                        element.css({
                            width: parentWidth + 'px',
                            height: ''
                        });
                    }else{
                        element.css({
                            height: parentHeight + 'px',
                            width: ''
                        });
                    }
                };

                style();

                element.on('load', style);
                angular.element(window).on('resize', style);

				element.on('$destroy', function(){
					angular.element(window).off('resize', style);
				});

            }
        }
    });
