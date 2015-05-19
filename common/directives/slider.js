'use strict';

angular.module('directives.slider', [
        'directives.onWheel',
        'directives.fullFrame',
        'directives.arrows',
        'filters.index'
    ])
    .directive('slider', function() {

        return {

            restrict: 'E',

            scope: {
                sliderFullscreen: '=',
                pictures: '='
            },

            template: [

                '<div',
                '   class="Slider"',
                '   data-on-wheel',
                '   data-up="prev()"',
                '   data-down="next()"',
                '>',
                '   <nav>',
                '       <arrow-left class="Slider-arrow left" ng-click="prev()"></arrow-left>',
                '       <arrow-right class="Slider-arrow right" ng-click="next()"></arrow-right>',
                '   </nav>',
                '    <slider-image class="Slider-image" ng-repeat="picture in pictures | index:currentIndex"></slider-image>',
                '    <slider-count class="Slider-count"></slider-count>', //{{ currentIndex + 1 + \' / \' + pictures.length}}
                '</div>'

            ].join(''),

            link: function(scope, element, attrs){

                scope.arrowsColor = '#353535';

                var nextPrevOnArrowKeyDown = function(e){
                    switch (e.which) {
                        case 37 : // keyleft
                            scope.$apply(function(){
                                scope.prev();
                            });
                            break;

                        case 39 : // keyright
                            scope.$apply(function(){
                                scope.next();
                            });
                            break;

                        case 27 : // escape
                            history.back();
                            break;
                    }
                };

                window.addEventListener('keydown', nextPrevOnArrowKeyDown, false);

                element.on('$destroy', function(){
                    window.removeEventListener('keydown', nextPrevOnArrowKeyDown, false);
                });

            },

            controller: function($scope, $rootScope) {

                var preloadNextImage = function(){
                    var nextPicture = $scope.pictures[$scope.currentIndex + 1];
                    if(nextPicture){
                        var nextImage = document.createElement('img');
                        nextImage.setAttribute('src', nextPicture.sizes.large);
                    }
                };

                $scope.currentIndex = 0;
                preloadNextImage();

                $scope.next = function() {
                    if($scope.currentIndex + 1 >= $scope.pictures.length)
                        return;

                    $rootScope.$emit('SLIDER_DIRECTION_CHANGE', 'next');

                    $scope.currentIndex += 1;
                    preloadNextImage();
                };

                $scope.prev = function() {
                    if($scope.currentIndex === 0)
                        return;

                    $rootScope.$emit('SLIDER_DIRECTION_CHANGE', 'prev');

                    $scope.currentIndex -= 1;
                    preloadNextImage();
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
                    TweenMax.from(this, .2, {
                        opacity: 0
                    });
                });
            }
        }
    })
    .directive('sliderCount', function() {

        return {

            restrict: 'E',

            template: '<span class="Slider-count-progress"></span>',

            link: function (scope, element, attrs) {


                var style = function(){
                    var progress = (scope.currentIndex + 1) * 100 / scope.pictures.length;
                    element[0].querySelector('.Slider-count-progress').style.width = progress + '%';
                };

                style();

                scope.$watch('currentIndex', style);
            }
        }

    })
    .animation('.Slider-image', function($rootScope){

        var _currentDirection = 'next';
        var leavingImages = 0;

        $rootScope.$on('SLIDER_DIRECTION_CHANGE', function($event, direction){
            _currentDirection = direction;
        });

        return {

            enter: function(element, done){
                if(_currentDirection === 'next'){
                    TweenMax.from(element, 1.2, {
                        scale: .8,
                        delay: .1,
                        ease: Power3.easeOut,
                        onComplete: done
                    });
                }
                else{
                    TweenMax.from(element, .8, {
                        x: - (element[0].clientWidth + 300),
                        ease: Power2.easeOut,
                        onComplete: done
                    });
                }
            },

            leave: function(element, done){

                if(_currentDirection === 'next'){
                    TweenMax.to(element, 1.2, {
                        x: - (element[0].clientWidth + 300),
                        ease: Power2.easeOut,
                        onComplete: done
                    });
                }
                else{
                    leavingImages += 1;
                    element.css('z-index', leavingImages);
                    TweenMax.to(element, .8, {
                        scale: .8,
                        ease: Power3.easeOut,
                        onComplete: function(){
                            done();
                            leavingImages -= 1;
                        }
                    });
                }
            }
        }
    });
