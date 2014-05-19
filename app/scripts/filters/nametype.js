'use strict';

angular.module('personNamesApp')
  .filter('nametype', function () {
    var labels = {
      'family': '苗字',
      'male': '男性名',
      'female': '女性名'
    }
    return function (input) {
      return labels[input];
    };
  });
