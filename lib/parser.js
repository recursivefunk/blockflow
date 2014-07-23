
'use strict';

var Annotation = require( './annotation' );
var blockAnnotations = [ 'emits', 'on', 'description', 'callbackArg', 'socket' ];

module.exports = function() {

  var _getEntity = function( entity, line ) {
    var item = line.split( entity )[ 1 ];
    if ( item ) {
      return item.trim();
    }
  };

  var _registerCallbackArg = function( anno, obj, val ) {
    if ( !obj.callbackArgs ) {
      obj.callbackArgs = [];
    }
    obj.callbackArgs.push( val );
    return obj;
  };

  return {

    parseBlock: function( blockStr ) {
      var obj = {};
      var lines = blockStr.split( '\n' );
      for ( var i = 0; i < lines.length; i++ ) {
        for ( var k = 0; k < blockAnnotations.length; k++ ) {
          var anno = new Annotation( blockAnnotations[ k ] );
          var tmp = _getEntity( anno.key(), lines[ i ] );
          if ( tmp ) {
            if ( anno.key() === '@callbackArg' ) {
              obj = _registerCallbackArg( anno, obj, tmp );
            } else {
              obj[ blockAnnotations[ k ] ] = tmp;
            }
          }
        }
      }
      return obj;
    },

    emptyBlock: function( obj ) {
      for ( var i in obj ) {
        return false;
      }
      return true;
    }

  };
};