
'use strict';

var Annotation = require( './annotation' );
var log = require( 'luvely' );
var store = require( './store' );
var blockAnnotations = store.blockAnnotations;

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

  var _extractSnippet = function( lines, startingAt ) {
    var length = lines.length;
    var i = startingAt + 1;
    var snippet = [];
    var snippetObj = {};
    while ( ( i < length ) && !( _endOfSnippet( lines[ i ] ) ) ) {
      snippet.push( _stripStar( lines[ i ] ) );
      i++;
    }
    snippetObj = snippet.join( '\n' ).toString();
    return {
      endingIndex: i,
      snippet: snippetObj
    };
  };

  var _startOfSnippet = function( line ) {
    return line.indexOf( '@snippet' ) > -1;
  };

  var _endOfSnippet = function( line ) {
    return line.indexOf( '@endsnippet' ) > -1;
  };

  var _stripStar = function( line ) {
    var starIndex = line.indexOf( '*' );
    return line.substring( starIndex + 1 );
  };

  var _parseAnnotation = function( annoStr, line, obj ) {
    var anno = new Annotation( annoStr );
    var tmp = _getEntity( anno.key(), line );
    if ( tmp ) {
      if ( anno.key() === '@callbackArg' ) {
        obj = _registerCallbackArg( anno, obj, tmp );
      } else {
        obj[ annoStr ] = tmp;
      }
    }
    return obj;
  };

  return {

    parseBlock: function( blockStr ) {
      var obj = {};
      var lines = blockStr.split( '\n' );
      for ( var i = 0; i < lines.length; i++ ) {
        var startsSnippet = _startOfSnippet( lines[ i ] );
        if ( !startsSnippet ) {
          for ( var k = 0; k < blockAnnotations.length; k++ ) {
            obj = _parseAnnotation(
              blockAnnotations[ k ],
              lines[ i ],
              obj
            );
          }

        } else {
          log.debug( 'Great scott - a code snippet!' );
          var snip = _extractSnippet( lines, i );
          obj.snippet = snip.snippet;
          i = snip.endingIndex;
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