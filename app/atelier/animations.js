angular.module('animations.atelier', [])
    .animation('.center', function() {

        return {
            // beforeEnter: function(element, done){
            //     TweenMax.set(element, {
            //         y: '150%',
            //         opacity: 0
            //         });
            //     done();
            // },

            enter: function(element, done) {
                TweenMax.from(element, 1, {
                    y: '100%',
                    opacity: 0,
                    delay: .2,
                    onComplete: done
                });
            },

            leave: function(element, done) {
                TweenMax.to(element, 1, {
                    y: '-200%',
                    opacity: 0,
                    onComplete: done
                });
            }
        };

    });
