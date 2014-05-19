'use strict';

angular.module('personNamesApp')
  .service('Navigation', function Navigation($location) {
    var path = function(){
      var pathes = Array.prototype.slice.call(arguments);

      //パスが欠けていたら実行しない
      var hasNull = pathes.some(function(p){
        if(p == null) {
          return true;
        }
      });
      if(hasNull) return;

      $location.path(pathes.join('/'));
    };

    this.home = function () { path('') };

    this.names = function(id) {
      var base = 'names';
      return {
        list : function(){ path(base) },
        create : function(){ path(base, 'create') },
        view : function(){ path(base, id) },
        edit : function(){ path(base, id, 'edit') }
      }
    };
  });
