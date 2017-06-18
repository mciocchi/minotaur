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

const debug = require('debug')('validate');

class Validate {
  static coordinates (coordinates) {
    debug('validating coordinates: ', coordinates);

    if (coordinates.length > 2) {
      throw new Error('Too many coordinates provided!');
    }

    coordinates.map((coord) => {
      if (typeof coord !== 'number') {
        throw new Error('cursor coordinates must be of type Number!');
      }
    });
  }

  static path (path) {
    debug('validating path: ', path);

    let isValid = {
      'NORTH': true,
      'SOUTH': true,
      'EAST': true,
      'WEST': true
    };

    path.map((direction) => {
      if (!isValid[direction]) {
        throw new Error('Invalid path!');
      }
    });
  }
}

module.exports = Validate;
