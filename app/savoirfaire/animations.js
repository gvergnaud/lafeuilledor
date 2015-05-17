angular.module('animations.savoirFaire', [])
    .animation('.savoirView', function() {

        return {
            enter: function(element, done) {
                var container = element[0].querySelector('#savoirContainer')
                    details = element[0].querySelector('.Details')
                    picture = element[0].querySelector('.Picture');

                if (!container) return;


                var tl = new TimelineLite();

                TweenMax.set(details, {
                    x: '100%',
                    width: '103%',
                    zIndex: 6
                })
                TweenMax.set(picture, {
                    opacity: 0
                });

                tl
                    .to(details, .7, {
                        x: '0%',
                        delay: .7,
                        ease: Ease.easeOut
                    })
                    .set(picture, {
                        opacity: 1
                    })
                    .to(details, 1, {
                        width: '50%',
                        delay: -.2,
                        ease: Power2.easeInOut
                    })
                    .to(details, 1, {
                        width: '50%'
                    })
                    .to(picture, 0, {
                        onComplete: done
                    });


                var img = picture.querySelector('img');
                TweenMax.set(img, {
                    opacity: 0
                });
                img.addEventListener('load', function(){
                    TweenMax.to(img, 1, {
                        opacity: 1
                    });
                });
            },

            leave: function(element, done) {
                var container = element[0].querySelector('#savoirContainer')
                    details = element[0].querySelector('.Details')
                    picture = element[0].querySelector('.Picture'),
                    tl = new TimelineLite();

                if (container){
                    container.style.zIndex = 4;
                }

                if(picture && details){
                    tl
                        .to(picture, .4, {
                            x: '-100%',
                            ease: Power1.easeInOut
                        })
                        .set(picture, {
                            opacity: 0
                        })
                        .to(details, .4, {
                            x: '-100%',
                            delay: .2,
                            ease: Ease.easeIn,
                            onComplete: done
                        });
                }
            }
        };
    });
