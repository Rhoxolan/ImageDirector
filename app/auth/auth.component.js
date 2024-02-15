angular.
  module('auth').
  component('auth', {

    templateUrl: 'auth/auth.template.html',

    controller: function AuthController($http, $scope) {

      var tokenKey = "image_wizard_access_token";
      var userNameKey = "image_director_username";
      $scope.userName = null;
      $scope.isAuthorized = false;
      $scope.hasError = false;
      $scope.errorMessage = null;

      $scope.init = function () {
        let token = sessionStorage.getItem(tokenKey);
        let userName = sessionStorage.getItem(userNameKey);
        if(token && userName){
          $scope.isAuthorized = true;
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
              sessionStorage.setItem(userNameKey, $scope.userName);
              sessionStorage.setItem(tokenKey, response.data.token);
              $scope.isAuthorized = true;
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
              sessionStorage.setItem(userNameKey, $scope.userName);
              sessionStorage.setItem(tokenKey, response.data.token);
              $scope.isAuthorized = true;
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
        sessionStorage.removeItem(tokenKey);
        sessionStorage.removeItem(userNameKey);
        $scope.userName = null;
        $scope.isAuthorized = false;
      }

    }

  });