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

const EventEmitter = require('events');
const Excavator = require('../excavator');

class ExcavatorOverlord {
  constructor (params) {
    this.startPoint = params.startPoint;
    this.stepCount = params.stepCount;
    this.workers = [];
    this.maze = params.maze;
    this.emitter = new EventEmitter();

    this.emitter.on('fork', (forkCoordinates) => {
      this.workers.push(new Excavator({
        emitter: this.emitter,
        startPoint: forkCoordinates
      }));
    });
  }

  excavate () {
    if (!this.workers.length) {
      this.workers.push(new Excavator({
        emitter: this.emitter,
        startPoint: this.startPoint
      }));
    }

    this.emitter.emit('excavate');
  }
}

module.exports = ExcavatorOverlord;
