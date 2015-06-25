(function(){
    var _isAnim = true;

    'use strict';

    angular.module('App.home', [
            'ui.router'
        ])
        .config(function($stateProvider) {

            $stateProvider
                .state('home', {
                    url: '/',
                    views: {
                        'main': {
                            templateUrl: 'app/home/home.html',
                            controller: 'HomeCtrl',
                            controllerAs: 'home'
                        }
                    }
                });
        })
        .controller('HomeCtrl', function($scope) {

            if(!_isAnim){
                $scope.animation = {
                    logo: false,
                    center: true
                };
            }
            else{
                $scope.animation = {
                    logo: false,
                    center: false
                };
            }


        })
        .animation('.Logo', function(){

            var y = 30,
                staggerDuration = .1;

            return {
                enter: function(element, done){
                    var title = element[0].querySelector('.Logo-title'),
                        tl = new TimelineMax({paused: true});
                        // baseline = element[0].querySelector('.Logo-baseline'),


                    tl
                        .from(title, .7, {
                            y: -y,
                            opacity: 0,
                            ease: Power2.easeOut,
                            easeParams: [3]
                        })

                    tl.restart();
                },

                leave: function(element, done){
                    var title = element[0].querySelector('.Logo-title');
                        // baseline = element[0].querySelector('.Logo-baseline');

                    TweenMax.to(title, .7, {
                        y: y,
                        opacity: 0,
                        ease: Back.easeOut,
                        easeParams: [5]
                    });
                }
            };
        })
        .directive('animationHome', function($rootScope){

            return {

                restrict: 'A',

                link: function(scope, element, attrs){

                    if(!_isAnim) return;
                    _isAnim = false;

                    var background = element[0].querySelector('.background');

                    TweenMax.set(background, {opacity: 1});

                    setTimeout(function () {

                        TweenMax.to(background, .5, {
                            opacity: .3
                        });

                        scope.$apply(function(){
                            scope.animation.logo = true;
                        });

                        setTimeout(function () {
                            scope.$apply(function(){
                                scope.animation.logo = false;
                                scope.animation.center = true;
                            });
                        }, 4000);
                    }, 2500);

                }
            }
        });

})();
