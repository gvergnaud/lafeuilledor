'use strict';

angular.module('directives.fullFrame', [])

	.directive('fullFrame', function($rootScope){

        return {

            restrict: 'A',

			scope: {
				noCrop: '='
			},

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

					if(!scope.noCrop){
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
					}
					else{
						if( (parentWidth / parentHeight) <= (elementWidth / elementHeight) ){
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
					}
                };

                style();

                element.on('load', style);
                angular.element(window).on('resize', style);

				$rootScope.$on('FULL_FRAME_RESIZE', style);

				element.on('$destroy', function(){
					angular.element(window).off('resize', style);
				});

            }
        }
    });
