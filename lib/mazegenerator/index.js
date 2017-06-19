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

const SparseMazeMap = require('../sparsemazemap');
const Validate = require('../validate');
const ExcavatorOverlord = require('../excavatoroverlord');
const _ = require('lodash');

class MazeGenerator {
  generate (parameters) {
    let params = _.cloneDeep(parameters);
    params.forkiness = params.forkiness || 0.5;
    params.extent = params.extent || [100, 100];
    params.endPositionCount = params.endPositionCount || 1;
    params.stepCount = 1000;

    Validate.coordinates(params.extent);

    params.startPoint = this.generateRandomCoordinates(params.extent);
    params.maze = new SparseMazeMap(params.extent);
    let excavatorOverlord = new ExcavatorOverlord(params);

    return excavatorOverlord.excavate();
  }

  generateRandomCoordinates (coordinateBounds) {
    Validate.coordinates(coordinateBounds);

    return coordinateBounds.map((coord) => {
      return Math.floor(Math.random() * coord) + 1;
    });
  }

  generateRandomDirection () {
    return ['NORTH', 'SOUTH', 'EAST', 'WEST'][Math.floor(Math.random() * 4)];
  }
}

module.exports = MazeGenerator;
