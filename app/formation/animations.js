(function() {
    var _animDuration = .4;

    angular.module('animations.formation', [])
        .animation('.formationView', function($rootScope) {

            return {
                enter: function(element, done) {

                    var container = element[0].querySelector('.container'),
                        image = element[0].querySelector('.Image'),
                        details = element[0].querySelector('.Details');

                    if (!container) return;

                    TweenMax.set(container, {
                        x: '100%'
                    });

                    TweenMax.set(details, {
                        height: '100%',
                        zIndex: 1
                    });


                    var tl = new TimelineLite();

                    tl
                        .to(container, _animDuration, {
                            x: '0%',
                            ease: Power2.easeOut
                        })
                        .to(details, _animDuration, {
                            height: '50%',
                            ease: Power2.easeOut,
                            onComplete: done
                        });
                },

                leave: function(element, done) {
                    var container = element[0].querySelector('.container');
                    if (!container) return;
                    TweenMax.to(container, _animDuration, {
                        x: '100%',
                        ease: Power2.easeOut,
                        onComplete: done
                    });
                }
            };
        })
        .animation('.conferenceView', function($rootScope) {

            return {
                enter: function(element, done) {
                    var container = element[0].querySelector('.container'),
                        image = element[0].querySelector('.Image'),
                        details = element[0].querySelector('.Details');

                    if (!container) return;

                    TweenMax.set(container, {
                        x: '-100%'
                    });

                    TweenMax.set(details, {
                        height: '100%'
                    });


                    var tl = new TimelineLite();

                    tl
                        .to(container, _animDuration, {
                            x: '0%',
                            ease: Power2.easeOut
                        })
                        .to(details, _animDuration, {
                            height: '50%',
                            ease: Power2.easeOut,
                            onComplete: done
                        });
                },

                leave: function(element, done) {
                    var container = element[0].querySelector('.container');
                    if (!container) return;
                    TweenMax.to(container, _animDuration, {
                        x: '-100%',
                        ease: Power2.easeOut,
                        onComplete: done
                    });
                }
            };
        });
})();
