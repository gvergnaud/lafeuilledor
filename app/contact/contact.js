'use strict';

angular.module('App.contact', [
        'App.contact.membre',
        'ui.router',
        'animations.contact'
    ])
    .config(function($stateProvider) {

        $stateProvider
            .state('contact', {
                url: '/contact',
                views: {
                    'main': {
                        templateUrl: 'app/contact/contact.html',
                        controller: 'ContactCtrl',
                        controllerAs: 'contact'
                    }
                }
            });
    })
    .controller('ContactCtrl', function($scope, $timeout, Api) {

        var contact = this;

        contact.sendMessageSuccess = false;
        contact.sendMessageError = false;


        contact.send = function(e){
            e.preventDefault();

            var message = {
                name: e.target.name.value.trim(),
                mail: e.target.mail.value.trim(),
                subject: e.target.subject.value.trim(),
                content: e.target.message.value.trim()
            };

            Api.send(message)
                .then(function success(data) {
                    successMessage();
                    console.log('message envoyé !', data);
                }, function error(){
                    errorMessage();
                });
        };

        function successMessage(){
            contact.sendMessageSuccess = true;
            $timeout(function(){
                contact.sendMessageSuccess = false;
            }, 3000);
        }

        function errorMessage(){
            contact.sendMessageError = true;
            $timeout(function(){
                contact.sendMessageError = false;
            }, 2500);
        }

    });
