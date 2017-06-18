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
const Cursor = require('../cursor');
const debug = require('debug')('map');

class Map extends Plane {
  get (array1, array2) {
    debug('get array1: ', array1, 'array2: ', array2);

    if (array2) {
      return this.getByPath(array1, array2);
    }

    return this.getByCoordinates(array1);
  }

  getByPath (startingPoint, path) {
    debug('getByPath startingPoint: ', startingPoint, 'path: ', path);
    validate.coordinates(startingPoint);
    validate.path(path);

    let cursor = new Cursor(startingPoint, this);
    cursor.jump(path);
    return this.get(cursor.coordinates);
  }

  set (coordinates, pointOrPath, point) {
    debug('map set: coordinates: ', coordinates, 'pointOrPath: ', pointOrPath);
    debug('map set: point: ', point);

    if (point) {
      return this.setByPath(coordinates, pointOrPath, point);
    }

    return this.setByCoordinates(coordinates, pointOrPath);
  }

  setByPath (startingPoint, path, point) {
    debug('map setByPath: startingPoint: ', startingPoint, 'path: ', path);
    debug('map setByPath: point: ', point);

    validate.coordinates(startingPoint);
    validate.path(path);

    let cursor = new Cursor(startingPoint, this);
    cursor.jump(path);

    this.set(cursor.coordinates, point);
    return cursor.coordinates;
  }
}

module.exports = Map;
