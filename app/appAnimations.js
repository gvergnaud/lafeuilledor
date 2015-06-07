(function() {
    var _animDuration = .4,
        _staggerDuration = .1;

    angular.module('animations.app', [])
        .animation('.mainView', function($rootScope) {

            return {
                enter: function(element, done) {

                    var staggers = element[0].querySelectorAll('.stagger'),
                        background = element[0].querySelector('.background'),
                        container = element[0].querySelector('.container'),
                        delay = _animDuration + _staggerDuration * (staggers.length - 1);

                    if(!container) {
                        done();
                        return;
                    }

                    var tl = new TimelineMax({paused: true, onComplete: done});

                    tl
                        .from(element, _animDuration, {
                            opacity: 0,
                            delay: delay,
                            ease: Power2.easeOut
                        })
                        .staggerFrom(staggers, .7, {
                            x: 50,
                            opacity: 0,
                            ease: Power2.easeOut,
                        }, _staggerDuration);

                    if(background){
                        tl.from(background, 3.5, {
                            opacity: 0,
                            scale: 1.05,
                            ease: Ease.easeOut
                        });
                    }


                    tl.restart();
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
                            ease: Power2.easeIn,
                        }, .04)
                        .to(element, _animDuration, {
                            opacity: 0,
                            ease: Power2.easeIn
                        });

                    tl.restart();
                }
            };
        })
})();
