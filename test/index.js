/*
This file is part of Minotaur.

Minotaur is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Minotaur is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Minotaur.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const Plane = require('../lib/plane');
const Cursor = require('../lib/cursor');

describe('Plane', function () {
  let plane = null;

  it('should initialize with correct data', function (done) {
    plane = new Plane([10, 10]);
    assert(plane, 'plane should be initialized');
    done();
  });

  it('should not initialize with incorrect data', function (done) {
    let plane2 = null;
    let error = null;
    try {
      plane2 = new Plane([-5, 0]);
    } catch (e) {
      error = e;
    }

    assert(!plane2, 'plane should not be initialized.');
    assert(error, 'plane should throw an error.');
    done();
  });

  it('should not initialize with too many coordinates', function (done) {
    let plane3 = null;
    let error = null;
    try {
      plane3 = new Plane([4, 2, 6]);
    } catch (e) {
      error = e;
    }

    assert(!plane3, 'plane should not be initialized.');
    assert(error, 'plane should throw an error.');
    done();
  });

  it('should know when coordinates are in bounds', function (done) {
    let retval = plane.inBounds([10, 10]);
    assert(retval, '[10, 10] is inBounds');
    done();
  });

  it('should know when coordinates are out of bounds', function (done) {
    let retval = plane.inBounds([11, 10]);
    assert(!retval, '[11, 10] is not inBounds');
    done();
  });

  it('should know when there are no boundary violations', function (done) {
    let retval = plane.describeBoundaryViolations([10, 10]);
    expect(retval).to.deep.equal([0, 0]);
    done();
  });

  it('should describe the extent of boundary violations', function (done) {
    let retval = plane.describeBoundaryViolations([11, 10]);
    expect(retval).to.deep.equal([-1, 0]);

    let retval2 = plane.describeBoundaryViolations([9, 12]);
    expect(retval2).to.deep.equal([0, -2]);

    let retval3 = plane.describeBoundaryViolations([-1, 8]);
    expect(retval3).to.deep.equal([1, 0]);

    let retval4 = plane.describeBoundaryViolations([7, -2]);
    expect(retval4).to.deep.equal([0, 2]);

    let retval5 = plane.describeBoundaryViolations([13, -3]);
    expect(retval5).to.deep.equal([-3, 3]);
    done();
  });
});

describe('Cursor', function () {
  let cursor = null;
  let plane = new Plane([5, 5]);

  it('should initialize correctly', function (done) {
    cursor = new Cursor([0, 0], plane);
    assert(cursor, 'cursor should be initialized');
    done();
  });
});
