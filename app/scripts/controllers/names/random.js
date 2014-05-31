'use strict';

angular.module('personNamesApp')
  .controller('NamesRandomCtrl', function ($scope, RandomNames, Global, TableFactory) {

    $scope.tp = TableFactory.sortable({
      sorting: {
        'role': 'asc',
        'modified': 'desc'
      }
    });

    $scope.update = function(){
      RandomNames.update(function(res){
        console.log('update', res);
      });
    };
    $scope.firstNameParams = {};
    $scope.familyNameParams = {
      nametype : 'family'
    }
    var names = [];
    var find = function(firstNameParams, familyNameParams, count, cb){
      if(0 > --count){
        cb();
        return;
      }

    };
    $scope.find = function(){
      names = [];

      //性別の選択がなければ両方指定
      var firstNameParams = angular.copy($scope.firstNameParams);
      if(!firstNameParams.nametype || firstNameParams.nametype.length == 0){
        firstNameParams.nametype = Global.nameTypes.slice(1);
      }
      var familyNameParams = angular.copy($scope.familyNameParams);
      firstNameParams.num =
      familyNameParams.num = 20;

      RandomNames.query(firstNameParams, function(firstnames){
        RandomNames.query(familyNameParams, function(familynames){
          for(var i = 0; i < firstnames.length; i++){
            names.push({
              firstname: firstnames[i],
              familyname: familynames[i]
            })
          }
          $scope.tp.setItems(names);
        });
      });

    };

  });
