'use strict';

angular.module('personNamesApp')
  .controller('InitCtrl', function ($scope, Navigation, Global) {
    //appのscopeにナビゲーション用のserviceを割り当てておく
    $scope.nav = Navigation;
    $scope.global = Global;
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
    $httpProvider.defaults.withCredentials = true;
  })
  .factory('httpInterceptor', function ($q, toaster, Global) {
    var methods = {
      'GET' : '取得',
      'DELETE' : '削除',
      'PUT' : '更新',
      'POST' : '登録'
    };
    return {
      requestError: function(rejection) {
        // do something on error
        return $q.reject(rejection);
      },
      response: function (response) {
        // do something on success
        if(response.config.method != 'GET'){
          //ログイン以外は処理成功を表示
          toaster.pop('success', methods[response.config.method] + '完了', response.config.method + ' ' + response.config.url);
        }
        return response;
      },
      responseError: function (rejection) {
        // do something on error
        toaster.pop('error', methods[rejection.config.method] + '失敗', rejection.config.method + ' ' + rejection.config.url);
        return $q.reject(rejection);
      }
    };
  });