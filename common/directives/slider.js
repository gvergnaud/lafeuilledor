'use strict';

angular.module('directives.slider', [
        'directives.fullFrame',
        'filters.index'
    ])
    .directive('slider', function() {

        return {

            restrict: 'E',

            scope: {
                sliderFullscreen: '=',
                pictures: '='
            },

            transclude: true,

            template: [

                '<div class="Slider">',
                '   <nav>',
                '       <div class="Slider-arrow left" ng-click="prev()"></div>',
                '       <div class="Slider-arrow right" ng-click="next()"></div>',
                '   </nav>',
                '    <slider-image class="Slider-image" ng-repeat="picture in pictures | index:currentIndex"></slider-image>',
                '    <span class="Slider-count">{{ currentIndex + 1 + \' / \' + pictures.length}}</span>',
                '</div>'

            ].join(''),

            link: function(scope, element, attrs){

                var nextPrevOnArrowKeyDown = function(e){
                    switch (e.which) {
                        case 37 :
                            scope.$apply(function(){
                                scope.prev();
                            });
                            break;

                        case 39 :
                            scope.$apply(function(){
                                scope.next();
                            });
                            break;
                    }
                };

                window.addEventListener('keydown', nextPrevOnArrowKeyDown, false);

                element.on('$destroy', function(){
                    window.removeEventListener('keydown', nextPrevOnArrowKeyDown, false);
                });

            },

            controller: function($scope, $rootScope) {

                $scope.currentIndex = 0;

                $scope.next = function() {
                    if($scope.currentIndex + 1 >= $scope.pictures.length)
                        return;

                    $rootScope.$emit('SLIDER_DIRECTION_CHANGE', 'next');

                    $scope.currentIndex += 1;
                };

                $scope.prev = function() {
                    if($scope.currentIndex === 0)
                        return;

                    $rootScope.$emit('SLIDER_DIRECTION_CHANGE', 'prev');

                    $scope.currentIndex -= 1;
                };
            }
        };
    })
    .directive('sliderImage', function() {

        return {

            restrict: 'E',

            template: '<img full-frame ng-src="{{picture.sizes.large}}"/>',

            link: function(scope, element, attrs) {
                element[0].querySelector('img').addEventListener('load', function(){
                    TweenMax.from(this, .7, {
                        opacity: 0
                    });
                });
            }
        }
    })
    .animation('.Slider-image', function($rootScope){

        var _currentDirection = 'next';

        $rootScope.$on('SLIDER_DIRECTION_CHANGE', function($event, direction){
            _currentDirection = direction;
        });

        return {

            enter: function(element, done){
                TweenMax.from(element, 1, {
                    x: _currentDirection === 'next' ? '100%' : '-100%',
                    onComplete: done
                });
            },

            leave: function(element, done){
                TweenMax.to(element, 1, {
                    x: _currentDirection === 'next' ? '-100%' : '100%',
                    opacity: 0,
                    onComplete: done
                });
            }
        }

    })
