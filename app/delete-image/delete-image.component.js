angular.
  module('deleteImage').
  component('deleteImage', {

    templateUrl: 'delete-image/delete-image.template.html',
    
    controller: function DeleteImageController($http, $scope) {

      $scope.id = null;

      $scope.click = function () {
        if ($scope.id) {
          $http.delete(`https://localhost:7050/api/images/${$scope.id}`,)
            .then(function success(response) {
             alert(`The image with id ${$scope.id} was succesfully removed`);
            }, function (error) {
              console.error(error);
            });
        }
      }
        
    }
  });