(function() {
    var _animDuration = .4,
        _staggerDuration = .1,
        nextDelay = 0;

    angular.module('animations.app', [])
    .animation('.animForward', function($rootScope) {

        return {
            enter: function(element, done) {

                var staggers = element[0].querySelectorAll('.stagger'),
                    background = element[0].querySelector('.background'),
                    container = element[0].querySelector('.container');

                if(!container) {
                    done();
                    return;
                }

                var tl = new TimelineMax({paused: true});

                tl
                    .from(element, _animDuration, {
                        opacity: 0,
                        delay: nextDelay,
                        ease: Power2.easeOut
                    })
                    .staggerFrom(staggers, .7, {
                        x: 50,
                        opacity: 0,
                        ease: Power2.easeOut,
                    }, _staggerDuration);

                if(background){
                    tl.from(background, 3, {
                        opacity: 0,
                        scale: 1.05,
                        ease: Ease.easeOut
                    });
                }

                tl.restart();

                nextDelay = .1 + _animDuration + (_staggerDuration / 2) * (staggers.length - 1);
                done();
            },

            leave: function(element, done) {
                var staggers = element[0].querySelectorAll('.stagger'),
                    background = element[0].querySelector('.background');

                var tl = new TimelineMax({paused: true, onComplete: done});

                if(background){
                    tl.to(background, _animDuration, {
                        scale: 1.05,
                        opacity: 0,
                        ease: Power2.easeIn
                    });
                }

                tl
                    .staggerTo(staggers, .3, {
                        x: -50,
                        opacity: 0,
                        ease: Back.easeIn,
                        easeParams: [3]
                    }, (_staggerDuration / 2) )
                    .to(element, _animDuration, {
                        opacity: 0,
                        ease: Power2.easeIn
                    });

                tl.restart();
            }
        };
    })
    .animation('.animBackward', function($rootScope) {

        return {
            enter: function(element, done) {

                var staggers = element[0].querySelectorAll('.stagger'),
                    background = element[0].querySelector('.background'),
                    container = element[0].querySelector('.container');

                if(!container) {
                    done();
                    return;
                }

                var tl = new TimelineMax({paused: true});

                tl
                    .from(element, _animDuration, {
                        opacity: 0,
                        delay: nextDelay,
                        ease: Power2.easeOut
                    })
                    .staggerFrom(staggers, .7, {
                        x: -50,
                        opacity: 0,
                        ease: Power2.easeOut,
                    }, _staggerDuration);

                if(background){
                    tl.from(background, 3, {
                        opacity: 0,
                        scale: 1.05,
                        ease: Ease.easeOut
                    });
                }

                tl.restart();

                nextDelay = .1 + _animDuration + (_staggerDuration / 2) * (staggers.length - 1);
                done();
            },

            leave: function(element, done) {
                var staggers = element[0].querySelectorAll('.stagger'),
                    background = element[0].querySelector('.background');

                var tl = new TimelineMax({paused: true, onComplete: done});

                if(background){
                    tl.to(background, _animDuration, {
                        scale: 1.05,
                        opacity: 0,
                        ease: Power2.easeIn
                    });
                }

                tl
                    .staggerTo(staggers, .3, {
                        x: 50,
                        opacity: 0,
                        ease: Back.easeIn,
                        easeParams: [3]
                    }, (_staggerDuration / 2) )
                    .to(element, _animDuration, {
                        opacity: 0,
                        ease: Power2.easeIn
                    });

                tl.restart();
            }
        };
    })
})();
