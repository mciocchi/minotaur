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

const validate = require('../validate-coordinates');

class Plane extends Array {
  constructor (coordinateBounds) {
    validate(coordinateBounds);

    coordinateBounds.map((coord) => {
      if (coord < 0) {
        throw new Error('Cannot initialize plane with negative boundaries!');
      }
    });

    super(coordinateBounds[0], coordinateBounds[1]);
  }

  inBounds (coordinates) {
    validate(coordinates);

    let retval = true;
    let i = 0;
    while (i <= coordinates.length) {
      if (coordinates[i] > this[i] || coordinates[i] < 0) {
        retval = false;
      }
      i++;
    }
    return retval;
  }

  describeBoundaryViolations (coordinates) {
    validate(coordinates);

    let retval = [0, 0];
    let i = 0;
    while (i < coordinates.length) {
      if (coordinates[i] > this[i]) {
        let x = coordinates[i] - this[i];
        retval[i] = x * -1;
        // retval[i] = coordinates[i] - this[i];
      }
      if (coordinates[i] < 0) {
        retval[i] = coordinates[i] * -1;
      }
      i++;
    }
    return retval;
  }
}

module.exports = Plane;
