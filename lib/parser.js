
'use strict';

var Annotation = require( './annotation' );
var blockAnnotations = [ 'emits', 'on', 'description', 'callbackArg', 'emitter', 'listener' ];

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
    try {
      snippetObj = JSON.parse( snippet.join('\n').toString() );
    } catch( e ) {
      console.error( 'An error occured while parsing snippet' );
    }
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
    return line.substring( starIndex + 1 ).trim();
  };

  return {

    parseBlock: function( blockStr ) {
      var obj = {};
      var lines = blockStr.split( '\n' );
      for ( var i = 0; i < lines.length; i++ ) {
        var startsSnippet = _startOfSnippet( lines[ i ] );
        if ( !startsSnippet ) {
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
        } else {
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