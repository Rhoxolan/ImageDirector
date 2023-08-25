angular.
  module('getImage').
  component('getImage', {

    templateUrl: 'get-image/get-image.template.html',

    controller: function GetImageController($http, $scope) {

      $scope.id = null;
      $scope.imageUrl = null;
      $scope.hasError = false;
      $scope.errorMessage = null;

      $scope.click = function () {
        if ($scope.id) {
          $http.get(`https://localhost:7050/api/images/${$scope.id}`,)
            .then(function success(response) {
              $scope.imageUrl = `https://localhost:7050/api/images/${$scope.id}`;
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