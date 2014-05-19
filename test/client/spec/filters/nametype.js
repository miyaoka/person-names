'use strict';

describe('Filter: nametype', function () {

  // load the filter's module
  beforeEach(module('personNamesApp'));

  // initialize a new instance of the filter before each test
  var nametype;
  beforeEach(inject(function ($filter) {
    nametype = $filter('nametype');
  }));

  it('should return the input prefixed with "nametype filter:"', function () {
    var text = 'angularjs';
    expect(nametype(text)).toBe('nametype filter: ' + text);
  });

});
