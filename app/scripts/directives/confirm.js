'use strict';

angular.module('personNamesApp')
  .directive('confirm', function () {
    return {
      priority: 1,
      terminal: true,
      link: function postLink(scope, element, attrs) {
        var msg = attrs.confirm || "Are you sure?";
        var clickAction = attrs.ngClick;
        element.bind('click', function(event) {
          if (window.confirm(msg)) {
            scope.$eval(clickAction)
          }
        });
      }
    };
  });
