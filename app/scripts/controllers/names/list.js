'use strict';

angular.module('personNamesApp')
  .controller('NamesListCtrl', function ($scope, Names, RandomNames, TableFactory) {
    $scope.tp = new TableFactory.sortable();
    $scope.tp.settings({
      counts : [10, 100, 1000, 10000, 1000000]
    });

    $scope.search = function(){
      Names.query($scope.params, function(res) {
        $scope.tp.setItems(res);
      });
    };
    $scope.reset = function(){
      $scope.params = {};
    };
    $scope.remove = function(){
      Names.delete($scope.params, function(res) {
        $scope.search();
      });
    }
    $scope.random = function(){
      RandomNames.get($scope.params, function(res) {
        $scope.tp.setItems([res]);
      });
    }
  });
