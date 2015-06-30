'use strict';
angular.module('animations.galerie', [])
    .animation('.singleView', function($rootScope) {

        return {
            enter: function(element, done) {
                TweenMax.from(element, .3, {
                    opacity: 0,
                    ease: Power2.easeOut,
                    onComplete: done
                });
            },

            leave: function(element, done) {
                TweenMax.to(element, .3, {
                    opacity: 0,
                    ease: Power2.easeOut,
                    onComplete: done
                });
            }
        };
    })
