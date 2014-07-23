
'use strict';

function Annotation( name ) {
  this._name = name;
  this._symbol = '@';
  return this;
}

Annotation.prototype = {

  key: function() {
    return this._symbol + this._name;
  },

  val: function( val ) {
    if ( val ) {
      this._val = val;
      return this;
    } else {
      return this._val;
    }
  }

};

module.exports = Annotation;