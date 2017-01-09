'use strict';

angular.module('myApp.book', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/book/:id', {
    templateUrl: 'book/book.html',
    controller: 'BookCtrl'
  });
}])

.controller('BookCtrl', ['$scope','$rootScope','$routeParams','$http',
    function($scope,$rootScope,$routeParams,$http) {

    $scope.book = $rootScope.book;

    // If book comes with all the data, show it, else, search it.
    if($scope.book && ($scope.book.isbn13 || $scope.book.isbn10)){
        $scope.book = $rootScope.book;
    }else{
        $http({
            method: 'GET',
            url: 'http://localhost:8001/books/'+$routeParams.id
        }).then(function successCallback(response) {
            $scope.book = response.data;
        }, function errorCallback(error) {
            if(error.status == 500){
                $rootScope.error = 'Vaya, parece que tuvimos un problema interno.' +
                    ' Si el problema persiste por favor notifica al administrador';
            }else if(error.status == 404){
                $rootScope.error = 'No hemos podido encontrar tu libro. ' +
                    '¿Estás seguro que estás usando el índice adecuado?';
            }
        });
    }
}]);