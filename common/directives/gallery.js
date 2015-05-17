'use strict';

angular.module('directives.gallery', [])
    .directive('gallery', function($rootScope){

        return {

            restrict: 'E',

            scope: {
                nbCol: '@galleryNbCol',
                margin: '@galleryColMargin',
                width: '@galleryColWidth',
                isThumbnailsOpen: '='
            },

            transclude: true,

            template: '<div ng-transclude></div>',

            link: function(scope, gallery, attrs){


                var parseValues = function(){
                    scope.nbCol = parseInt(scope.nbCol);
                    scope.margin = parseInt(scope.margin);
                    scope.width = parseInt(scope.width);
                };

                var setStyle = function(){
                    gallery.css({
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: scope.nbCol * (scope.width + scope.margin) + 'px',
                        transform: 'translate(-50%, -50%)'
                    });
                };

                var emitChange = function(){
                    parseValues();
                    setStyle();
                    // $rootScope.$emit('GALLERY_RESTART');
                    $rootScope.$emit('GALLERY_VALUE_CHANGE');
                };

                parseValues();
                setStyle();

                scope.$watch('galleryNbCol', emitChange);
                scope.$watch('galleryColMargin', emitChange);
                scope.$watch('galleryColWidth', emitChange);

                window.addEventListener('resize', emitChange);

            },

            controller: function($scope, $state){
                var elements = [];

                // recupère la position en x en fonction de index de l'element modulo le nombre de colone
                var getX = function(index){
                    return (index % $scope.nbCol) * $scope.width + (index % $scope.nbCol) * $scope.margin;
                };

                // recupère la position en y en fonction de la hauteur additionnée de tous les elements de la colone
                var getY = function(index){
                    var y = 0;
                    var addPreviousElementHeight = function(i){
                        if(elements[i - $scope.nbCol]){
                            var previousElement = elements[i - $scope.nbCol][0];
                            y += previousElement.offsetHeight + $scope.margin;
                            addPreviousElementHeight(i - $scope.nbCol);
                        }
                    };
                    addPreviousElementHeight(index);
                    return y;
                };

                this.getPosition = function(element){
                    var index = elements.indexOf(element);

                    if(index === -1)
                        index = elements.push(element) - 1; // push renvoi la length du tableau après ajout

                    var position = {};

                    position.x = getX(index);
                    position.y = getY(index);
                    position.width = $scope.width;

                    return position;
                };

                this.removeElement = function(element){
                    var index = elements.indexOf(element);
                    if(index !== -1)
                        elements.splice(index, 1);
                };

                this.closeThumbnails = function(callback){
                    if ($scope.isThumbnailsOpen) {

                        $scope.isThumbnailsOpen = false;

                        TweenMax.staggerTo(elements, .7, {
                            width: 0,
                            ease: Power4.easeInOut
                        }, .1, callback);
                    }
                };

                this.openThumbnails = function(callback){
                    if (!$scope.isThumbnailsOpen) {

                        $scope.isThumbnailsOpen = true;

                        TweenMax.staggerTo(elements, .7, {
                            width: $scope.width,
                            ease: Power4.easeInOut
                        }, .1, callback);
                    }
                };

                this.restart = function(){
                    elements = [];
                };

                var that = this;

                $rootScope.$on('$stateChangeSuccess', function($event, state, lastState){
                    if(state.name === 'galerie'){
                        that.openThumbnails();
                    }
                });

                $rootScope.$on('GALLERY_RESTART', this.restart);
            }
        };
    })
    .directive('galleryElement', function($rootScope){

        return {

            restrict: 'A',

            require: '^gallery',

            link: function(scope, element, attrs, galleryCtrl){


                var setPosition = function(){
                    var position = galleryCtrl.getPosition(element);

                    element.css({
                        position: 'absolute',
                        width: position.width + 'px',
                        left: position.x + 'px',
                        top: position.y + 'px'
                    });
                };

                setPosition();

                $rootScope.$on('GALLERY_VALUE_CHANGE', setPosition);

                element.on('$destroy', function(){
                    galleryCtrl.removeElement(element);
                });
            }
        }
    })
    .directive('galleryOpenOnClick', function($state){

        return {

            restrict: 'A',

            require: '^gallery',

            link: function(scope, element, attrs, galleryCtrl){

                element.on('click', function(){
                    galleryCtrl.closeThumbnails(function(){
                        $state.go('galerie.single', {slug: attrs.galleryOpenOnClick});
                    });
                });
            }
        };
    });
