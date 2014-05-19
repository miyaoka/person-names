'use strict';

angular.module('personNamesApp')
  .controller('NamesCreateCtrl', function ($scope, Names, Navigation) {
    $scope.name = new Names({
      'nametype': 'family',
      'lang': 'en'
    });
    $scope.update = function(){
      $scope.name.$save(function(res){
        console.log('create', res);
        Navigation.names(res._id).view();
      })
    }
  });
