'use strict';

angular.module('personNamesApp')
  .controller('NamesFetchCtrl', function ($scope, $resource, Names, $timeout) {
    var baseURL = 'http://www.worldsys.org';
    var basePath = '/europe/';

    var nameTypes = 'female male family'.split(' ');
    var urlLangs = 'english german french italian spanish swedish finnish russian czech'.split(' ');
    var langs = 'en de fr it es sv fi ru cs'.split(' ');

    $scope.logs = [];

    var fetchURL = function(pages, cb){
      if(!(0 < pages.length)){
        cb();
        return;
      }

      var page = pages.shift();
      $scope.logs.push('GET ' + page.path);


      $resource('/api/htcontent', {
        url: baseURL + page.path
      }).get(function(res){
        var e = angular.element(res.html);

        var names = [];
        var rows = e.find('.content_body_full.list tr');
        for(var i=0; i < rows.length; i++){
          var row = rows[i];
          names.push({
            name: row.children[0].textContent,
            kana: row.children[1].textContent,
            lang: page.lang,
            nametype: page.nametype
          });
        }
        $scope.logs.push(page.path + ' ... ' + rows.length);
        //dbに書き出し
        Names.save(names,function(res){
          $scope.logs.push(page.path + '...' + 'DB CREATED');
        });

        //続きがあれば取得ページを先頭に追加する
        var a_next = e.find('.anchor_next');
        if(0 != a_next.length) {
          pages.unshift({
            path: a_next[0].pathname,
            lang: page.lang,
            nametype: page.nametype
          })
        }

        $timeout(function(){
          fetchURL(pages, cb);
        }, 1000)
      });
    };

    $scope.fetch = function(){
      //取得対象リストを作成
      var pages = [];
      var names = [];
      for(var i = 0; i < urlLangs.length; i++){
        for(var j = 0; j < nameTypes.length; j++){
          pages.push({
            path: basePath + [urlLangs[i], nameTypes[j], 'names'].join('-'),
            lang: langs[i],
            nametype: nameTypes[j]
          });
        }
      }
      fetchURL(pages, function(){
        $scope.logs.push('fetch comp');
      });
    };
  });
