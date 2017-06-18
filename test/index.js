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
const Map = require('../lib/map');
const Point = require('../lib/point');

describe('Plane', function () {
  let plane = null;

  it('should initialize with correct data', function (done) {
    plane = new Plane([10, 10]);
    assert(plane, `plane should be initialized but is ${plane}`);
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

    assert(!plane2, 'plane should not be initialized!');
    assert(error, 'plane should throw an error!');
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

    assert(!plane3, 'plane should not be initialized!');
    assert(error, 'plane should throw an error!');
    done();
  });

  it('should know when coordinates are in bounds', function (done) {
    let retval = plane.inBounds([10, 10]);
    assert(retval,
      `inBounds should return true for [10, 10] but returned ${retval}`);
    done();
  });

  it('should know when coordinates are out of bounds', function (done) {
    let retval = plane.inBounds([11, 10]);
    assert(!retval,
      `inBounds should return false for [11, 10] but returned ${retval}`);
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

describe('Map', function () {
  it('should initialize correctly', function (done) {
    let map = new Map([10, 10]);
    assert(map, 'map should be initialized.');
    done();
  });

  it('points should initialize correctly', function (done) {
    let point2 = new Point({type: 'START'});
    expect(point2).to.deep.equal({type: 'START'});
    done();
  });

  it('should be able to set points by coordinate', function (done) {
    let map = new Map([10, 10]);
    map.set([0, 1], new Point({type: 'START'}));
    done();
  });

  let point = null;
  it('should be able to set points by path', function (done) {
    let map = new Map([10, 10]);
    point = new Point({type: 'TUNNEL'});
    map.set([0, 1], ['NORTH', 'NORTH'], point);
    done();
  });

  it('should be queriable by coordinate', function (done) {
    let map = new Map([10, 10]);
    let point = new Point({type: 'TUNNEL'});

    map.set([0, 2], point);
    let retval = map.get([0, 2]);
    expect(retval).to.deep.equal(point);
    done();
  });

  it('should be queriable by path', function (done) {
    let map = new Map([10, 10]);
    let point = new Point({type: 'END'});

    map.set([0, 2], ['NORTH', 'NORTH', 'EAST'], point);
    let retval = map.get([0, 2], ['NORTH', 'NORTH', 'EAST']);
    expect(retval).to.deep.equal(point);
    done();
  });

  it('path and point navigation should match', function (done) {
    let map = new Map([10, 10]);
    let point = new Point({type: 'START'});
    let position = map.set([5, 5], ['SOUTH', 'WEST', 'SOUTH', 'WEST'], point);
    let retval1 = map.get(position);
    let retval2 = map.get([5, 5], ['SOUTH', 'WEST', 'SOUTH', 'WEST']);
    expect(retval1).to.deep.equal(point);
    expect(retval2).to.deep.equal(point);
    done();
  });

  it('map.set by path should return coordinates', function (done) {
    let map = new Map([10, 10]);
    let point = new Point({type: 'TUNNEL'});
    let position = map.set([5, 5], ['SOUTH', 'WEST', 'SOUTH', 'WEST'], point);

    assert(((typeof position[Symbol.iterator] === 'function') &&
      (typeof position[0] === 'number')),
      `map.set by path should return a Cursor but returned ${position}`);
    done();
  });

  it('map.set by coordinates should always return coordinates', function (done) {
    let map = new Map([10, 10]);
    let point = new Point({type: 'TUNNEL'});
    let position = map.set([7, 7], point);

    assert(((typeof position[Symbol.iterator] === 'function') &&
      (typeof position[0] === 'number')),
      `map.set by path should return a Cursor but returned ${position}`);
    done();
  });
});
