angular.
  module('uploadImage').
  component('uploadImage', {

    templateUrl: 'upload-image/upload-image.template.html',

    controller: function UploadImageController($http, $scope) {

      $scope.uploadedImageUrl = null;
      $scope.imageUrl = "";

      $scope.click = function () {
        if ($scope.imageUrl && $scope.imageUrl.length > 0) {
          $http.post("https://localhost:7050/api/images", { url: $scope.imageUrl })
            .then(function success(response) {
              $scope.uploadedImageUrl = response.data.url;
            }, function (error) {
              console.error(error);
              $scope.uploadedImageUrl = null;
            });
        }
      }
    }

  });