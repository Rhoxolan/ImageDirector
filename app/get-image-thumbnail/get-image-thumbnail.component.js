angular.
  module('getImageThumbnail').
  component('getImageThumbnail', {
    
    templateUrl: 'get-image-thumbnail/get-image-thumbnail.template.html',
    
    controller: function GetImageThumbnailController($http, $scope) {
        
      $scope.id = null;
      $scope.imageUrl = null;
      $scope.hasError = false;
      $scope.errorMessage = null;

      $scope.get100 = function () {
        if ($scope.id) {
          $http.get(`https://localhost:7050/api/images/${$scope.id}/size/100`,)
            .then(function success(response) {
              $scope.imageUrl = `https://localhost:7050/api/images/${$scope.id}/size/100`;
              $scope.hasError = false;
              $scope.errorMessage = null;
            }, function (error) {
              console.error(error);
              $scope.imageUrl = null;
              $scope.hasError = true;
              $scope.errorMessage = error.data.title;
            });
        }
      }

      $scope.get300 = function () {
        if ($scope.id) {
          $http.get(`https://localhost:7050/api/images/${$scope.id}/size/300`,)
          .then(function success(response) {
            $scope.imageUrl = `https://localhost:7050/api/images/${$scope.id}/size/300`;
            $scope.hasError = false;
            $scope.errorMessage = null;
          }, function (error) {
            console.error(error);
            $scope.imageUrl = null;
            $scope.hasError = true;
            $scope.errorMessage = error.data.title;
          });
        }
      }

    }
  
  });