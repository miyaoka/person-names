'use strict';

describe('Filter: langlabel', function () {

  // load the filter's module
  beforeEach(module('personNamesApp'));

  // initialize a new instance of the filter before each test
  var langlabel;
  beforeEach(inject(function ($filter) {
    langlabel = $filter('langlabel');
  }));

  it('should return the input prefixed with "langlabel filter:"', function () {
    var text = 'angularjs';
    expect(langlabel(text)).toBe('langlabel filter: ' + text);
  });

});
