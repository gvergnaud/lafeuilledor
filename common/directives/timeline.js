'use strict';

angular.module('directives.timeline', [])
    .directive('timeline', function($rootScope){

        function generateTimeline(frameHeight, frameCount){
            var timeline = document.createElement('div'),
                pointPerFrame = Math.round(frameHeight/13),
                section,
                point;


            timeline.classList.add('pointsContainer');

            for(var j = 0 ; j < frameCount - 1 ; j++){

                section = document.createElement('div');
                section.classList.add('section');

                for(var i = 0; i < pointPerFrame ; i ++){
                    point = document.createElement('div');
                    point.classList.add('point');
                    if(i === pointPerFrame-1)
                        point.classList.add('big');
                    section.appendChild(point);
                }

                timeline.appendChild(section);
            }

            return timeline;
        }

        return {

            restrict: 'E',

            scope: {
                frameCount: '=',
                dragDown: '&',
                dragUp: '&'
            },

            link: function(scope, element, attrs){

                // SCROLL EVENT RESPONSE SETUP
                var frameHeight = window.innerHeight,
                    scroll = -.5,
                    scrollMin = -.5,
                    scrollMax = scope.frameCount - .5,
                    timeline = generateTimeline(frameHeight, scope.frameCount);

                element.append(timeline);
                var pointsContainer = element[0].querySelector('.pointsContainer');
                TweenMax.set(pointsContainer, {y: - frameHeight * scroll});
                // Scroll down event
                $rootScope.$on('ATELIER_SCROLL_DOWN', function(e){
                    if(scroll + 1 < scrollMax)
                        scroll += 1;

                    TweenMax.to(pointsContainer, 2, {
                        y: - frameHeight * scroll,
                        ease: Power3.easeOut
                    });

                });
                // Scroll up event
                $rootScope.$on('ATELIER_SCROLL_UP', function(e){
                    if(scroll > scrollMin)
                        scroll -= 1;

                    TweenMax.to(pointsContainer, 2, {
                        y: - frameHeight * scroll,
                        ease: Power3.easeOut
                    });
                });

                // DragNDrop
                var startYPos,
                    endYPos;

                var drag = function(e){
                    TweenMax.set(pointsContainer, {y: - frameHeight * scroll + (e.clientY - startYPos)});
                };

                var onMouseDown = function(e){
                    e.preventDefault();
                    e.stopPropagation();

                    startYPos = e.clientY;

                    element[0].style.cursor = '-webkit-grabbing';

                    document.addEventListener('mousemove', drag, false);
                    document.addEventListener('mouseup', onMouseUp, false);
                };

                var onMouseUp = function(e){
                    e.preventDefault();
                    e.stopPropagation();

                    endYPos = e.clientY;

                    element[0].style.cursor = '-webkit-grab';

                    var diff = startYPos - endYPos;

                    if(diff >= 200 && scroll + 1 < scrollMax){ // dépalcement de la timeline vers le haut
                        scope.$apply(function(){
                            scope.$eval(scope.dragDown);
                        });
                    }
                    else if(diff <= -200 && scroll > scrollMin){ // dépalcement de la timeline vers le bas
                        scope.$apply(function(){
                            scope.$eval(scope.dragUp);
                        });
                    }
                    else {
                        TweenMax.to(pointsContainer, 2, {
                            y: - frameHeight * scroll,
                            ease: Power3.easeOut
                        });
                    }

                    document.removeEventListener('mousemove', drag, false);
                    document.removeEventListener('mouseup', onMouseUp, false);
                };

                element.on('mousedown', onMouseDown);


            }
        };
    });
