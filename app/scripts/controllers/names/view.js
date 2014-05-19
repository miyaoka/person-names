'use strict';

angular.module('personNamesApp')
  .controller('NamesViewCtrl', function ($scope, $routeParams, Names, Navigation) {

    Names.get({
      nameId: $routeParams.nameId
    }, function(res) {
      $scope.name = new Names(res);
      $scope.orig_name = res;
    });

    $scope.update = function(){
      $scope.name.$update(function(res){
        console.log('submit', res);
      });
    };
    $scope.remove = function(){
      $scope.name.$delete(function(res){
        console.log('del', res);
        Navigation.names().list();
      })
    }
    $scope.reset = function(){
      $scope.name = new Names($scope.orig_name);
    };
  });
