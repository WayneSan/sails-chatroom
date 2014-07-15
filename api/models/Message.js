/**
 * Message
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	nickname: {
      type: 'string',
      required: true
    },
    text: {
      type: 'string',
      required: true
    },
    color: {
      type: 'string',
      defaultsTo: 'gray',
    }
  }

};
