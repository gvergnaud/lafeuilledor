'use strict';

angular.module('App', [
        'App.home',
        'App.atelier',
        'App.savoirfaire',
        'App.galerie',
        'App.formation',
        'App.contact',
        'App.mobile',

        'ui.router',
        'ngAnimate',
        'ngSanitize',

        'directives.menu',
        'directives.bindScreenWidth',

        'animations.app',

        'services.Api'
    ])
    .config(function($locationProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise('/');

    })
    .controller('AppCtrl', function($scope, $rootScope, $state, $timeout, Api) {
        var app = this;

        app.state = $state;

        app.language = 'fr';
        app.sectionAnimationType = 'animForward';
        app.minWidth = 960;

        Api.getAll();

        app.changeLanguage = function(language){
            if(app.language === language) return;

            app.language = language;
            Api.setLanguage(language);
            Api.getAll(true)
                .then(function(data){
                    $rootScope.$emit('APP_LANGUAGE_CHANGE', language);
                });
        };

        app.stopEventPropagation = function(e){
            e.stopPropagation();
        };

        var tabArray = [
            'home',
            'atelier',
            'savoirfaire',
            'galerie',
            'formation',
            'contact'
        ];

        app.go = function(nextStateName, params){

            var currentTab = tabArray.filter(function(tab){
                return $state.includes(tab);
            })[0];

            var nextTab = tabArray.filter(function(tab){
                return tab === nextStateName;
            })[0];

            if(
                currentTab &&
                nextTab &&
                tabArray.indexOf(currentTab) < tabArray.indexOf(nextTab)
            ){

                app.sectionAnimationType = 'animForward';

            }else{

                app.sectionAnimationType = 'animBackward';
            }

            $timeout(function(){
                $state.go(nextStateName, params);
            }, 50);
        };

    });
