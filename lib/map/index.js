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

class Map extends Plane {
  // constructor (coordinateBounds) {
  //   super(coordinateBounds);
  // }

  get (array) {
    let paramTypes = {
      string: 0,
      number: 0
    };

    for (let param of paramTypes) {
      let t = typeof (param);
      if (t !== 'string' && t !== 'number') {
        throw new Error(`Wrong parameter type: t`);
      }
      paramTypes[t]++;
    }

    let hasMultipleTypes = Object.values(paramTypes)
      .filter((t) => {
        return Boolean(t);
      })
      .length;

    if (hasMultipleTypes) {
      throw new Error('get params should be array of all strings or all numbers!');
    }

    switch (typeof (array[0])) {
      case 'number':
        return this._getByCoordinates(array);
      case 'string':
        return this._getByPath(array);
      default:
        throw new Error('Invalid type!');
    }
  }

  _getByPath (path) {
  }

  _getByCoordinates (coordinates) {
  }

  set (array) {
  }

  _setByPath (path) {
  }

  _setByCoordinates (coordinates) {
  }
}

module.exports = Map;
