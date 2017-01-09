'use strict';

angular.module('myApp.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {
    templateUrl: 'list/list.html',
    controller: 'ListCtrl'
  });
}])

.controller('ListCtrl', ['$scope','$rootScope','$location','$routeParams','$http',
    function($scope,$rootScope,$location,$routeParams,$http) {

    if($routeParams.query && $routeParams.index){
        var url = 'http://localhost:8001/books/?q='+$routeParams.query+'&index='+$routeParams.index;

        if($routeParams.page){
            url += '&page='+$routeParams.page;
        }

        if($routeParams.index == 'subject'){
            $scope.index_disease = true;
        }else{
            $scope.index_disease = false;
        }

        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            $rootScope.result = response.data;

            $scope.paginator_array = new Array(response.data.page_count).join().split(',')
                .map(function(item, index){ return ++index;});
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

    // Detail callback
    $scope.detail = function(book) {
        $rootScope.book = book;
        var book_code = '';
        if(book.isbn13){
            book_code = book.isbn13;
        }else if (book.isbn10){
            book_code = book.isbn13;
        }else{
            book_code = book.id;
        }
        $location.path('book/'+book_code);
    };

    // Pagination callback
    $scope.move_to_page = function(page) {
        $location.path('list').search({
            index:  $routeParams.index,
            query:  $routeParams.query,
            page:   page
        });
    };
}]);