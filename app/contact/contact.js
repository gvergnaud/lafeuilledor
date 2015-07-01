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

            if (!message.name || !message.mail || !message.subject || !message.content) return;

            Api.send(message)
                .then(onSuccess, onError);

            function onSuccess(data) {
                e.target.name.value =
                    e.target.mail.value =
                    e.target.subject.value =
                    e.target.message.value = '';
                displaySuccessMessage();
            }

            function onError(err){
                console.log(err);
                displayErrorMessage();
            }
        };

        function displaySuccessMessage(){
            contact.sendMessageSuccess = true;
            $timeout(function(){
                contact.sendMessageSuccess = false;
            }, 3000);
        }

        function displayErrorMessage(){
            contact.sendMessageError = true;
            $timeout(function(){
                contact.sendMessageError = false;
            }, 2500);
        }

    });
