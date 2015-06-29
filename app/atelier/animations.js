angular.module('animations.atelier', [])
    .animation('.center', function($rootScope) {

        var direction,
            duration = .4,
            stagger = .1,
            translateY = 30;

        $rootScope.$on('TIMELINE_SCROLL_DOWN', function(){
            direction = 'down';
        });

        $rootScope.$on('TIMELINE_SCROLL_UP', function(){
            direction = 'up';
        });

        return {
            enter: function(element, done) {

                var elements = element[0].querySelectorAll('.stagger');
                var y = direction === 'down' ? translateY : -translateY;
                var staggerDuration = direction === 'down' ? stagger : -stagger;
                var delay = .2 + duration + stagger * (elements.length - 1);

                TweenMax.staggerFrom(elements, duration, {
                    y: y,
                    opacity: 0,
                    ease: Back.easeOut,
                    easeParams: [3],
                    delay: delay,
                }, staggerDuration, done);
            },

            leave: function(element, done) {

                var elements = element[0].querySelectorAll('.stagger');
                var y = direction === 'down' ? -translateY : translateY
                var staggerDuration = direction === 'down' ? stagger : -stagger;

                TweenMax.staggerTo(elements, duration/2, {
                    y: y,
                    opacity: 0,
                    delay: .1,
                    ease: Power1.easeIn
                }, staggerDuration, done);
            }
        };
    })
    .animation('.Infos', function(){

        var prevDate = 1980;

        return {

            enter: function(element, done) {

                element[0].querySelector('.Infos-trait').classList.add('hidden');
                element[0].querySelector('.Infos-lieu').classList.add('hidden');

                var onCountStop = function(){
                    setTimeout(function(){
                        element[0].querySelector('.Infos-trait').classList.remove('hidden');
                        setTimeout(function(){
                            element[0].querySelector('.Infos-lieu').classList.remove('hidden');
                        }, 350);
                    }, 750);
                    done();
                };

                var dateUp = new countUp(
                    element[0].querySelector('.Infos-date'),
                    prevDate,
                    element.scope().section.date,
                    0,
                    2.1,
                    {
                        separator: false
                    }
                );

                dateUp.start(onCountStop);

                prevDate = element.scope().section.date;
            },

            leave: function(element, done) {
                element[0].querySelector('.Infos-trait').classList.add('hidden');
                element[0].querySelector('.Infos-lieu').classList.add('hidden');
                done();
            }
        };
    });
