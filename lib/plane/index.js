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

const validate = require('../validate');
const debug = require('debug')('plane');

class Plane {
  constructor (coordinateBounds) {
    validate.coordinates(coordinateBounds);

    coordinateBounds.map((coord) => {
      if (coord < 0) {
        throw new Error('Cannot initialize plane with negative boundaries!');
      }
    });

    this.extent = [coordinateBounds[0], coordinateBounds[1]];
    this.points = {};
  }

  inBounds (coordinates) {
    validate.coordinates(coordinates);

    let retval = true;
    let i = 0;
    while (i <= coordinates.length) {
      if (coordinates[i] > this.extent[i] || coordinates[i] < 0) {
        retval = false;
      }
      i++;
    }
    return retval;
  }

  describeBoundaryViolations (coordinates) {
    validate.coordinates(coordinates);

    let retval = [0, 0];
    let i = 0;
    while (i < coordinates.length) {
      if (coordinates[i] > this.extent[i]) {
        let x = coordinates[i] - this.extent[i];
        retval[i] = x * -1;
      }
      if (coordinates[i] < 0) {
        retval[i] = coordinates[i] * -1;
      }
      i++;
    }
    return retval;
  }

  setByCoordinates (coordinates, point) {
    debug('setByCoordinates coordinates: ', coordinates, 'point: ', point);
    validate.coordinates(coordinates);
    this.points[coordinates] = point;
    return coordinates;
  }

  getByCoordinates (coordinates) {
    debug('getByCoordinates coordinates: ', coordinates);
    validate.coordinates(coordinates);
    return this.points[coordinates];
  }
}

module.exports = Plane;
