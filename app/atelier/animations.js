angular.module('animations.atelier', [])
    .animation('.center', function($rootScope) {

        var direction,
            duration = .3,
            stagger = .1,
            translateY = 30;

        $rootScope.$on('ATELIER_SCROLL_DOWN', function(){
            direction = 'down';
        });

        $rootScope.$on('ATELIER_SCROLL_UP', function(){
            direction = 'up';
        });

        return {
            enter: function(element, done) {

                var elements = element[0].querySelectorAll('.stagger');
                var y = direction === 'down' ? translateY : -translateY;
                var staggerDuration = direction === 'down' ? stagger : -stagger;

                TweenMax.staggerFrom(elements, duration, {
                    y: y,
                    opacity: 0,
                    ease: Power2.easeOut,
                    delay: .2 + duration + stagger * (elements.length - 1),
                }, staggerDuration, done);
            },

            leave: function(element, done) {

                var elements = element[0].querySelectorAll('.stagger');
                var y = direction === 'down' ? -translateY : translateY
                var staggerDuration = direction === 'down' ? stagger : -stagger;

                TweenMax.staggerTo(elements, duration, {
                    y: y,
                    opacity: 0,
                    delay: .1,
                    ease: Power2.easeIn
                }, staggerDuration, done);
            }
        };
    })
    // .animation('.background', function(){
    //
    //     var duration = 5,
    //         scale = 1.1,
    //         opacity = 0,
    //         delay = .7;
    //
    //
    //     return {
    //
    //         enter: function(element, done) {
    //             TweenMax.from(element, duration, {
    //                 scale: scale,
    //                 opacity: opacity,
    //                 delay: delay,
    //                 ease: Power2.easeOut,
    //                 onComplete: done
    //             });
    //         },
    //
    //         leave: function(element, done) {
    //             TweenMax.to(element, .7, {
    //                 scale: scale,
    //                 opacity: opacity,
    //                 ease: Power1.easeIn,
    //                 onComplete: done
    //             });
    //         }
    //     };
    // });
