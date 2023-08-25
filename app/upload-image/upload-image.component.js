angular.
  module('uploadImage').
  component('uploadImage', {

    templateUrl: 'upload-image/upload-image.template.html',

    controller: function UploadImageController($http, $scope) {

      $scope.uploadedImageUrl = null;
      $scope.imageUrl = "";
      $scope.hasError = false;
      $scope.errorMessage = null;

      $scope.click = function () {
        if ($scope.imageUrl && $scope.imageUrl.length > 0) {
          $http.post("https://localhost:7050/api/images", { url: $scope.imageUrl })
            .then(function success(response) {
              $scope.uploadedImageUrl = response.data.url;
              $scope.hasError = false;
              $scope.errorMessage = null;
            }, function (error) {
              console.error(error);
              $scope.uploadedImageUrl = null;
              $scope.hasError = true;
              $scope.errorMessage = error.data;
            });
        }
      }
    }

  });