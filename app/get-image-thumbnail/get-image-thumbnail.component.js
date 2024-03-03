angular.
  module('getImageThumbnail').
  component('getImageThumbnail', {

    templateUrl: 'get-image-thumbnail/get-image-thumbnail.template.html',

    controller: function GetImageThumbnailController($http, $scope, authService) {

      $scope.id = null;
      $scope.imageUrl = null;
      $scope.hasError = false;
      $scope.errorMessage = null;

      var getImage = function (size) {
        if ($scope.id) {
          let url = `https://localhost:7050/api/images/${$scope.id}/size/${size}`;
          let config = {};
          var token = authService.getToken();
          if (!token) {
            return;
          }
          config.headers = {
            'Authorization': 'Bearer ' + token
          };

          $http.get(url, config)
            .then(function success(response) {
              $scope.imageUrl = `https://localhost:7050/api/images/${$scope.id}/size/${size}`;
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

      $scope.get100 = function () {
        getImage(100);
      }

      $scope.get300 = function () {
        getImage(300);
      }

    }

  });