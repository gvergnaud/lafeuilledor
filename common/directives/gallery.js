'use strict';

angular.module('directives.gallery', [])
    .directive('gallery', function(){

        return {

            restrict: 'E',

            link: function(scope, gallery, attrs){

                var nbCol = parseInt(attrs.galleryNbCol),
                    margin = parseInt(attrs.galleryColMargin),
                    width = parseInt(attrs.galleryColWidth),
                    elements = [];

                gallery.css({
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: nbCol * (width + margin) + 'px',
                    transform: 'translate(-50%, -50%)'
                });


                var getX = function(index){
                    return (index % nbCol) * width + (index % nbCol) * margin;
                };

                var getY = function(index){

                    var y = 0;

                    var addPreviousElementHeight = function(i){
                        if(elements[i - nbCol]){
                            var previousElement = elements[i - nbCol][0];
                            y += previousElement.offsetHeight + margin;
                            addPreviousElementHeight(i - nbCol);
                        }
                    };

                    addPreviousElementHeight(index);

                    return y;
                };


                scope.getPosition = function(element){
                    var index = elements.indexOf(element);

                    if(index === -1)
                        index = elements.push(element) - 1; // push renvoi la length du tableau après ajout

                    var position = {};

                    position.x = getX(index);
                    position.y = getY(index);
                    position.width = width;


                    return position;
                };

                window.addEventListener('resize', function(){
                    elements = [];
                });
            }
        };
    })
    .directive('galleryElement', function(){

        return {

            restrict: 'A',

            link: function(scope, element, attrs){

                var setPosition = function(element){
                    var position = scope.$parent.getPosition(element);

                    element.css({
                        position: 'absolute',
                        width: position.width + 'px',
                        transform: 'translate(' + position.x + 'px, ' + position.y + 'px)'
                    });
                };

                setPosition(element);

                window.addEventListener('resize', function(){
                    setPosition(element);
                });
            }
        }
    })
