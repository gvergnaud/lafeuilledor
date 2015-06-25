angular.module('App.mobile', [])
    .controller('MobileCtrl', function($scope, $rootScope, Api) {

        $scope.savoirs = [];

        Api.getSavoirFaire()
            .then(function(savoirs){
                $scope.savoirs = savoirs;
            });

        Api.getHistoire()
            .then(function(histoire){
                $scope.introduction = histoire[0].content;
            });
    });
