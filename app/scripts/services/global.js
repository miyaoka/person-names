'use strict';

angular.module('personNamesApp')
  .factory('Global', function () {
    return {
      languages: 'en de fr it es sv fi ru cs ja'.split(' '),
      nameTypes: 'family male female'.split(' '),
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
