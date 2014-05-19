'use strict';

describe('Service: Names', function () {

  // load the service's module
  beforeEach(module('personNamesApp'));

  // instantiate service
  var Names;
  beforeEach(inject(function (_Names_) {
    Names = _Names_;
  }));

  it('should do something', function () {
    expect(!!Names).toBe(true);
  });

});
