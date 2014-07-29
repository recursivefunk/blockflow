
'use strict';

// native modules
var fs = require( 'fs' );
var EventEmitter = require( 'events' ).EventEmitter;
var path = require( 'path' );

// third party modules
var es = require( 'event-stream' );
var find = require( 'findit' );
var _ = require( 'highland' );
var async = require( 'async' );
var log = require( 'luvely' );

// my stuff
var parser = require( './lib/parser' )();
var blockRegex = new RegExp( /\/\*([\s\S]*?)\*\//g );
var _srcRoot =  null;
var _srcOpts = {};
var blockEmitter = new EventEmitter();

function run() {

  var blocks = [];
  var toProcess = [];

  function transform( filename, onTransform ) {

    log.debug( 'Parsing ', filename );

    fs.createReadStream( filename )

        .pipe(es.through(function write(data){
          var self = this;
          var str = data.toString();
          var blocks = str.match( blockRegex );
          if ( blocks && blocks.length ) {
            blocks.forEach(function( block ){
              self.emit( 'data', block );
            });
          }
        }))

        .pipe(es.map(function( data, callback ){
          var obj = parser.parseBlock( data );

          if ( !parser.emptyBlock( obj ) ) {
            obj.filename = filename;
            blocks.push( obj );
            blockEmitter.emit( 'block', obj );
          }

          return callback();
        }))

        .on( 'end', onTransform );
  }

  find( _srcRoot )

    .on('file', function( file ){
      var filePath = path.resolve( file );
      toProcess.push( file );
    })

    .on('end', function(){
      async.each( toProcess, transform, function(){
        blockEmitter.emit( 'end', _srcRoot, blocks );
      });
    });

  log.debug( 'Parsing src tree starting at ', _srcRoot );
  return blockEmitter;
}

exports.run = run;

exports.from = function( srcRoot, srcOpts ) {
  _srcRoot = srcRoot;
  _srcOpts = srcOpts || _srcOpts;
  return exports;
};


