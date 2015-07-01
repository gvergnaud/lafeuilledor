'use strict';
angular.module('animations.contact', [])
    .animation('.MessageBox', function($rootScope) {

        return {
            enter: function(element, done) {
                TweenMax.from(element, .3, {
                    scale: 0,
                    opacity: 0,
                    ease: Back.easeOut,
                    easeParams: [4],
                    onComplete: done
                });
            },

            leave: function(element, done) {
                TweenMax.to(element, .3, {
                    scale: 0,
                    opacity: 0,
                    ease: Back.easeIn,
                    easeParams: [4],
                    onComplete: done
                });
            }
        };
    })
