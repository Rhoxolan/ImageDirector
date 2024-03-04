angular.
  module('deleteImage').
  component('deleteImage', {

    templateUrl: 'delete-image/delete-image.template.html',
    
    controller: function DeleteImageController($http, $scope, authService) {

      $scope.id = null;
      $scope.hasError = false;
      $scope.errorMessage = null;

      $scope.click = function () {
        if ($scope.id) {
          let url = `https://localhost:7050/api/images/${$scope.id}`;
          let config = {};
          var token = authService.getToken();
          if (!token) {
            return;
          }
          config.headers = {
            'Authorization': 'Bearer ' + token
          };


          $http.delete(url, config)
            .then(function success(response) {
             alert(`The image with id ${$scope.id} was succesfully removed`);
             $scope.hasError = false;
             $scope.errorMessage = null;
            }, function (error) {
              console.error(error);
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