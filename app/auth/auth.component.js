angular.
  module('auth').
  component('auth', {

    templateUrl: 'auth/auth.template.html',

    controller: function AuthController($http, $scope) {

      $scope.userName = null;
      $scope.isAuthorized = false;

      $scope.login = function () {
        
      }

      $scope.logout = function () {
        
      }

    }

  });