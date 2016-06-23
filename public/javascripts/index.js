'use strict';

/**
 * Module dependencies.
 */
var Emitter = require('events').EventEmitter;
var inherits = require('util').inherits;

/**
 * Creates a new Modal.
 * @constructor
 * @augments Emitter
 * @returns {modal} - Returns a new instance of Modal.
 * @example var modal = new Modal(options);
 */
function Modal(options) {

  // some code

}

/**
 * Inherits
 */
inherits(Modal, Emitter);

/**
 * Shows a modal.
 * @function
 * @returns {modal}
 * @example modal.show();
 */
Modal.prototype.show = function() {

  // some code

  this.emit('show');
};

/**
 * Hides a modal.
 * @function
 * @returns {modal}
 * @example modal.hide();
 */
Modal.prototype.hide = function() {

  // some code

  this.emit('hide');
};

/**
 * Expose Modal
 */
module.exports = Modal