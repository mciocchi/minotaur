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
const validate = require('../validate');

class Cursor {
  constructor (coordinates, plane) {
    validate.coordinates(coordinates);

    if (!(plane instanceof Plane)) {
      throw new Error('Second argument to cursor must inherit from class Plane!');
    }

    this.coordinates = coordinates;
    this.plane = plane;
  }

  move (direction) {
    switch (direction) {
      case 'EAST':
        this.coordinates[0]++;
        break;
      case 'WEST':
        this.coordinates[0]--;
        break;
      case 'NORTH':
        this.coordinates[1]++;
        break;
      case 'SOUTH':
        this.coordinates[1]--;
        break;
      default:
        throw new Error('Unrecognized direction!');
    }
  }

  jump (array) {
    if (typeof (array[0]) === 'number') {
      return this.jumpByCoordinates(array);
    }

    return this.jumpByPath(array);
  }

  jumpByCoordinates (coordinates) {
    validate.coordinates(coordinates);

    let i = 0;
    while (i < coordinates.length) {
      this.coordinates[i] = coordinates[i];
      i++;
    }
  }

  jumpByPath (path) {
    validate.path(path);

    for (let direction of path) {
      this.move(direction);
    }
  }

  isMoveInBounds (direction) {
    switch (direction) {
      case 'EAST':
        return this.plane.inBounds([this.coordinates[0] + 1, this.coordinates[1]]);
      case 'WEST':
        return this.plane.inBounds([this.coordinates[0] - 1, this.coordinates[1]]);
      case 'NORTH':
        return this.coordinates.plane.inBounds([this.coordinates[0], this.coordinates[1] + 1]);
      case 'SOUTH':
        return this.plane.inBounds([this.coordinates[0], this.coordinates[1] - 1]);
      default:
        throw new Error('Unrecognized direction!');
    }
  }
}

module.exports = Cursor;
