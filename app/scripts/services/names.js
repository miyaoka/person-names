'use strict';

angular.module('personNamesApp')
  .factory('Names', function (Global, $resource) {
    return $resource('/api/names/:nameId', {
      nameId: '@_id'
    },
    {
      'update': {
        method: 'PUT'
      }
    });
  })
  .factory('RandomNames', function (Global, $resource) {
    return $resource('/api/names/random', {
    },
    {
      'update': {
        method: 'PUT'
      }
    });
  });
