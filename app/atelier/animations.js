angular.module('animations.atelier', [])
    .animation('.center', function($rootScope) {

        var direction,
            duration = .3,
            stagger = .1,
            translateY = 30;

        return {
            enter: function(element, done) {

                var elements = element[0].querySelectorAll('.stagger');
                var y = $rootScope.direction === 'down' ? translateY : -translateY;
                var staggerDuration = $rootScope.direction === 'down' ? stagger : -stagger;

                TweenMax.staggerFrom(elements, duration, {
                    y: y,
                    opacity: 0,
                    ease: Power2.easeOut,
                    delay: duration + stagger * (elements.length - 1),
                }, staggerDuration, done);
            },

            leave: function(element, done) {

                var elements = element[0].querySelectorAll('.stagger');
                var y = $rootScope.direction === 'down' ? -translateY : translateY
                var staggerDuration = $rootScope.direction === 'down' ? stagger : -stagger;

                TweenMax.staggerTo(elements, duration, {
                    y: y,
                    opacity: 0,
                    ease: Power2.easeIn
                }, staggerDuration, done);
            }
        };
    });
