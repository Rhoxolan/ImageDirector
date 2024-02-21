angular.module('ImageDirectorApp')
    .controller('AppController', ['$scope', 'authService', function($scope, authService) {
        $scope.authData = authService.getAuthData();
    }]);