angular.
  module('getImage').
  component('getImage', {

    templateUrl: 'get-image/get-image.template.html',

    controller: function GetImageController($http, $scope, authService) {

      $scope.id = null;
      $scope.imageUrl = null;
      $scope.hasError = false;
      $scope.errorMessage = null;
      var authData = authService.getAuthData();

      $scope.click = function () {
        if ($scope.id) {
          let url = `https://localhost:7050/api/images/${$scope.id}`;
          let config = {};

          if (authData.isAuthorized) {
            var token = authService.getToken();
            if (!token) {
              return;
            }
            config.headers = {
              'Authorization': 'Bearer ' + authService.getToken()
            };
          }

          $http.get(url, config)
            .then(function success(response) {
              $scope.imageUrl = `https://localhost:7050/api/images/${$scope.id}`;
              $scope.hasError = false;
              $scope.errorMessage = null;
            }, function (error) {
              console.error(error);
              $scope.imageUrl = null;
              if (error.status === 401) {
                authService.logout();
                return;
              }
              $scope.hasError = true;
              $scope.errorMessage = error.data.title;
            });
        }
      }

    }

  });