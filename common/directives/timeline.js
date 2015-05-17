'use strict';

angular.module('directives.timeline', [])
    .directive('timeline', function($rootScope){

        return {

            restrict: 'E',

            scope: {
                frameCount: '=',
                dragDown: '&',
                dragUp: '&'
            },

            link: function(scope, element, attrs){

                var generateTimeline = function(){

                    (function(){
                        var timeline = document.createElement('div'),
                            pointPerFrame = Math.round(window.innerHeight / 13),
                            section,
                            point;

                        timeline.classList.add('pointsContainer');

                        for(var j = 0 ; j < scope.frameCount - 1 ; j++){

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

                        element.html('');
                        element.append(timeline);
                    })();


                    // SCROLL EVENT RESPONSE SETUP
                    var scroll = -.5,
                        scrollMin = -.5,
                        scrollMax = scope.frameCount - .5;


                    var pointsContainer = element[0].querySelector('.pointsContainer');
                    var bigPoints = pointsContainer.querySelectorAll('.big');

                    TweenMax.set(pointsContainer, {y: - window.innerHeight * scroll});

                    // Scroll down event
                    $rootScope.$on('TIMELINE_SCROLL_DOWN', function(e){
                        if(scroll + 1 < scrollMax)
                            scroll += 1;
                        animate();
                    });
                    // Scroll up event
                    $rootScope.$on('TIMELINE_SCROLL_UP', function(e){
                        if(scroll > scrollMin)
                            scroll -= 1;
                        animate();
                    });

                    var animate = function(){
                        TweenMax.set(bigPoints, {width: '', height: ''});

                        var tl = new TimelineLite();
                        tl.to(pointsContainer, 2, {
                            y: - window.innerHeight * scroll,
                            ease: Power3.easeOut
                        });
                        if(bigPoints[scroll -.5]){
                            tl.to(bigPoints[scroll -.5], .3, {
                                y: - 1,
                                height: 12,
                                width: 12,
                                ease: Back.easeOut
                            });
                        }
                    };

                    // DragNDrop
                    var startYPos,
                        endYPos;

                    var drag = function(e){
                        TweenMax.set(pointsContainer, {y: - window.innerHeight * scroll + (e.clientY - startYPos)});
                    };

                    var onMouseDown = function(e){
                        e.preventDefault();
                        e.stopPropagation();

                        startYPos = e.clientY;

                        document.body.classList.add('grabbing');

                        document.addEventListener('mousemove', drag, false);
                        document.addEventListener('mouseup', onMouseUp, false);
                    };

                    var onMouseUp = function(e){
                        e.preventDefault();
                        e.stopPropagation();

                        endYPos = e.clientY;

                        document.body.classList.remove('grabbing');

                        var diff = startYPos - endYPos;

                        if(!!attrs.dragDown && diff >= 200 && scroll + 1 < scrollMax){ // dépalcement de la timeline vers le haut
                            scope.$apply(function(){
                                scope.$eval(scope.dragDown);
                            });
                        }
                        else if(!!attrs.dragUp && diff <= -200 && scroll > scrollMin){ // dépalcement de la timeline vers le bas
                            scope.$apply(function(){
                                scope.$eval(scope.dragUp);
                            });
                        }
                        else {
                            TweenMax.to(pointsContainer, 2, {
                                y: - window.innerHeight * scroll,
                                ease: Power3.easeOut
                            });
                        }

                        document.removeEventListener('mousemove', drag, false);
                        document.removeEventListener('mouseup', onMouseUp, false);
                    };

                    document.addEventListener('mousedown', onMouseDown);


                    element.on('$destroy', function(){
                        document.removeEventListener('mousedown', onMouseDown);
                    });
                };

                generateTimeline();
                window.addEventListener('resize', function(){
                    generateTimeline();
                });
                scope.$watch('frameCount', generateTimeline);



            }
        };
    });
