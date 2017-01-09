'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.home',
    'myApp.book',
    'myApp.list',
    'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});
}])

.controller('IndexCtrl', ['$scope','$http','$location','$rootScope'
    ,function($scope,$http,$location,$rootScope) {
    $scope.search = {
        index: 'isbn',
        query: ''
    }
    $scope.submit = function() {
        var query = $scope.search.query;
        var index = $scope.search.index;

        if(index === 'isbn'){
            $http({
                method: 'GET',
                url: 'http://localhost:8001/books/'+query
            }).then(function successCallback(response) {
                $rootScope.book = response.data;
                $location.path('book/'+query);
            }, function errorCallback(error) {
                if(error.status == 500){
                    $rootScope.error = 'Vaya, parece que tuvimos un problema interno.' +
                        ' Si el problema persiste por favor notifica al administrador';
                }else if(error.status == 404){
                    $rootScope.error = 'No hemos podido encontrar tu libro. ' +
                        '¿Estás seguro que estás usando el índice adecuado?';
                }
            });
        }else{
            $location.path('list').search({
                index:index,
                query:query
            });
        }
    };
}]);
