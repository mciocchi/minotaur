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

const Plane = require('../plane');
const validate = require('../validate-coordinates');

class Cursor extends Array {
  constructor (coordinates, plane) {
    validate(coordinates);

    if (!(plane instanceof Plane)) {
      throw new Error('Second argument to cursor must inherit from class Plane!');
    }

    super(coordinates[0], coordinates[1]);
    this.plane = plane;
  }

  move (direction) {
    switch (direction) {
      case 'EAST':
        this[0]++;
        break;
      case 'WEST':
        this[0]--;
        break;
      case 'NORTH':
        this[1]++;
        break;
      case 'SOUTH':
        this[1]--;
        break;
      default:
        throw new Error('Unrecognized direction!');
    }
  }

  isMoveInBounds (direction) {
    switch (direction) {
      case 'EAST':
        return this.plane.inBounds([this[0] + 1, this[1]]);
      case 'WEST':
        return this.plane.inBounds([this[0] - 1, this[1]]);
      case 'NORTH':
        return this.plane.inBounds([this[0], this[1] + 1]);
      case 'SOUTH':
        return this.plane.inBounds([this[0], this[1] - 1]);
      default:
        throw new Error('Unrecognized direction!');
    }
  }
}

module.exports = Cursor;
