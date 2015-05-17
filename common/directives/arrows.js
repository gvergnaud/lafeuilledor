'use strict';

angular.module('directives.arrows', [])
    .directive('arrowLeft', function() {

        return {

            restrict: 'E',

            scope: {
                color: '@'
            },

            template: [

                '<svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 37.9 50.8" enable-background="new 0 0 37.9 50.8" xml:space="preserve">',
                '    <line fill="none" stroke="{{color}}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="26.5" y1="8" x2="9.6" y2="25"/>',
                '    <line fill="none" stroke="{{color}}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="26.5" y1="41.9" x2="9.6" y2="25"/>',
                '</svg>'

            ].join(''),

            link: function(scope, element, attrs) {

            }
        };
    })
    .directive('arrowRight', function() {

        return {

            restrict: 'E',

            scope: {
                color: '@'
            },

            template: [

                '<svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 37.9 50.8" enable-background="new 0 0 37.9 50.8" xml:space="preserve">',
                '<line fill="none" stroke="{{color}}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="12.1" y1="8.2" x2="29" y2="25.1"/>',
                '<line fill="none" stroke="{{color}}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="12.1" y1="42.1" x2="29" y2="25.1"/>',
                '</svg>'

            ].join(''),

            link: function(scope, element, attrs) {

            }
        };
    })
