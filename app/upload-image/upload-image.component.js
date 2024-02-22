angular.
  module('uploadImage').
  component('uploadImage', {

    templateUrl: 'upload-image/upload-image.template.html',

    controller: function UploadImageController($http, $scope, authService) {

      $scope.uploadedImageUrl = null;
      $scope.imageUrl = "";
      $scope.hasError = false;
      $scope.errorMessage = null;
      var authData = authService.getAuthData();

      $scope.click = function () {
        if ($scope.imageUrl && $scope.imageUrl.length > 0) {
          let url = "https://localhost:7050/api/images";
          let data = {
            url: $scope.imageUrl
          };
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

          $http.post(url, data, config)
            .then(function success(response) {
              $scope.uploadedImageUrl = response.data.url;
              $scope.hasError = false;
              $scope.errorMessage = null;
            }, function (error) {
              console.error(error);
              $scope.uploadedImageUrl = null;
              if (error.status === 401) {
                authService.logout();
                return;
              }
              $scope.hasError = true;
              $scope.errorMessage = error.data;
            });
        }
      }
    }

  });