(function() {
    var _animDuration = .4;

    angular.module('animations.savoirFaire', [])
        .animation('.halfRight', function($rootScope) {

            return {
                enter: function(element, done) {
                    var container = element[0].querySelector('.container'),
                        picture = element[0].querySelector('.Picture'),
                        details = element[0].querySelector('.Details');

                    if (!container) return;

                    var tl = new TimelineLite();


                    TweenMax.set(details, {
                        minHeight: '100%',
                        top: '0%'
                    });

                    TweenMax.set(picture.querySelector('img'), {
                        opacity: 0
                    });

                    tl
                        .from(container, _animDuration, {
                            x: '100%',
                            ease: Power2.easeOut
                        })
                        .to(details, _animDuration, {
                            top: '50%',
                            minHeight: '50%',
                            ease: Power2.easeOut,
                            onComplete: done
                        });

                    element[0].querySelector('.Picture img').addEventListener('load', function(){
                        TweenMax.to(this, _animDuration, {
                            opacity: 1
                        });
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
        .animation('.halfLeft', function($rootScope) {

            return {
                enter: function(element, done) {
                    var container = element[0].querySelector('.container'),
                        picture = element[0].querySelector('.Picture'),
                        details = element[0].querySelector('.Details');

                    if (!container) return;

                    var tl = new TimelineLite();

                    TweenMax.set(details, {
                        minHeight: '100%',
                        top: '0%'
                    });

                    TweenMax.set(picture.querySelector('img'), {
                        opacity: 0
                    });

                    tl
                        .from(container, _animDuration, {
                            x: '-100%',
                            ease: Power2.easeOut
                        })
                        .to(details, _animDuration, {
                            top: '50%',
                            minHeight: '50%',
                            ease: Power2.easeOut,
                            onComplete: done
                        });

                    element[0].querySelector('.Picture img').addEventListener('load', function(){
                        TweenMax.to(this, _animDuration, {
                            opacity: 1
                        });
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
