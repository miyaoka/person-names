'use strict';

angular.module('personNamesApp')
  .controller('NamesRandomCtrl', function ($scope, RandomNames) {

    $scope.update = function(){
      RandomNames.update(function(res){
        console.log('update', res);
      });
    };
    $scope.find = function(){
      RandomNames.get({
      }, function(res){
        console.log('get', res);
      });
    };
  });
