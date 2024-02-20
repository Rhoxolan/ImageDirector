angular.
  module('auth').
  component('auth', {

    templateUrl: 'auth/auth.template.html',

    controller: function AuthController($http, $scope, authService) {

      $scope.userName = null;
      $scope.authData = authService.getAuthData();
      $scope.hasError = false;
      $scope.errorMessage = null;

      $scope.init = function () {
        let userName = authService.check();
        if(userName){
          $scope.userName = userName;
        }
      };

      $scope.register = function () {
        if ($scope.userName && document.getElementById("Password").value.length > 0) {
          $http.post("https://localhost:7050/api/account/register", {
            Login: $scope.userName,
            Password: document.getElementById("Password").value
          })
            .then(function success(response) {
              document.getElementById("Password").value = '';
              authService.login($scope.userName, response.data.token);
              $scope.hasError = false;
              $scope.errorMessage = null;
            }, function (error) {
              console.error(error);
              $scope.hasError = true;
              $scope.errorMessage = error.data;
            });
        }
      }

      $scope.login = function () {
        if ($scope.userName && document.getElementById("Password").value.length > 0) {
          $http.post("https://localhost:7050/api/account/login", {
            Login: $scope.userName,
            Password: document.getElementById("Password").value
          })
            .then(function success(response) {
              document.getElementById("Password").value = '';
              authService.login($scope.userName, response.data.token);
              $scope.hasError = false;
              $scope.errorMessage = null;
            }, function (error) {
              console.error(error);
              $scope.hasError = true;
              $scope.errorMessage = error.data;
            });
        }
      }

      $scope.logout = function () {
        authService.logout();
        $scope.userName = null;
      }

    }

  });