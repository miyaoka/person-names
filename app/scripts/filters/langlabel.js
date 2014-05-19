'use strict';

angular.module('personNamesApp')
  .filter('langlabel', function () {
    var labels = {
      'en': '英語',
      'de': 'ドイツ語',
      'fr': 'フランス語',
      'it': 'イタリア語',
      'es': 'スペイン語',
      'sv': 'スウェーデン語',
      'fi': 'フィンランド語',
      'ru': 'ロシア語',
      'cs': 'チェコ語',
      'ja': '日本語'
    }
    return function (input) {
      return labels[input];
    };
  });